import { Link } from "react-router-dom";
import TextTruncate from "react-text-truncate";
import default_img from "../../imgs/default_image.jpg";
function ShortCards({ img, name, date, overview, id, media_type }) {
  return (
    <div className="card shadow mb-4">
      <div className="card-body row p-0">
        <div className="col-2 d-flex align-items-center">
          <Link to={`/${media_type}/${id}`}>
            <img
              className="w-100"
              src={`https://image.tmdb.org/t/p/original/${img}`}
              alt=" ..."
              onError={e => {e.target.src = default_img}}
            />
          </Link>
        </div>
        <div className="card-text d-flex gap-3 col-10 py-2">
          {/* <div className="vr"></div> */}
          <div>
            <div className="card-title h4">
              <Link className="nav-link p-0 text-dark" to={`/${media_type || "person"}/${id}`}>
                {name}
              </Link>
            </div>
            <p className="card-subtitle text-muted">{date}</p>

            <TextTruncate
              line={2}
              element="p"
              truncateText="…"
              text={overview}              
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShortCards;
