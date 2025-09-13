//import { useState } from "react";

const Navbar = ({ isMenuClicked, updateMenu }) => {
	// const [burgerBtnClass, setBurgerBtnClass] = useState(
	// 	"burgerBtn__item burgerBtn-unclicked"
	// );
	// const [menuClass, setMenuClass] = useState("menu hidden");

	// const upadteMenu = () => {
	// 	if (!isMenuClicked) {
	// 		setBurgerBtnClass("burgerBtn__item burgerBtn__item-clicked");
	// 		setMenuClass("menu visible");
	// 	} else {
	// 		setBurgerBtnClass("burgerBtn__item burgerBtn__item-unclicked");
	// 		setMenuClass("menu hidden");
	// 	}
	// 	setIsMenuClicked(!isMenuClicked);
	// };

	return (
		<div className="burgerBtn__container" onClick={updateMenu}>
			<div
				className={`burgerBtn__item ${
					isMenuClicked
						? "burgerBtn__item-clicked"
						: "burgerBtn__item-unclicked"
				}`}></div>
			<div
				className={`burgerBtn__item ${
					isMenuClicked
						? "burgerBtn__item-clicked"
						: "burgerBtn__item-unclicked"
				}`}></div>
			<div
				className={`burgerBtn__item ${
					isMenuClicked
						? "burgerBtn__item-clicked"
						: "burgerBtn__item-unclicked"
				}`}></div>
		</div>
	);
};

export default Navbar;
