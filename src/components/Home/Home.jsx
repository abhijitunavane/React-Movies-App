import { Popular } from './../';
import {getPopularMovies, getPopularTv} from "../../api/";
import { useEffect } from 'react';
import { useState } from 'react';
function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTv, setPopularTv] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
        const moviesData = await getPopularMovies();
        setPopularMovies(moviesData.data.results);

        const tvData = await getPopularTv();
        setPopularTv(tvData.data.results);

        setLoading(false);
    }
  fetchData();
}, []);

  if(loading) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border text-dark " role="status">
          <span className="visually-hidden ">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-2">
      <Popular data={popularMovies} type="movie" />
      <Popular data={popularTv} type="tv" />
    </div>
  );
}

export default Home;
