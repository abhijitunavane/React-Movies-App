// eslint-disable-next-line
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/fontawesome-free-brands";
import NumberFormat from "react-number-format";
import { Corousel } from "..";
import { useLocation, Link } from "react-router-dom";

function Card({
  data,
  genres,
  languages,
  media_type,
  trailer,
  externalIds,
  credits,
}) {
  const { pathname } = useLocation();

  const noneValue = "--";
  const infoTable = [
    {
      key: "Genre",
      value: genres.join(", ") || noneValue,
    },
    {
      key: "Media Type",
      value: media_type,
    },
    {
      key: "Description",
      value: data.overview || noneValue,
    },
    {
      key: "Tagline",
      value: data.tagline || noneValue,
    },
    {
      key: "Language",
      value: languages.join(", ") || noneValue,
    },
    {
      key: "Release Date",
      value: data.release_date || data.first_air_date || noneValue,
    },
    {
      key: "Average Vote",
      value: data.vote_average || noneValue,
    },
    {
      key: "Vote Count",
      value: data.vote_count || noneValue,
    },
    {
      key: "Popularity",
      value: data.popularity || noneValue,
    },
    {
      key: "Runtime (min)",
      value: data.runtime || data.episode_run_time[0] || noneValue,
    },
    {
      key: "Revenue",
      value: (
        <NumberFormat
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
          value={data.revenue || 0}
        />
      ),
    },
  ];

  const tvTable = [
    {
      key: "Number of Seasons",
      value: data.number_of_seasons,
    },
    {
      key: "Number of Seasons",
      value: data.number_of_episodes,
    },
  ];

  const external_links = [
    {
      id: externalIds.facebook_id,
      icon: faFacebook,
      link: "https://www.facebook.com/" + externalIds.facebook_id,
    },
    {
      id: externalIds.instagram_id,
      icon: faInstagram,
      link: "https://www.instagram.com/" + externalIds.instagram_id,
    },
    {
      id: externalIds.twitter_id,
      icon: faTwitter,
      link: "https://www.twitter.com/" + externalIds.twitter_id,
    },
  ];

  if (!data) {
    return "...Loading";
  }
  return (
    <div className="card m-2 py-3 px-md-5 text-center text-md-start">
      <div className="card-header mb-3 d-flex justify-content-between">
        <div>
          <h2>{data.title || data.original_name}</h2>
        </div>
        <div className="d-flex gap-3">
          {external_links.map(
            ({ id, icon, link }, idx) =>
              id && (
                <div key={idx} className="fs-3">
                  <a
                    rel="noreferrer"
                    target="_blank"
                    className="text-dark"
                    href={link}
                  >
                    <FontAwesomeIcon icon={icon} />
                  </a>
                </div>
              )
          )}
        </div>
      </div>
      <div className="card-body p-0">
        {/* Overview */}
        <div
          className="rounded"
          style={{
            background: `url('https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${data.backdrop_path}') center no-repeat`,
          }}
        >
          <div
            className="row m-0 rounded"
            style={{
              background:
                "linear-gradient(to right, rgb(7 6 23) 150px, rgb(23 6 6 / 84%) 100%)",
            }}
          >
            <img
              className="col-md-4 p-0 rounded"
              src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${data.poster_path}`}
              alt="..."
            />
            <div className="col-md-8 card-text text-start text-white p-4">
              {infoTable.map((item, idx) => (
                <div key={idx} className="row p-2">
                  <div className="col-4 fw-bold">{item.key}</div>
                  <div className="col-8">{item.value}</div>
                </div>
              ))}

              {media_type === "tv" &&
                tvTable.map((item, idx) => (
                  <div key={idx} className="row p-2">
                    <div className="col-4 fw-bold">{item.key}</div>
                    <div className="col-8">{item.value}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/*  Cast  */}
        <div className="mx-0 my-3 ">
          <h2 className="">Cast</h2>
          <hr />
          <Corousel data={credits.cast} type="person" />
        </div>

        <Link className="btn btn-outline-dark" to={`${pathname}/cast`}>
          See Full Cast And Crew
        </Link>

        {/* Trailer */}
        <div
          className="mx-0 my-3 rounded p-3 row"
          style={{
            background:
              "linear-gradient(to right, rgb(7 6 23) 150px, rgb(23 6 6 / 84%) 100%)",
          }}
        >
          <div className="col-md-6 align-self-center">
            <h1 className="text-light p-2">Official Trailer</h1>
            <hr className="text-light" />
          </div>
          <div className="col-md-6 ">
            <iframe
              title={trailer}
              className="w-100 align-self-center"
              style={{ aspectRatio: "16/9" }}
              src={`https://www.youtube.com/embed/${trailer}`}
            ></iframe>
          </div>
        </div>

        {/* Similar Movies */}
      </div>
    </div>
  );
}

export default Card;
