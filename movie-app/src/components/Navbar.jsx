import { useState } from "react";

const Navbar = () => {
	const [burgerBtnClass, setBurgerBtnClass] = useState(
		"burgerBtn__item burgerBtn-unclicked"
	);
	const [menuClass, setMenuClass] = useState("menu hidden");
	const [isMenuClicked, setIsMenuClicked] = useState(false);

	const upadteMenu = () => {
		if (!isMenuClicked) {
			setBurgerBtnClass("burgerBtn__item burgerBtn__item-clicked");
			setMenuClass("menu visible");
		} else {
			setBurgerBtnClass("burgerBtn__item burgerBtn__item-unclicked");
			setMenuClass("menu hidden");
		}
		setIsMenuClicked(!isMenuClicked);
	};

	return (
		<div className="burgerBtn__container" onClick={upadteMenu}>
			<div className={burgerBtnClass}></div>
			<div className={burgerBtnClass}></div>
			<div className={burgerBtnClass}></div>
			<div className={menuClass}></div>
		</div>
	);
};

export default Navbar;
