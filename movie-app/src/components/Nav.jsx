import { useContext, useState } from "react";
import { MoviesContext } from "../contexts/movieContext/MoviesContext.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext/useAuth.jsx";
import { Link } from "react-router-dom";
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
					<Link to="/" className="logo nav__container__item-red">
						MOVIE-APP
					</Link>
				</div>
				<ul
					className={`nav__container ${isMenuClicked ? "visible" : "hidden"}`}>
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
					{!userLoggedIn ? (
						<button className="login__btn" onClick={handleLoginClick}>
							<i className="bi bi-person"></i>
						</button>
					) : (
						<div className="logout__container">
							<span>
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
