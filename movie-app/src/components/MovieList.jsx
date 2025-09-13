import "../scss/list.scss";
import noImg from "../img/No-image-available.png";
const MovieList = (props) => {
	const FavComponent = props.favComponent;
	return (
		<>
			{props.movies.map((movie) => (
				<div className="list__container" key={movie.imdbID}>
					<div className="list__item">
						<img
							src={movie.Poster !== "N/A" ? movie.Poster : noImg}
							alt={movie.Title}
						/>
						<div onClick={() => props.handleFavouritesClick(movie)}>
							<div className="fav__container">
								<FavComponent />
							</div>
						</div>
					</div>
				</div>
			))}
		</>
	);
};

export default MovieList;
