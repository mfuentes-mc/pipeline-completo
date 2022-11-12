export async function handler(event: string, context: string){
    console.log("EVENT:",event);
    console.log("CONTEXT:",context);

    return {
        body: `Hello from a Lambda Function ${process.env.stageName}`,
        statusCode: 200
    };
}