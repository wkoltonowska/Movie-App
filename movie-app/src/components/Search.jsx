import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MoviesContext } from "../contexts/MoviesContext";
import search from "../img/search.png";

const Search = () => {
	const { searchValue, setSearchValue } = useContext(MoviesContext);

	const location = useLocation();

	useEffect(() => {
		setSearchValue("");
	}, [location.pathname, setSearchValue]);

	return (
		<div className="search">
			<img src={search} alt="search" className="search__img" />
			<input
				className="search__input"
				type="text"
				name="search"
				id="search"
				placeholder="Type to search..."
				value={searchValue}
				onChange={(event) => setSearchValue(event.target.value)}
			/>
		</div>
	);
};

export default Search;
