import React from "react";
import { BeatLoader } from "react-spinners";
import { useSelector } from "react-redux";

import Post from "./Post/Post";

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (!posts.length && !isLoading) return "No posts";

  return isLoading ? (
    <BeatLoader />
  ) : (
    <div className="wrapper">
      {posts?.map((post) => (
        <div key={post._id} className="grid--item">
          <Post post={post} setCurrentId={setCurrentId} />
        </div>
      ))}
    </div>
  );
};

export default Posts;
