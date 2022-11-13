import { Construct } from "constructs";
import { Environment } from "../config";
import { Options } from "../types/options";
import * as path from 'path';
import { Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';

export interface FunctionProps {
    options: Options
    stageEnvironment: Environment
}
export class HelloWorldFunction extends Construct{
    private readonly _func: Function;

    constructor(scope: Construct, stageName: string, props: FunctionProps){
        super(scope,stageName);

        this._func=new Function(this,'LambdaFunction',{
            runtime: Runtime.NODEJS_16_X,
            handler: 'handler.handler',
            code: Code.fromAsset(path.join(__dirname,'../src/hello-world','')),
            environment: {"stageName": stageName, "stage":props?.stageEnvironment}
        });
    }
    get function(): Function {
        return this._func
    }

}