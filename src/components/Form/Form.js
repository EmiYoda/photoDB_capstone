import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { useHistory } from "react-router-dom";

import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  });
  const post = useSelector((state) =>
    currentId
      ? state.posts.posts.find((message) => message._id === currentId)
      : null
  );
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: "", message: "", tags: [], selectedFile: "" });
  };
  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
    // eslint-disable-next-line
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
      clear();
    } else {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
      clear();
    }
  };

  return (
    <div className="postsForm" elevation={6}>
      <h5 className="postsForm__title">
        {currentId ? `Editing "${post?.title}"` : "Creating a Post"}
      </h5>
      <form
        autoComplete="off"
        noValidate
        className="postsForm__form"
        onSubmit={handleSubmit}
      >
        <label htmlFor="title">Title</label>
        <input
          name="title"
          id="title"
          value={postData.title}
          className="postsForm__form__input"
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <label htmlFor="message">Message</label>
        <input
          name="message"
          id="message"
          multiline="true"
          rows={4}
          value={postData.message}
          className="postsForm__form__input"
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <label htmlFor="tags">Tags</label>
        <input
          name="tags"
          id="tags"
          value={postData.tags}
          className="postsForm__form__input"
          placeholder="Separate the tags with commas"
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div className="postsForm__fileInput">
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <button className="postsForm__btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
