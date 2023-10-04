"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map(post => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };
    getPosts();
  }, []);

  const handleSearchChange = event => {
    const { value } = event.target;
    setSearchText(value);
    if (!value) {
      return setFilteredPosts([]);
    }
    let filtered = posts.filter(
      p =>
        p.prompt.toLowerCase().includes(value.toLowerCase()) ||
        p.tag.toLowerCase().includes(value.toLowerCase()) ||
        p.creator.username.toLowerCase().includes(value.toLowerCase()) ||
        p.creator.email.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPosts([...filtered]);
  };

  const handleTagClick = tag => {
    if (!tag) return;
    setSelectedTag(tag);
    let filtered = posts.filter(p =>
      p.tag.toLowerCase().includes(tag.toLowerCase())
    );
    setFilteredPosts([...filtered]);
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          className='search_input peer'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
        />
      </form>

      <PromptCardList
        data={searchText || selectedTag ? filteredPosts : posts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
