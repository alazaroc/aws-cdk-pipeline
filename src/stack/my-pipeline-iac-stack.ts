import { aws_s3, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class MyIaCStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Add resources
    new aws_s3.Bucket(this, 'MyFirstBucket', {
      enforceSSL: false,
    });
  }
}
