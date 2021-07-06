import React, { useEffect } from "react";

import { BeatLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams } from "react-router-dom";

import { getPost, getPostsBySearch } from "../../actions/posts";
import noImage from "../../images/noImage-2.jpg";

const Post = () => {
  const { post, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
    //eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
    //eslint-disable-next-line
  }, [post]);

  if (!post) return null;

  if (isLoading) {
    return <BeatLoader />;
  }

  return (
    <div className="postDetails__container">
      <div className="postDetails__content">
        <img
          src={post.selectedFile || noImage}
          className="postDetails__img"
          alt="img"
        />
        <h2>Created by: {post.name}</h2>
        <div>{post.title}</div>
        <div>{post.tags.map((tag) => `#${tag} `)}</div>
        <h5>{moment(post.createdAt).fromNow()}</h5>
      </div>
    </div>
  );
};

export default Post;
