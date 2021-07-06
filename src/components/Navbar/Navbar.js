import React, { useState } from "react";

import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actionType from "../../constants/actionTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faTimes,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { getPostsBySearch } from "../../actions/posts";
import { Modal, Backdrop } from "@material-ui/core";
import PropTypes from "prop-types";
import Form from "../Form/Form";

import { useSpring, animated } from "react-spring/web.cjs";

import { motion, useCycle } from "framer-motion";

import SearchBar from "../SearchBar";

import Toggle from "./Toggle";

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

const Navbar = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [tags] = useState([]);
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push("/auth");

    setUser(null);
  };

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      history.push(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      history.push("/");
    }
  };
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
      toggleOpen();
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className={isOpen ? "navbar-open" : "navbar-closed"}
    >
      <Toggle toggle={() => toggleOpen()} className="navbar__togle-component" />
      {isOpen ? (
        <div className="navbar__content">
          <SearchBar
            searched={handleKeyPress}
            setSearched={(e) => setSearch(e.target.value)}
            searchValue={search}
          />
          <div>
            {user?.result ? (
              <div className="navbar__content">
                <h2 className="navbar__name">{user?.result.name}</h2>
                <div className="navbar__authBtn">
                  <button onClick={logout}>Logout</button>
                </div>
                <FontAwesomeIcon
                  icon={faPlusCircle}
                  onClick={handleOpen}
                  className="navbar__openModal"
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
                <Link to="/">
                  <FontAwesomeIcon icon={faHome} className="navbar__home" />
                </Link>
              </div>
            ) : (
              <Link to="/auth" className="navbar__authBtn">
                <button>Sign In / Sign Up</button>
              </Link>
            )}
          </div>
        </div>
      ) : null}
    </motion.div>
  );
};

export default Navbar;
