import { fetchMovies } from "../../service/fetchMovies";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { id } = useParams();
  const endPoint = `/movie/${id}/reviews`;
  const { data, error } = fetchMovies(endPoint);
  error && toast.error(error);

  return (
    data.results &&
    (data.results.length > 0 ? (
      <ul className={css.list}>
        <Toaster />
        {data.results.map(({ id, author, content }) => (
          <li className={css.item} key={id}>
            <h3 className={css.title}>Author: {author}</h3>
            <p className={css.dscr}>{content}</p>
          </li>
        ))}
      </ul>
    ) : (
      <p className={css.message}>We don't have any reviews for this movie</p>
    ))
  );
};

export default MovieReviews;
