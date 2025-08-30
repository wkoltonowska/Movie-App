import "../scss/Header.scss";
import { Link } from "react-router-dom";

export const Header = () => {
	return (
		<header className="header">
			<div className="header__container">
				<h1 className="header__text">
					Find your favourite movies or series and create{" "}
					<span className="header__text__your-list">your list</span>
				</h1>
				<div className="header__btns">
					<button className="header__btn header__btn-left">
						<Link to="/movies" className="header__link">
							movies
						</Link>
					</button>
					<button className="header__btn">
						<Link to="/series" className="header__link">
							series
						</Link>
					</button>
				</div>
			</div>
		</header>
	);
};
export default Header;

{
	/* <img src={headerPhoto} alt="Games os Thrones" className="header__img" /> */
}
