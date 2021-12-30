// eslint-disable-next-line
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getSearchedResults } from "./../../api";
import { ShortCards } from "./../";

function Search() {
  const { category } = useParams();
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchedResult, setSearchedResult] = useState();
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const query = searchParams.get("q");

  const fetchData = async (term) => {
    try {
    const data = await getSearchedResults(term);

    setSearchedResult(data.data.results);

    if (!data.data.results.length) {
      setNotFound(true);
    }
    setLoading(false);
  } catch(e) {
    console.log(e);
  }
  };

  useEffect(() => {
    fetchData(query);

    return () => {
      setSearchedResult();
      setLoading(true);
      setNotFound(false);
    };
    // eslint-disable-next-line
  }, [query]);

  if (loading) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border text-dark " role="status">
          <span className="visually-hidden ">Loading...</span>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="container mt-2">
        <p className="lead">You searched for : {query}</p>
        <h1>Results Not Found 😕</h1>
        <span className="btn btn-outline-dark"><label style={{cursor: "pointer"}} htmlFor="search">Click here to search again!</label></span>
      </div>
    );
  }

  return (
    <div className="container">
      <p className="lead p-2">You searched for : {query}</p>

      {searchedResult &&
        searchedResult.map(
          (
            {
              original_title,
              profile_path,
              first_air_date,
              media_type,
              name,
              poster_path,
              overview,
              release_date,
              id,
            },
            idx
          ) => (
            <ShortCards
              key={idx}
              img={poster_path || profile_path}
              name={original_title || name}
              date={release_date || first_air_date}
              overview={overview}
              first_air_date={first_air_date}
              media_type={media_type || category}
              id={id}
            />
          )
        )}
    </div>
  );
}

export default Search;
