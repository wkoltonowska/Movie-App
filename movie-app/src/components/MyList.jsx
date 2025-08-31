import { useContext } from "react";
import { MoviesContext } from "../contexts/movieContext/MoviesContext";

import Nav from "./Nav";
import RemoveFav from "./RemoveFav";
import MovieList from "./MovieList";
import "../scss/list.scss";

const MyList = () => {
	const { searchValue, setSearchValue, favourites, removeFavMovie } =
		useContext(MoviesContext);

	const getFavouritesByType = (type) => {
		return favourites.filter((fav) => fav.Type === type);
	};

	const movieFavouriteList = getFavouritesByType("movie");
	const seriesFavouriteList = getFavouritesByType("series");
	return (
		<>
			<Nav searchValue={searchValue} setSearchValue={setSearchValue} />
			<div className="movieList__container movieList__container-mylist ">
				<h2 className="movieList__heading movieList__heading-movies">
					Favourite movies
				</h2>
				<div className="favList__container">
					<MovieList
						movies={movieFavouriteList}
						favComponent={RemoveFav}
						handleFavouritesClick={removeFavMovie}
					/>
				</div>
			</div>
			<div className="movieList__container movieList__container-mylist">
				<h2 className="movieList__heading">Favourite series</h2>
				<div className="favList__container">
					<MovieList
						movies={seriesFavouriteList}
						favComponent={RemoveFav}
						handleFavouritesClick={removeFavMovie}
					/>
				</div>
			</div>
		</>
	);
};

export default MyList;
