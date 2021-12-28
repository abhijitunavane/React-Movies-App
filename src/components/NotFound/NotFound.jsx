import { Link } from "react-router-dom";
function NotFound() {
  return (
    <div className="card p-5 m-5 text-center">
      <h1 className="card-header ">Not Found</h1>
      <div className="card-body">
        <h3 className="card-text text-danger p-2">Error 404!</h3>
        <Link className="card-link btn btn-outline-dark" to="/">
          Go to home page
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
