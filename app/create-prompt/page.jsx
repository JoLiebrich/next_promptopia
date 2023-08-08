'use client'

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePrompt = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    const createPrompt = async (e) => {
        // prevent from default submit method of the browser --> no reload
        e.preventDefault();
        setSubmitting(true);
        
        const tagTemp = (post.tag.startsWith('#')) ? post.tag : ('#'+post.tag);

        // save the prompt with an api route
        try {
            const response = await fetch('/api/prompt/new',
                {
                    // this is called the options object
                    method: 'POST',
                    body: JSON.stringify({
                        prompt: post.prompt,
                        userId: session?.user.id,
                        tag: tagTemp,
                    })
                    // stringifies the object generated in curly braces
                })
            
                if (response.ok){
                    router.push('/'); // to Homescreen again
                }
        } catch (error) {
            console.log(error);
        } finally{
            // finally is called in any case
            setSubmitting(false);
        }

    }
    return (
        <Form
            type='Create'
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}
        />
    )
}

export default CreatePrompt