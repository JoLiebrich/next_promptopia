'use client'
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Profile from "@components/Profile"

const MyProfile = () => {

    const { data: session } = useSession();
    const [myPosts, setMyPosts] = useState([])
    const router = useRouter();

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
            setMyPosts(data);
        }

        if (session?.user.id) {
            fetchPosts();
        }

    }, []);



    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete = async (post) => {
        console.log('delete')
        //const hasConfirmed = confirm('Are you sure you want to delete this prompt?');
        const hasConfirmed = true;
        
        if (hasConfirmed) {
            try {
                const response = await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: 'DELETE'
                });
                // get all posts without the deleted one
                const filteredPosts = myPosts.filter((item) =>
                    item._id !== post._id
                );

                console.log(filteredPosts);
                setMyPosts(filteredPosts);

            } catch (error) {
                console.log(error);
            }

        }
    }

    return (
        <Profile
            name='My'
            desc='Welcome to your personalized profile page'
            data={myPosts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile