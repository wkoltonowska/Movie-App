import { useState, useEffect } from "react";
import { MoviesContext } from "./MoviesContext";

export const MoviesProvider = ({ children }) => {
	const [movies, setMovies] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const [type, setType] = useState("");

	// pobieranie filmów/seriali z API
	const getMovieRequest = async (searchValue, type) => {
		//if (!searchValue) return;
		const url = `http://www.omdbapi.com/?s=${searchValue}&type=${type}&apikey=b40963e5`;
		const response = await fetch(url);
		const responseJson = await response.json();
		if (responseJson.Search) {
			setMovies(responseJson.Search);
		} else {
			setMovies([]);
		}
	};

	useEffect(() => {
		if (!searchValue) {
			getMovieRequest("X-men", type);
		} else {
			getMovieRequest(searchValue, type);
		}
	}, [searchValue, type]);

	// ładowanie ulubionych z localStorage
	useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem("react-movie-app-favourites")
		);
		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
	};

	const addFavMovie = (movie) => {
		const alreadyExists = favourites.some((fav) => fav.imdbID === movie.imdbID);

		if (!alreadyExists) {
			console.log(movie);
			const newFavouriteList = [...favourites, movie];
			setFavourites(newFavouriteList);
			saveToLocalStorage(newFavouriteList);
		}
	};

	const removeFavMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	return (
		<MoviesContext.Provider
			value={{
				movies,
				favourites,
				searchValue,
				setSearchValue,
				addFavMovie,
				removeFavMovie,
				getMovieRequest,
				setType,
			}}>
			{children}
		</MoviesContext.Provider>
	);
};
