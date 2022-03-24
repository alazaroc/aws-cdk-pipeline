import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from 'aws-cdk-lib/pipelines';
import { MyPipelineAppStage } from './my-pipeline-app-stage';

export class MyPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const codePipelineName = `blog-infrastructure-cdk`;
    const pipeline = new CodePipeline(this, codePipelineName, {
      pipelineName: codePipelineName,
      synth: new ShellStep('Synth', {
        // input: CodePipelineSource.gitHub('alazaroc/blog-infrastructure', 'main'),
        input: CodePipelineSource.connection(
          'alazaroc/aws-cdk-pipeline',
          'main',
          {
            connectionArn:
              'arn:aws:codestar-connections:eu-west-1:139415085530:connection/fb936fb8-a047-43d5-90bd-129540d588e4', // Created using the AWS console * });',
          },
        ),
        commands: ['npm ci', 'npm run build', 'npx cdk synth'],
      }),
      selfMutation: false,
    });

    pipeline.addStage(
      new MyPipelineAppStage(this, 'Deploy', {
        // env: { account: "111111111111", region: "eu-west-1" }
      }),
    );
  }
}
