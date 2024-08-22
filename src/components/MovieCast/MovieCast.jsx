import { useParams } from "react-router-dom";
import { fetchMovies } from "../../service/fetchMovies";
import placeholder from "../../img/unknown_actor.png";
import toast, { Toaster } from "react-hot-toast";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { id } = useParams();
  const endpoint = `/movie/${id}/casts`;
  const { data, error } = fetchMovies(endpoint);
  error && toast.error(error);

  return (
    <>
      <Toaster />
      {data.cast && (
        <ul className={css.list}>
          {data.cast.map(({ id, profile_path, name, character }) => (
            <li className={css.item} key={id}>
              <img
                className={css.img}
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                    : placeholder
                }
                alt={name}
              />
              <p className={css.dscr}>{name}</p>
              <p className={css.dscr}>{character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MovieCast;
