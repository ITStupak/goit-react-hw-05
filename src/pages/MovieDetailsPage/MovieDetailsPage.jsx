import axios from "axios";
import { fetchMovies } from "../../service/fetchMovies";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { Suspense, useState } from "react";
import GoBackButton from "../../components/GoBackButton/GoBackButton";
import toast, { Toaster } from "react-hot-toast";
import placeholder from "../../img/wating.jpg";
import css from "./MovieDetailsPage.module.css";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const endPoint = `/movie/${id}`;
  const { data, error } = fetchMovies(endPoint);

  const location = useLocation();
  const returnLinkValue = location.state ?? "/movies";
  const [returnLink] = useState(returnLinkValue);

  error && toast.error(error);

  return (
    <main>
      <Toaster />
      <div className={css.mainContent}>
        <GoBackButton to={returnLink} />
        <img
          src={
            data.backdrop_path
              ? `https://image.tmdb.org/t/p/w500/${data.backdrop_path}`
              : placeholder
          }
          alt={data.original_title}
        />
        <div>
          <h2 className={css.mainTitle}>{data.title}</h2>
          <p className={css.dscr}>
            Release date:{" "}
            {data.release_date && data.release_date.split("-").join(".")}
          </p>
          <p className={css.dscr}>
            User score: {`${Math.ceil(data.vote_average * 10)}%`}
          </p>
          <h3 className={css.title}>Overview:</h3>
          <p className={css.dscr}>{data.overview}</p>
          <h3 className={css.title}>Genres:</h3>
          {data.genres && (
            <p className={css.dscr}>
              {data.genres.map((genre) => genre.name).join(", ")}
            </p>
          )}
        </div>
      </div>
      <div className={css.addContent}>
        <h3 className={css.addInfo}>Additional information:</h3>
        <ul className={css.list}>
          <li className={css.item}>
            <Link to="cast">Movie Cast</Link>
          </li>
          <li className={css.item}>
            <Link to="reviews">Movie Reviews</Link>
          </li>
        </ul>
      </div>
      <Suspense fallback={<div>Loading additional info...</div>}>
        <Outlet />
      </Suspense>
    </main>
  );
};

export default MovieDetailsPage;
