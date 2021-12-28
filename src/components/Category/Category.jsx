import { useParams } from "react-router-dom";
import { Card, Person } from "..";
import { useEffect } from "react";
import { useState } from "react";
import {
  getMovieById,
  getTvById,
  getPersonById,
  getExternalIds,
  getMovieCreditsOfPerson,
  getTvCreditsOfPerson,
  getMovieTrailer,
  getTvTrailer,
  getCredits,
} from "../../api";

const relatedLanguage = (languages) => {
  let languageList = [];
  // eslint-disable-next-line
  languages.map((item) => {
    if (item.english_name !== "No Language")
      languageList.push(item.english_name);
  });
  return languageList;
};

const relatedGenres = (genres) => {
  let genreList = [];
  // eslint-disable-next-line
  genres.map((genre) => {
    genreList.push(genre.name);
  });
  return genreList;
};

const relatedTrailer = (videosData) => {
  let trailer = null;
  // eslint-disable-next-line
  videosData.results.map(({ name, key }, idx) => {
    if (name.includes("Trailer") === true) trailer = key;
  });

  return trailer;
};

function Category() {
  const { category, id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [genres, setGenres] = useState();
  const [languages, setLanguages] = useState();
  const [externalIds, setExternalIds] = useState();
  const [movieCredits, setMovieCredits] = useState();
  const [tvCredits, setTvCredits] = useState();
  const [credits, setCredits] = useState();
  const [trailerVideo, setTrailerVideo] = useState();
  useEffect(() => {
    const fetchData = async () => {
      let data, trailerData;

      const external_ids = await getExternalIds(id, category);
      setExternalIds(external_ids.data);
      switch (category) {
        case "movie": {
          data = await getMovieById(id);
          setGenres(relatedGenres(data.data.genres));
          setLanguages(relatedLanguage(data.data.spoken_languages));

          trailerData = await getMovieTrailer(id);
          setTrailerVideo(relatedTrailer(trailerData.data));

          const _credits = await getCredits(id, category);
          setCredits(_credits.data);
          break;
        }
        case "tv": {
          data = await getTvById(id);
          setGenres(relatedGenres(data.data.genres));
          setLanguages(relatedLanguage(data.data.spoken_languages));

          trailerData = await getTvTrailer(id);
          setTrailerVideo(relatedTrailer(trailerData.data));

          const _credits = await getCredits(id, category);
          setCredits(_credits.data);
          break;
        }
        case "person": {
          data = await getPersonById(id);
          const movie_credits = await getMovieCreditsOfPerson(id);
          const tv_credits = await getTvCreditsOfPerson(id);

          setMovieCredits(movie_credits.data);
          setTvCredits(tv_credits.data);
          break;
        }
        default: {
          data = await getMovieById(id);
          setGenres(relatedGenres(data.data.genres));
          setLanguages(relatedLanguage(data.data.spoken_languages));
        }
      }
      setData(data.data);

      setLoading(false);
    };
    fetchData();

    return () => {
      setData();
      setLanguages();
      setGenres();
      setLoading(true);
      setMovieCredits();
      setTvCredits();
      setExternalIds();
    };
  }, [id, category]);

  if (loading) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border text-dark " role="status">
          <span className="visually-hidden ">Loading...</span>
        </div>
      </div>
    );
  }

  if (category === "person") {
    return (
      <Person
        data={data}
        externalIds={externalIds}
        movieCredits={movieCredits}
        tvCredits={tvCredits}
      />
    );
  } else
    return (
      <Card
        media_type={category}
        data={data}
        genres={genres}
        languages={languages}
        trailer={trailerVideo}
        externalIds={externalIds}
        credits={credits}
      />
    );

  // Add similar Movies
}

export default Category;
