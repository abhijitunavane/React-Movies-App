// eslint-disable-next-line
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/fontawesome-free-brands";
import styles from "./Person.module.css";
import ReadMoreReact from "read-more-react";
import Corousel from './../Corousel/Corousel';
import default_img from "../../imgs/default_image.jpg";

function Person({ data, externalIds, movieCredits, tvCredits }) {
  const noneValue = "--";
  const infoTable = [
    {
      key: "Birthday",
      value: data.birthday || noneValue,
    },
    {
      key: "Deathday",
      value: data.deathday || noneValue,
    },
    {
      key: "Also Known As",
      value:
        data.also_known_as.map((item, idx) => <div key={idx}>{item}</div>) ||
        noneValue,
    },
    {
      key: "Known For Department",
      value: data.known_for_department || noneValue,
    },
    {
      key: "Place of Birth",
      value: data.place_of_birth || noneValue,
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

  const movie_credits = movieCredits.cast;
  const tv_credits = tvCredits.cast;

  
  if (!data) {
    return "...Loading";
  }
  return (
    <div className="card m-2 py-3 text-md-start">
      <h2 className="card-header p-2 ms-3">{data.name}</h2>
      <div className="card-body">
        <div className="row">
          <div className="col-md-3 row d-flex flex-column">
            <div className="col-12 text-center text-md-start">
              <img
                className={styles.img}
                src={`https://image.tmdb.org/t/p/original/${data.profile_path}`}
                onError={e => {e.target.src = default_img}}
                alt="..."
              />
            </div>
            <div className="col-12 p-3">
              <div className="pb-3 d-flex gap-3 justify-content-md-start justify-content-center">
                {external_links.map(
                  ({ id, icon, link }, idx) =>
                    id && (
                      <div key={idx} className="fs-3">
                        <a rel="noreferrer" target="_blank" className="text-dark" href={link}>
                          <FontAwesomeIcon icon={icon} />
                        </a>
                      </div>
                    )
                )}
              </div>
              <h4 className="border-bottom border-1 pb-2">Personal Info</h4>
              {infoTable.map((item, idx) => (
                <div key={idx} className="p-2">
                  <div className="fw-bold">{item.key}</div>
                  <div className="">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-9 card-text text-start">
            <div className="">
              <h2 className="border-bottom border-1 pb-2">Biography</h2>
              
              {data.biography ? <><ReadMoreReact
                min={700}
                ideal={800}
                max={1000}
                text={data.biography}
                readMoreText="Click here to read more"
              />
              <p />
              <p>
                Description above is from the Wikipedia article {data.name},
                licensed under CC-BY-SA, full list of contributors on Wikipedia.
              </p></>: <p>We don't have a biography for {data.name}</p>}
            </div>
            <div className="py-2">
              <h2 className="border-bottom border-1 pb-2">Known For Movies <span className="badge bg-secondary">{movie_credits.length}</span></h2>
              <Corousel data={movie_credits} type="movie" />
            </div>
            <div className="py-2">
              <h2 className="border-bottom border-1 pb-2">Known For TV <span className="badge bg-secondary">{tv_credits.length}</span></h2>
              <Corousel data={tv_credits} type="tv" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Person;
