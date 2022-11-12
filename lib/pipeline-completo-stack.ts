import * as cdk from 'aws-cdk-lib';
import { StackProps } from 'aws-cdk-lib';
import { CodePipeline, CodePipelineSource, ManualApprovalStep, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { options } from '../config';
import { Options } from '../types/options';
import { DeployStage } from './deploy-stage';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
interface PipelineCompletoStackProps extends StackProps {
  options: Options,
}


export class PipelineCompletoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: PipelineCompletoStackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this,`${props?.options.pipelineName}`,{
      pipelineName: `${props?.options.pipelineName}`,
      synth: new ShellStep('Synth',{
        input: CodePipelineSource.gitHub(`${props?.options.rootAccount}/${props?.options.reposName}`,'main'),
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth'
        ]
      })
    });
    for (const option of props?.options.stageOptions ?? []) {
      const stage = new DeployStage(this, option.environment, {
        options: options,
        env: { account: option.account, region: props?.options?.defaultRegion },
        stageEnvironment: option.environment
      });
      const stageDeployment = pipeline.addStage(stage);
      stageDeployment.addPre(new ManualApprovalStep(`PromoteTo${option.environment}`));
    }
  }
}
