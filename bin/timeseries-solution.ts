#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { TimeseriesSolutionStack } from '../lib/timeseries-solution-stack';

const app = new cdk.App();
new TimeseriesSolutionStack(app, 'TimeseriesSolutionStack');
