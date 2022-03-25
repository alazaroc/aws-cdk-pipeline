import { Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { MyIaCStack } from './my-pipeline-iac-stack';

export class MyPipelineAppStage extends Stage {
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    const iaCStack = new MyIaCStack(this, 'iac-example-stack', {
      description:
        'Stack created with codepipeline in the example aws-cdk-pipeline',
    });
  }
}
