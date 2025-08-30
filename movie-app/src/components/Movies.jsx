import { useContext, useEffect } from "react";
import { MoviesContext } from "../contexts/MoviesContext";
import Nav from "./Nav";
import MovieList from "./MovieList";
import AddFav from "./AddFav";
import "../scss/list.scss";

const Movies = () => {
	const { searchValue, setSearchValue, movies, addFavMovie, setType } =
		useContext(MoviesContext);

	useEffect(() => {
		setType("movie");
	}, [setType]);

	return (
		<>
			<Nav searchValue={searchValue} setSearchValue={setSearchValue} />
			<div className="movieList__container">
				<MovieList
					movies={movies}
					favComponent={AddFav}
					handleFavouritesClick={addFavMovie}
				/>
			</div>
		</>
	);
};

export default Movies;
