import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MoviesContext } from "../contexts/movieContext/MoviesContext";

const Search = () => {
	const { searchValue, setSearchValue } = useContext(MoviesContext);

	const location = useLocation();

	useEffect(() => {
		setSearchValue("");
	}, [location.pathname, setSearchValue]);

	return (
		<div className="search">
			<i className="bi bi-search search__img"></i>
			<input
				className="search__input"
				type="text"
				name="search"
				id="search"
				placeholder="Type to search..."
				autoComplete="off"
				value={searchValue}
				onChange={(event) => setSearchValue(event.target.value)}
			/>
		</div>
	);
};

export default Search;
