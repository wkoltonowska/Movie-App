const Navbar = ({ isMenuClicked, updateMenu }) => {
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
