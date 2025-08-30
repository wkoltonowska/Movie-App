import { useContext } from "react";
import { MoviesContext } from "../contexts/MoviesContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Search from "./Search";
import "../scss/nav.scss";

import login from "../img/login.png";
import burger from "../img/burger-bar.png";

const Nav = () => {
	const { searchValue, setSearchValue } = useContext(MoviesContext);

	const navigate = useNavigate();

	const handleLoginClick = () => {
		navigate("/login");
	};

	const menuItems = [
		{ path: "/movies", label: "MOVIES" },
		{ path: "/series", label: "SERIES" },
		{ path: "/mylist", label: "MY LIST" },
	];

	return (
		<nav className="nav">
			<div className="wrapper">
				<div>
					<Link to="/" className="logo nav__container__item-red">
						MOVIE-APP
					</Link>
				</div>
				<ul className="nav__container">
					<li>
						<Link
							to="/home"
							className=" nav__container__item nav__container__item-red ">
							HOME
						</Link>
					</li>
					{menuItems.map((item) => (
						<li key={item.path}>
							<Link to={item.path} className=" nav__container__item ">
								{item.label}
							</Link>
						</li>
					))}
				</ul>
				<div className="nav__second-container">
					<button className="login">
						<img
							src={login}
							alt="login"
							className="login__img"
							onClick={handleLoginClick}
						/>
					</button>
					<Search searchValue={searchValue} setSearchValue={setSearchValue} />
					<button className="burgerBtn">
						<img src={burger} alt="burger icon" className="burgerBtn__img" />
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Nav;
