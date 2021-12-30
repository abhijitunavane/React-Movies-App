import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useClickOutside } from "react-click-outside-hook";
import { useDebounce } from "./../../hooks/debounceHook";
import { getSearchedResults } from "./../../api/";
import { ListGroup } from "..";

const Navbar = () => {
  const [ref, isClickedOutside] = useClickOutside();
  const [query, setQuery] = useState("");
  const [isExpanded, setExpand] = useState(false);
  const [searchedResult, setSearchedResult] = useState();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

  // Handle Submit for the searched query
  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim() !== "") navigate(`/search?q=${query.trim()}`);
  }

  // Handle Changes in Search Bar
  function handleChange(e) {
    setLoading(true);
    setQuery(e.target.value);
    setSearchedResult();
  }

  // Handle Suggested list item click event
  function handleSearchSelect(type, id) {
    setExpand(false);

    navigate(`/${type}/${id}`);
  }

  function expandContainer() {
    setExpand(true);
  }

  useEffect(() => {
    if (isClickedOutside) setExpand(false);
  }, [isClickedOutside]);

  const searchQueries = async () => {
    if (query.trim() !== "") {
      setLoading(false);
      const response = await getSearchedResults(query);

      if (response.data) {
        if (response.data.results.length) {
          setSearchedResult(response.data.results);
          setNotFound(false);
        }
        else setNotFound(true);
      }
    }
  };

  useDebounce(query, 500, searchQueries);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-camera-reels text-white"></i>
          <span className="ms-2"> React Movies Pedia</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="w-100" ref={ref}>
            <div className="d-flex ">
              <form className="d-flex w-100" onSubmit={handleSubmit}>
                <input
                  className="form-control rounded-0 me-1"
                  type="search"
                  placeholder="Search"
                  onChange={handleChange}
                  value={query}
                  onFocus={expandContainer}
                  required
                />
                <button
                  className="btn btn-outline-light rounded-0 d-flex gap-2"
                  type="submit"
                >
                  <i className="bi bi-search"></i>
                  Search
                </button>
              </form>
            </div>
            {isExpanded && (
              <div className="bg-white w-100 position-relative">
                {!query ? (
                  <div
                    style={{ zIndex: "1000" }}
                    className="position-absolute bg-white w-100 border  p-3"
                  >
                    Type Something...like spiderman
                  </div>
                ) : !loading && !notFound ? (
                  <ListGroup
                    handleSearchSelect={handleSearchSelect}
                    searchedResult={searchedResult}
                  />
                ) : !notFound ? (
                  <div
                    style={{ zIndex: "1000" }}
                    className="rounded w-100 border bg-white position-absolute text-center"
                  >
                    <div className="spinner-border m-5" role="status"></div>
                  </div>
                ) : (
                  <div
                    style={{ zIndex: "1000" }}
                    className="position-absolute bg-white w-100 border  p-3"
                  >
                    Results Not Found 😕
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
