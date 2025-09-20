import { useContext, useState } from "react";
import { MoviesContext } from "../contexts/movieContext/MoviesContext.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext/useAuth.jsx";
import { NavLink } from "react-router-dom";
import { auth } from "../firebase/firebase.js";
import { signOut } from "firebase/auth";

import Search from "./Search";
import Navbar from "./Navbar.jsx";
import "../scss/nav.scss";

const Nav = () => {
	const { userLoggedIn, currentUser } = useAuth();
	const { searchValue, setSearchValue } = useContext(MoviesContext);
	const [isMenuClicked, setIsMenuClicked] = useState(false);
	const navigate = useNavigate();

	const updateMenu = () => {
		setIsMenuClicked(!isMenuClicked);
	};

	const handleLoginClick = () => {
		navigate("/login");
		if (location.pathname === "/login") {
			window.location.reload();
		}
	};

	const handleLogOutClick = async () => {
		await signOut(auth);
		navigate("/");
	};

	const menuItems = [
		{ path: "/movies", label: "MOVIES" },
		{ path: "/series", label: "SERIES" },
		{ path: "/mylist", label: "MY LIST" },
	];

	return (
		<nav className={`nav ${!isMenuClicked ? "nav-extended" : ""}`}>
			<div className="wrapper">
				<div>
					<NavLink to="/" className="logo nav__container__item-red">
						MOVIE-APP
					</NavLink>
				</div>
				<ul
					className={`nav__container ${isMenuClicked ? "visible" : "hidden"}`}>
					<li>
						<NavLink
							to="/home"
							className=" nav__container__item nav__container__item-red ">
							HOME
						</NavLink>
					</li>
					{menuItems.map((item) => (
						<li key={item.path}>
							<NavLink
								to={item.path}
								className={({ isActive }) =>
									`nav__container__item ${
										isActive ? "nav__container__item-active" : ""
									}`
								}>
								{item.label}
							</NavLink>
						</li>
					))}
				</ul>
				<div className="nav__second-container">
					{!userLoggedIn ? (
						<button className="login__btn" onClick={handleLoginClick}>
							<i className="bi bi-person"></i>
						</button>
					) : (
						<div className="logout__container">
							<span className="logout__text">
								Hello! {currentUser?.displayName || currentUser?.email}{" "}
							</span>
							<button className="logout__btn" onClick={handleLogOutClick}>
								<i className="bi bi-box-arrow-right"></i>
							</button>
						</div>
					)}
					<Search
						searchValue={searchValue}
						setSearchValue={setSearchValue}
						className={` ${isMenuClicked ? "visible" : "hidden"}`}
					/>
					<Navbar isMenuClicked={isMenuClicked} updateMenu={updateMenu} />
				</div>
			</div>
		</nav>
	);
};

export default Nav;
