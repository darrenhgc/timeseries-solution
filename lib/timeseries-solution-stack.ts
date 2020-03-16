import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as sfn from '@aws-cdk/aws-stepfunctions';
import * as tasks from '@aws-cdk/aws-stepfunctions-tasks';

export class TimeseriesSolutionStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const helloFunction = new lambda.Function(this, 'HelloFunction', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('./handlers/hello'),
      timeout: cdk.Duration.seconds(6)
    });

    const startTask = new sfn.Task(this, 'StartStep', {
      task: new tasks.InvokeFunction(helloFunction)
    });

    const loop = new sfn.Pass(this,'loop!');
    const done = new sfn.Pass(this,'done!');

    const sfndef = startTask
      .next(loop)
      .next(done);
    const sm = new sfn.StateMachine(this, 'HelloWorldStateMachine', {
      definition: sfndef,
      timeout: cdk.Duration.seconds(15)
    });
  }
}

