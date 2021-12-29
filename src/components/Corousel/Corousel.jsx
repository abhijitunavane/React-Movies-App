import classNames from "classnames";
import default_img from "../../imgs/default_image.jpg";
import styles from "./Corousel.module.css";

import { FixedSizeList } from "react-window";

function Corousel({ data, type }) {
  return (
    <div className={classNames("d-flex gap-2")}>
      <FixedSizeList
        height={370}
        width={1000}
        itemSize={160}
        layout="horizontal"
        itemCount={data.length}
        className={classNames("w-100", styles.corousel_container)}
      >
        {({ index, style }) => (
          <a
            rel="noreferrer"
            className="text-dark text-decoration-none"
            href={`/${type}/${data[index].id}`}
            target="_blank"
            style={style}
          >
            <div>
              <img
                className={classNames("rounded", styles.img)}
                src={`https://www.themoviedb.org/t/p/w220_and_h330_face${
                  data[index].poster_path || data[index].profile_path
                }`}
                onError={(e) => {
                  e.target.src = default_img;
                }}
                alt=""
                loading="lazy"
              />
              <div className={classNames("p-2", styles.title_link)}>
                {data[index].title || data[index].original_name}
              </div>
              <div className={classNames("p-2", styles.title_link)}>
                {data[index].character}
              </div>
            </div>
          </a>
        )}
      </FixedSizeList>
    </div>
  );
}

export default Corousel;
