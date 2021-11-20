import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as lambda_nodejs from '@aws-cdk/aws-lambda-nodejs'
import * as apigatewayv2 from '@aws-cdk/aws-apigatewayv2'
import * as apigatewayv2_integrations from '@aws-cdk/aws-apigatewayv2-integrations'
import * as path from 'path';

export class QuickAndDirtyServerlessGeoipApiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const geoIPLookupFunction = new lambda_nodejs.NodejsFunction(this, 'geoIPLookup', {
      runtime: lambda.Runtime.NODEJS_14_X,
      entry: path.join(__dirname, '../lambda/index.js'),
      handler: 'handler',
      timeout: cdk.Duration.seconds(25),
      memorySize: 512,
      bundling: {
        commandHooks: {
          // Copy a file so that it will be included in the bundled asset
          afterBundling(inputDir: string, outputDir: string): string[] {
            return [`cp ${inputDir}/lambda/GeoLite2-City.mmdb ${outputDir}`];
          },
          beforeInstall(inputDir: string, outputDir: string): string[] {
            return [];
          },
          beforeBundling(inputDir: string, outputDir: string): string[] {
            return [];
          }
        }
      }
    });

    const httpApi = new apigatewayv2.HttpApi(this, 'HttpApi');

    const geoIPLookupIntegration = new apigatewayv2_integrations.LambdaProxyIntegration({
      handler: geoIPLookupFunction,
    });
    httpApi.addRoutes({
      path: '/',
      methods: [ apigatewayv2.HttpMethod.GET ],
      integration: geoIPLookupIntegration,
    });

    new cdk.CfnOutput(this, 'sampleApiEndpoint', {
      value: httpApi.apiEndpoint
    })

  }
}
