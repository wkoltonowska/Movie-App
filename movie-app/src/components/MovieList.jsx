import { useContext, useState } from "react";
import "../scss/list.scss";
import noImg from "../img/No-image-available.png";

import AddFav from "./AddFav";
import RemoveFav from "./RemoveFav";
import { MoviesContext } from "../contexts/movieContext/MoviesContext";

const MovieList = ({ movies }) => {
	const { addFavMovie, removeFavMovie, isFavourite } =
		useContext(MoviesContext);

	//const FavComponent = props.favComponent;

	const [isOpen, setIsOpen] = useState(false);

	const onClose = () => {
		setIsOpen(false);
	};

	return (
		<>
			{movies.map((movie) => {
				const alreadyFav = isFavourite(movie);
				const FavComponent = alreadyFav ? RemoveFav : AddFav;
				return (
					<div className="list__container" key={movie.imdbID}>
						<div className="list__item">
							<img
								src={movie.Poster !== "N/A" ? movie.Poster : noImg}
								alt={movie.Title}
							/>

							<div
								onClick={() => {
									if (alreadyFav) {
										removeFavMovie(movie);
									} else {
										addFavMovie(movie);
										setIsOpen(true);
									}
								}}>
								<div className="fav__container">
									<FavComponent setIsOpen={setIsOpen} />
								</div>
							</div>
						</div>
					</div>
				);
			})}
			<div
				className={`popup__container ${
					isOpen ? "popup__container-visible" : ""
				}`}>
				<p className="popup__text">
					The movie has been added to your favorites list
				</p>
				<button className="popup__btn" onClick={onClose}>
					close
				</button>
			</div>
		</>
	);
};

export default MovieList;
