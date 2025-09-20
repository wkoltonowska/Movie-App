import { useContext, useEffect } from "react";
import { MoviesContext } from "../contexts/movieContext/MoviesContext";
import Nav from "./Nav";
import MovieList from "./MovieList";

import "../scss/list.scss";

const Series = () => {
	const { searchValue, setSearchValue, movies, setType } =
		useContext(MoviesContext);

	useEffect(() => {
		setType("series");
	}, [setType]);

	return (
		<>
			<Nav searchValue={searchValue} setSearchValue={setSearchValue} />
			<div className="movieList__container">
				<MovieList movies={movies} />
			</div>
		</>
	);
};

export default Series;
