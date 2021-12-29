import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";// eslint-disable-next-line
import styles from "./Navbar.module.css";

const Navbar = ({setCategory}) => {
  const [query, setQuery] = useState(""); 
  const [option, setOption] = useState("multi"); 
  const navigate = useNavigate();

  // Handle Submit for the searched query
  function handleSubmit(e) {
    e.preventDefault();

    navigate(`search/${option}?q=${query}`);
  }

  // Handle Changes in Search Bar
  function handleChange(e) {
    setQuery(e.target.value);
  }

  // Handle Selection of category in Search Bar
  function handleSelect(e) {
    setOption(e.target.value);
  }

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
          <div className="w-100 d-flex">
            <select
              className="form-select w-auto rounded-0 d-none d-sm-block "
              onChange={handleSelect}
            >
              <option value="multi">All</option>
              <option value="movie">Movies</option>
              <option value="tv">TV Shows</option>
              <option value="person">People</option>
            </select>
            <form className="d-flex w-100" action="/?q=abcd" onSubmit={handleSubmit}>
              <input
                id="search"
                name="search"
                className="form-control rounded-0 me-1"
                type="search"
                placeholder="Search"
                onChange={handleChange}
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
