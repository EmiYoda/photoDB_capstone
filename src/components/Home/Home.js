import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import * as actionType from "../../constants/actionTypes";

import { getPosts } from "../../actions/posts";
import SearchBar from "../SearchBar";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import PropTypes from "prop-types";
import { faPlusCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Modal, Backdrop } from "@material-ui/core";
import { useSpring, animated } from "react-spring/web.cjs";
import Navbar from "../Navbar/Navbar";

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
const Home = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();

  const history = useHistory();
  const [currentId, setCurrentId] = useState(0);
  const [open, setOpen] = useState(false);

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push("/auth");

    setUser(null);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const measures = () => {
    if (window.matchMedia("(max-width: 600px)").matches) {
      console.log("widht 600");
      return <Navbar />;
    } else {
      console.log("owdcowm");
      return (
        <>
          {user?.result ? (
            <div className="home__content">
              <h2 className="home__name">{user?.result.name}</h2>
              <div className="home__authBtn">
                <button onClick={logout}>Logout</button>
              </div>

              <FontAwesomeIcon
                icon={faPlusCircle}
                onClick={handleOpen}
                className="openModal"
              />
              <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                open={open}
                onClose={handleClose}
                className="modal"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <div className="paper">
                    <FontAwesomeIcon icon={faTimes} onClick={handleClose} />
                    <Form currentId={currentId} setCurrentId={setCurrentId} />
                  </div>
                </Fade>
              </Modal>
            </div>
          ) : (
            <Link to="/auth" className="home__authBtn">
              <button>Sign In / Sign Up</button>
            </Link>
          )}
          <SearchBar />
        </>
      );
    }
  };

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <div className="home">
      {measures()}
      <Posts setCurrentId={setCurrentId} />
    </div>
  );
};

export default Home;
