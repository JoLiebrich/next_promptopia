'use client'

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditPrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({ prompt: "", tag: "", });

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`); // not neccessary,{method: 'GET'});
            const data = await response.json();
            setPost({
                prompt: data.prompt,
                tag: data.tag,
            });
        }
        // call the fcn if a prompt if exists
        if (promptId) getPromptDetails();

        //console.log(post)

    }, [promptId]);

    const updatePrompt = async (e) => {
        // prevent from default submit method of the browser --> no reload
        e.preventDefault();
        setSubmitting(true);
        if(!promptId) return alert('Prompt Id not found');

        const tagTemp = (post.tag.startsWith('#')) ? post.tag : ('#'+post.tag);

        // update the prompt via PATCH method of aip route
        try {
            const response = await fetch(`/api/prompt/${promptId}`,
                {
                    // this is called the options object
                    method: 'PATCH',
                    body: JSON.stringify({
                        prompt: post.prompt,
                        tag: tagTemp
                    })
                    // stringifies the object generated in curly braces
                })

            if (response.ok) {
                router.push('/profile'); // to Homescreen again
            }
        } catch (error) {
            console.log(error);
        } finally {
            // finally is called in any case
            setSubmitting(false);
        }

    }

    

    return (
        <Form
            type='Edit'
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default EditPrompt