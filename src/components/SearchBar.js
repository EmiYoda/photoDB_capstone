import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { getPostsBySearch } from "../actions/posts";

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

const SearchBar = ({ searched, setSearched, searchValue }) => {
  const dispatch = useDispatch();

  const [search] = useState("");
  const [tags] = useState([]);
  const history = useHistory();

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
  // const handleKeyPress = (e) => {
  //   if (e.keyCode === 13) {
  //     searchPost();
  //   }
  // };

  return (
    <div className="search-bar">
      <div className="search-bar__bar">
        <FontAwesomeIcon icon={faSearch} onClick={searchPost} />
        <input
          name="search"
          id="search"
          value={searchValue}
          onChange={setSearched}
          onKeyDown={searched}
        />
      </div>
    </div>
  );
};

export default SearchBar;
