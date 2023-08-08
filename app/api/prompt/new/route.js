import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// this is the synthax for a common post route
export const POST = async (req) =>{
    // extract json data from the request object (and already destruct it...)
    const {userId, prompt, tag} = await req.json();
    try {
        await connectToDB();
        // const newPrompt = await Prompt.create({
        //     creator: userId, 
        //     tag: tag,
        //     prompt: prompt,
        // })
        
        const newPrompt = new Prompt({
            creator: userId, 
            tag: tag,
            prompt: prompt,
        })
        await newPrompt.save();

        // return response
        return new Response(JSON.stringify(newPrompt), {status: 201});

    } catch (error) {
        console.log(error);
        return new Response('Failed to create new prompt', {status: 500});
    }

}