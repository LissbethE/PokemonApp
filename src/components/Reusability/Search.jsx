import React, { useRef } from "react";
import { useKey } from "../../useKey";

const Search = ({ query, setQuery }) => {
  const inputEl = useRef(null);

  // Custom Hook
  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <input
      type="text"
      placeholder="Search pokemon..."
      className="search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
};

export default Search;
