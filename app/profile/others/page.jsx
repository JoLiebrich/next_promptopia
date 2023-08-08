'use client'
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile"

const OtherProfile = () => {

    const searchParams = useSearchParams();
    const userId = searchParams.get('id');
    const username = searchParams.get('username');

    const [myPosts, setMyPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${userId}/posts`);
            const data = await response.json();
            setMyPosts(data);
        }

        fetchPosts();

    }, []);



    return (
        <Profile
            name={username}
            desc='Explore the prompts of other users'
            data={myPosts}
        />
    )
}

export default OtherProfile

