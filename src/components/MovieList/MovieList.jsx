import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ movieList }) => {
  const location = useLocation();
  return (
    <>
      <ul className={css.list}>
        {movieList.map((item) => (
          <li className={css.item} key={item.id}>
            <Link to={`/movies/${item.id}`} state={location}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MovieList;
