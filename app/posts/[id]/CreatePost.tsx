"use client";

import React, { useState } from "react";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch('/api/posts',{
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            title,
            content
        })
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <input 
        type="text"
        placeholder="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></input>
      <button type="submit">
        Create Post
      </button>
    </form>
  );
};

export default CreatePost;
