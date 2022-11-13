import { NestedStack, NestedStackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Environment } from "../config";
import { Options } from "../types/options";
import * as path from 'path';
import { Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";

interface ApiProps extends NestedStackProps {
    options: Options,
    stageEnvironment: Environment
}

export class ApiGatewayStack extends NestedStack{    
    private api = new RestApi(this,'PipelineCompletoApi');

    constructor(scope: Construct, stageName: string, props: ApiProps){
        super(scope, stageName, props);
        
        const helloWorldLambdaFunction=new Function(this,'LambdaFunction',{
            runtime: Runtime.NODEJS_16_X,
            handler: 'handler.handler',
            code: Code.fromAsset(path.join(__dirname,'../src/hello-world','')),
            environment: {"stageName": stageName, "stage":props?.stageEnvironment}
        });

        //Hello Lambda Integration
        const helloWorldLambdaIntegration = new LambdaIntegration(helloWorldLambdaFunction);
        const helloWorldLambdaResource = this.api.root.addResource('hello');
        helloWorldLambdaResource.addMethod('GET',helloWorldLambdaIntegration);

        //Spaces API Integrations:
        const pipelineCompletoResource = this.api.root.addResource('pipeline');
        
        //GET HELLO WORLD
        pipelineCompletoResource.addMethod('GET');
        
    }


    

}