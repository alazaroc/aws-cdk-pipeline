import { Construct } from 'constructs';
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from 'aws-cdk-lib/pipelines';
import { MyPipelineAppStage } from './my-pipeline-app-stage';
import { aws_ssm, Stack, StackProps } from 'aws-cdk-lib';

export class MyPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const codePipelineName = `test-iac-with-cdk`;
    const pipeline = new CodePipeline(this, codePipelineName, {
      pipelineName: codePipelineName,
      synth: new ShellStep('Synth', {
        // input: CodePipelineSource.gitHub('alazaroc/aws-cdk-pipeline', 'main'),
        input: CodePipelineSource.connection(
          'alazaroc/aws-cdk-pipeline',
          'main',
          {
            connectionArn: getMyGitHubConnectionFromSsmParameterStore(this), // Created using the AWS console * });',
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

// Get GitHub connection in a secure way from SSM Parameter Store
export function getMyGitHubConnectionFromSsmParameterStore(
  scope: Construct,
): string {
  return aws_ssm.StringParameter.valueForStringParameter(
    scope,
    'github-connection-alazaroc-cdkpipeline',
  );
}
