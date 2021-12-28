import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faArrowCircleUp,
} from "@fortawesome/fontawesome-free-solid";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import default_img from "../../imgs/default_image.jpg";
import { getCredits } from "../../api";

function Cast() {
  const { category, id } = useParams();
  const [loading, setLoading] = useState(false);
  const [crew, setCrew] = useState();
  const [cast, setCast] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCredits(id, category);

      setCrew(data.data.crew);
      setCast(data.data.cast);

      setLoading(false);
    };
    fetchData();

    return () => {
      setLoading(true);
      setCrew();
      setCast();
    };
  }, [category, id]);

  if (loading) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border text-dark " role="status">
          <span className="visually-hidden ">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      {/* Header */}
      <div className="p-2 sticky-top bg-white d-flex justify-content-between align-items-center">
        <div>
          <Link
            className="text-dark text-decoration-none"
            to={`/${category}/${id}`}
          >
            <FontAwesomeIcon icon={faArrowCircleLeft} /> Back to main
          </Link>
        </div>
        <div>
          <button
            className="btn btn-danger"
            onClick={() => window.scroll(0, 0)}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Go to top"
          >
            <FontAwesomeIcon icon={faArrowCircleUp} />
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          {cast ? (
            <>
              <h2>
                Cast
                <span className="ms-2 fs-5 badge rounded-pill bg-secondary">
                  {cast.length}
                </span>
              </h2>
              <hr className="text-dark col-md-4" />
              {cast.map((item, idx) => (
                <div key={idx} className="my-2 d-flex gap-3 align-items-center">
                  <div>
                    <Link to={`/person/${item.id}`}>
                      <img
                        style={{ width: "60px" }}
                        className="rounded"
                        src={`https://image.tmdb.org/t/p/original${item.profile_path}`}
                        onError={(e) => {
                          e.target.src = default_img;
                        }}
                        alt=""
                      />
                    </Link>
                  </div>
                  <div style={{ fontSize: "14px" }}>
                    <Link
                      className="text-dark text-decoration-none"
                      to={`/person/${item.id}`}
                    >
                      <div className="fw-bold">{item.name}</div>
                      <div>{item.character}</div>
                    </Link>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="text-center p-5">
              <div className="spinner-border text-dark " role="status">
                <span className="visually-hidden ">Loading...</span>
              </div>
            </div>
          )}
        </div>
        <div className="col-md-6">
          {crew ? (
            <>
              <h2>
                Crew
                <span className="ms-2 fs-5 badge rounded-pill bg-secondary">
                  {crew.length}
                </span>
              </h2>
              <hr className="text-dark col-md-4" />
              {crew.map((item, idx) => (
                <div key={idx} className="my-2 d-flex gap-3 align-items-center">
                  <div>
                    <Link to={`/person/${item.id}`}>
                      <img
                        style={{ width: "60px" }}
                        className="rounded"
                        src={`https://image.tmdb.org/t/p/original${item.profile_path}`}
                        onError={(e) => {
                          e.target.src = default_img;
                        }}
                        alt=""
                      />
                    </Link>
                  </div>
                  <div style={{ fontSize: "14px" }}>
                    <Link
                      className="text-dark text-decoration-none"
                      to={`/person/${item.id}`}
                    >
                      <div className="fw-bold">{item.name}</div>
                      <div>{item.department}</div>
                    </Link>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="text-center p-5">
              <div className="spinner-border text-dark " role="status">
                <span className="visually-hidden ">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cast;
