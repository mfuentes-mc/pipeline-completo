import { Environment } from "../config";

export type Options={
    defaultRegion: string,
    reposName: string,
    pipelineName: string,
    stackName: string,
    rootAccount: string,
    stackNamePrefix: string,
    account: string,
    stageOptions: StageOptions[]
}

export type StageOptions={
    environment: Environment,
    account: string
}


export const findStageOption = (options: Options, environment: Environment) => {
    const stageOption = options.stageOptions.find(option => option.environment == environment);
    if (!stageOption) {
        throw new Error(`Could not find account for ${environment}`);
    }
    return stageOption;
}