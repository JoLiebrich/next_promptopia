'use client'
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react"

import PromptCard from "./PromptCard"

// because PromptCatdList is only required in the feed component we can ceate it right here
const PromptCardList = ({ data, handleTagClick, showUserPrompts }) => {

  return (
    // round brackets in async fcn because of html content?
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={() => handleTagClick(post.tag)}
          showUserPrompts={() => showUserPrompts(post.creator)}
        />

      ))}

    </div>

  )
}

const Feed = () => {
  const router = useRouter();
  const { data: session } = useSession();


  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [postsToDisplay, setPostsToDisplay] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
      setPostsToDisplay(data);
    }
    // call it because hooks cannot be directly async
    fetchPosts();

  }, []);

  // search input callback
  const handleSearchChange = (e) => {
    const searchTxtTemp = e.target.value;
    setSearchText(searchTxtTemp);

    const matchingPosts = posts.filter((p) =>
      p.tag.toLowerCase().includes(searchTxtTemp.toLowerCase())
      || p.creator.username.toLowerCase().includes(searchTxtTemp.toLowerCase())
      || p.prompt.toLowerCase().includes(searchTxtTemp.toLowerCase())
    )

    setPostsToDisplay(matchingPosts);
    //console.log(matchingPosts)

  }

  // click on tag handler
  const handleTagClick = (tagTemp) => {
    // fill the tag into the search field an filter prompts by the tag
    // use the search fcn with a manipulated input
    const e = { target: { value: tagTemp } };
    //console.log(e.target.value)
    handleSearchChange(e);
  }

  // show all user prompts when click on the prompt card header
  const showUserPrompts = (user) => {
    // if the user clicks on its own profile, forward him to his private area
    
    if (session?.user.id && session.user.id === user._id && false) {
      // User is logged in and clicks on their own prompt
      router.push('/profile');
    }else{
      // else show all promts of the user
      console.log(user)
      router.push(`/profile/others/?id=${user._id}&username=${user.username}`);  
    }
    
  }


  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={postsToDisplay}
        handleTagClick={handleTagClick}
        showUserPrompts={showUserPrompts}
      />

    </section>
  )
}

export default Feed