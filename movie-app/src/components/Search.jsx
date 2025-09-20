import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MoviesContext } from "../contexts/movieContext/MoviesContext";

const Search = ({ className = "" }) => {
	const { searchValue, setSearchValue } = useContext(MoviesContext);

	const location = useLocation();
	const navigate = useNavigate();

	// useEffect(() => {
	// 	setSearchValue("");
	// }, [location.pathname, setSearchValue]);

	const handleChange = (event) => {
		const value = event.target.value;
		setSearchValue(value);

		if (
			value &&
			location.pathname !== "/movie" &&
			location.pathname !== "/series" &&
			event.key === "Enter"
		) {
			navigate("/movies");
		}
	};

	return (
		<div className={`search ${className}`}>
			<input
				className="search__input"
				type="text"
				name="search"
				id="search"
				placeholder="Type to search..."
				autoComplete="off"
				value={searchValue}
				onChange={handleChange}
				onKeyDown={handleChange}
			/>
			<i className="bi bi-search search__icon"></i>
		</div>
	);
};

export default Search;
