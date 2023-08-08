import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// this is the synthax for a common GET route
export const GET = async (request) =>{
    try {
        await connectToDB();
        // all posts and get creator via the one to many relationship
        const prompts = await Prompt.find({}).populate('creator');
        
        // return response
        return new Response(JSON.stringify(prompts), {status: 200});

    } catch (error) {
        console.log(error);
        return new Response('Failed to fetch all prompts', {status: 500});
    }

}