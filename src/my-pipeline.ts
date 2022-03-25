#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { Tags } from 'aws-cdk-lib';
import { MyPipelineStack } from './stack/my-pipeline-stack';

const app = new cdk.App();
new MyPipelineStack(app, 'pipeline-of-cdk-project-stack', {
  env: {
    account: process.env.CDK_DEPLOY_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEPLOY_REGION || process.env.CDK_DEFAULT_REGION,
  },
  description: 'Pipeline of the demo CDK project aws-cdk-pipeline',
});

Tags.of(app).add('app', 'demo');
