import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Options } from "../types/options";
import { Environment } from '../config';
import { Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';

interface LambdaStackProps extends cdk.StackProps {
    options: Options,
    stageEnvironment: Environment
}

export class MainStack extends cdk.Stack {
    constructor(scope: Construct, stageName: string, props: LambdaStackProps) {
        super(scope, stageName, {...props});
        new Function(this,'LambdaFunction',{
            runtime: Runtime.NODEJS_16_X,
            handler: 'handler.handler',
            code: Code.fromAsset(path.join(__dirname,'../src/hello-world','')),
            environment: {"stageName": stageName}
        });
    }
}
