#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PipelineCompletoStack } from '../lib/pipeline-completo-stack';
import { options } from "../config";
const app = new cdk.App();

new PipelineCompletoStack(app,`${options.stackNamePrefix}-${options.stackName}` , {
  env:{
    account: options.account,
    region: options.defaultRegion
  },
  options: options
});

app.synth();