import classNames from "classnames";
import default_img from "../../imgs/default_image.jpg";
import styles from "./Corousel.module.css";
function Corousel({ data, type }) {
  return (
    <div className={classNames("d-flex gap-2", styles.corousel_container)}>
      {data.map((item, idx) => (
        <a rel="noreferrer" className="text-dark text-decoration-none" key={idx} href={`/${type}/${item.id}`} target="_blank">
          <div>
            <img
              className={classNames("rounded", styles.img)}
              src={`https://image.tmdb.org/t/p/original${item.poster_path || item.profile_path}`}
              onError={e => {e.target.src = default_img}}
              alt=""
            />
            <div className={classNames("p-2", styles.title_link)}>{item.title || item.original_name}</div>
            <div className={classNames("p-2", styles.title_link)}>{item.character}</div>
          </div>
        </a>
      ))}
    </div>
  );
}

export default Corousel;
