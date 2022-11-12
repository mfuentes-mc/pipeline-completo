import * as cdk from 'aws-cdk-lib';
import { StackProps } from 'aws-cdk-lib';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { Options } from '../types/options';
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
  }
}
