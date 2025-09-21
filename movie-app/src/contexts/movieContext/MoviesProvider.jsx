import { useState, useEffect } from "react";
import { MoviesContext } from "./MoviesContext";
import { auth, db } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
	doc,
	getDoc,
	setDoc,
	updateDoc,
	arrayUnion,
	arrayRemove,
} from "firebase/firestore";

export const MoviesProvider = ({ children }) => {
	const [movies, setMovies] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const [type, setType] = useState("");
	const [user, setUser] = useState(null);

	
	const getMovieRequest = async (searchValue, type) => {
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

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});

		return () => unsubscribe();
	}, []);


	const saveToLocalStorage = (items) => {
		localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
	};

	useEffect(() => {
		const loadFavourites = async () => {
			if (user) {
				const ref = doc(db, "users", user.uid);
				const snap = await getDoc(ref);

				if (snap.exists()) {
					setFavourites(snap.data().favourites || []);
				} else {
					await setDoc(ref, { favourites: [] });
					setFavourites([]);
				}

				const localFavs =
					JSON.parse(localStorage.getItem("react-movie-app-favourites")) || [];
				if (localFavs.length > 0) {
					for (const movie of localFavs) {
						await updateDoc(ref, {
							favourites: arrayUnion(movie),
						});
					}
					localStorage.removeItem("react-movie-app-favourites");
				}
			} else {
				const movieFavourites = JSON.parse(
					localStorage.getItem("react-movie-app-favourites")
				);
				if (movieFavourites) {
					setFavourites(movieFavourites);
				}
			}
		};

		loadFavourites();
	}, [user]);

	const isFavourite = (movie) => {
		return favourites.some((fav) => fav.imdbID === movie.imdbID);
	};

	const addFavMovie = async (movie) => {
		if (isFavourite(movie)) return;

		if (user) {
			const ref = doc(db, "users", user.uid);
			await updateDoc(ref, {
				favourites: arrayUnion(movie),
			});
			setFavourites((prev) => [...prev, movie]);
		} else {
			const newFavouriteList = [...favourites, movie];
			setFavourites(newFavouriteList);
			saveToLocalStorage(newFavouriteList);
		}
	};

	const removeFavMovie = async (movie) => {
		if (user) {
			const ref = doc(db, "users", user.uid);
			await updateDoc(ref, {
				favourites: arrayRemove(movie),
			});
			setFavourites((prev) =>
				prev.filter((favourite) => favourite.imdbID !== movie.imdbID)
			);
		} else {
			const newFavouriteList = favourites.filter(
				(favourite) => favourite.imdbID !== movie.imdbID
			);
			setFavourites(newFavouriteList);
			saveToLocalStorage(newFavouriteList);
		}
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
				isFavourite,
			}}>
			{children}
		</MoviesContext.Provider>
	);
};
