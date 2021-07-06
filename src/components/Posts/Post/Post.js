import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as farThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";

import { useDispatch } from "react-redux";
import moment from "moment";

import { likePost } from "../../../actions/posts"; //* Delet post and edit
import { useSpring, animated } from "react-spring/web.cjs";
import PropTypes from "prop-types";
import noImage from "../../../images/noImage-2.jpg";

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const Likes = () => {
    if (post?.likes?.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <FontAwesomeIcon icon={faThumbsUp} className="post__like" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <div className="post__like-container">
          <FontAwesomeIcon icon={farThumbsUp} className="post__liked" />
          &nbsp;{post.likes.length}{" "}
        </div>
      );
    }

    return (
      <>
        <FontAwesomeIcon icon={farThumbsUp} className="post__like-disabled" />
        &nbsp;Like
      </>
    );
  };

  return (
    <div>
      <div>
        <div
          className="img"
          style={{
            backgroundImage: `url(${post.selectedFile || noImage})`,
          }}
        ></div>
        <div className="container">
          <h2>{post.name}</h2>
          <div className="desc">{post.title}</div>
          <div className="desc2">{post.tags.map((tag) => `#${tag} `)}</div>
          <h5>{moment(post.createdAt).fromNow()}</h5>
          <button
            className="post__like-btn"
            disabled={!user?.result}
            onClick={() => dispatch(likePost(post._id))}
          >
            <Likes />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
