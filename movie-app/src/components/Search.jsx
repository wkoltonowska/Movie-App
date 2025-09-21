import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MoviesContext } from "../contexts/movieContext/MoviesContext";

const Search = ({ className = "" }) => {
	const { searchValue, setSearchValue } = useContext(MoviesContext);

	const location = useLocation();
	const navigate = useNavigate();

	const handleChange = (event) => {
		setSearchValue(event.target.value.trimStart());
	};

	const handleSearch = () => {
		const value = searchValue.trim();
		if (
			value &&
			location.pathname !== "/movie" &&
			location.pathname !== "/series"
		) {
			setSearchValue(value);
			navigate("/movies");
		}
	};

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			handleSearch();
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
				onKeyDown={handleKeyDown}
			/>
			<button className="search__btn" onClick={handleSearch}>
				<i className="bi bi-search search__icon"></i>
			</button>
		</div>
	);
};

export default Search;
