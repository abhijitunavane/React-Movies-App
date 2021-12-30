import default_img from "../../imgs/default_image.jpg";

function ListGroup({ searchedResult, handleSearchSelect }) {
  return (
    <div
      className="w-100 position-absolute list-group"
      style={{
        height: "300px",
        overflowX: "hidden",
        zIndex: "1000",
      }}
    >
      {searchedResult &&
        searchedResult.map(
          (
            {
              name,
              original_title,
              id,
              media_type,
              poster_path,
              profile_path,
            },
            idx
          ) => (
            <div
              key={idx}
              style={{cursor: 'pointer'}}
              className="list-group-item list-group-item-action"
            >
              <div
                className="row d-flex align-items-center"
                onClick={() => handleSearchSelect(media_type, id)}
              >
                <div className="col-2">
                  <img
                    className="rounded w-100"
                    src={`https://www.themoviedb.org/t/p/w220_and_h330_face${
                      poster_path || profile_path
                    }`}
                    onError={(e) => {
                      e.target.src = default_img;
                    }}
                    alt=""
                    loading="lazy"
                  />
                </div>
                <div className="col">{name || original_title}</div>
                <div className="col-2">{media_type}</div>
              </div>
            </div>
          )
        )}
    </div>
  );
}

export default ListGroup;
