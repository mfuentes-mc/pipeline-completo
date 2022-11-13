import { NestedStack, NestedStackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Environment } from "../config";
import { Options } from "../types/options";

import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { HelloWorldFunction } from "./hello-world-function";

interface ApiProps extends NestedStackProps {
    options: Options,
    stageEnvironment: Environment
}

export class ApiGatewayStack extends NestedStack{    
    private api = new RestApi(this,'PipelineCompletoApi');

    constructor(scope: Construct, stageName: string, props: ApiProps){
        super(scope, stageName, props);
        
       const helloFunction=new HelloWorldFunction(this,stageName,props);

        //Hello Lambda Integration
        const helloWorldLambdaIntegration = new LambdaIntegration(helloFunction.function);
        const helloWorldLambdaResource = this.api.root.addResource('hello');
        helloWorldLambdaResource.addMethod('GET',helloWorldLambdaIntegration);

        //Spaces API Integrations:
        const pipelineCompletoResource = this.api.root.addResource('pipeline');
        
        //GET HELLO WORLD
        pipelineCompletoResource.addMethod('GET');
        
    }


    

}