export async function handler(event: string, context: string){
    return {
        body: `Hello from a Lambda Function ${process.env.stage}`,
        statusCode: 200
    };
}