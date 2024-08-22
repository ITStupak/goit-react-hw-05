import { fetchMovies } from "../../service/fetchMovies";
import toast, { Toaster } from "react-hot-toast";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";

const HomePage = () => {
  const endPoint = "/trending/movie/day";
  const { data, error } = fetchMovies(endPoint);

  error && toast.error(error);

  return (
    <div className={css.home}>
      <Toaster />
      <h2 className={css.title}>Trending movies today:</h2>
      {data.results && <MovieList movieList={data.results} />}
    </div>
  );
};

export default HomePage;
