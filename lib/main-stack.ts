import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Options } from "../types/options";
import { Environment } from '../config';
import { ApiGatewayStack } from './api-gateway-stack';

interface LambdaStackProps extends cdk.StackProps {
    options: Options,
    stageEnvironment: Environment
}

export class MainStack extends cdk.Stack {
    constructor(scope: Construct, stageName: string, props: LambdaStackProps) {
        super(scope, stageName, {...props});


        //API GATEWAY
        const apiGateWay = new ApiGatewayStack(this,'ApiStack',{
            options: props.options,
            stageEnvironment: props.stageEnvironment
        });

    }
}
