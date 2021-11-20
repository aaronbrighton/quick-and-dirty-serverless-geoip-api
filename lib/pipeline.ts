import { Construct, Stage, Stack, StackProps, StageProps } from '@aws-cdk/core';
import { CodePipeline, CodePipelineSource, ShellStep } from '@aws-cdk/pipelines';
import { QuickAndDirtyServerlessGeoipApiStack } from './quick-and-dirty-serverless-geoip-api-stack';

export class QuickAndDirtyServerlessGeoipApiPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.connection('aaronbrighton/quick-and-dirty-serverless-geoip-api', 'pipeline', {
          connectionArn: 'arn:aws:codestar-connections:us-east-1:207494070760:connection/fa9dfef8-8026-4994-a7ae-6243ee21d8f6', // Created using the AWS console
        }),
        commands: [
          'npm install',
          `npx cdk synth --context maxMindLicenseKey=${this.node.tryGetContext('maxMindLicenseKey')}`,
        ],
      }),
      dockerEnabledForSynth: true
    });

    pipeline.addStage(new QuickAndDirtyServerlessGeoipApi(this, 'deployed')); // Will result in a deployment of deployed-QuickAndDirtyServerlessGeoipApiStack
  }
}
  
class QuickAndDirtyServerlessGeoipApi extends Stage {
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    new QuickAndDirtyServerlessGeoipApiStack(this, 'QuickAndDirtyServerlessGeoipApiStack'); // Will be prepended with "deployed" (see pipeline.addStage)
  }
}