import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// this is the synthax for a common Get route
export const GET = async (request, {params}) =>{
    // params get populated if you pass dynamic data into the route
    // in this case; params.id
    try {
        await connectToDB();
        // get posts for the current creator
        const prompts = await Prompt.find({
            creator: params.id
        }).populate('creator');
        
        // return response
        return new Response(JSON.stringify(prompts), {status: 200});

    } catch (error) {
        console.log(error);
        return new Response('Failed to fetch all prompts', {status: 500});
    }

}