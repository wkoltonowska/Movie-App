import { Link } from "react-router-dom";

const NotFoundPage = () => {
	return (
		<div className="not-found-page__container">
			<h1 className="not-found-page__title">Not Found Page</h1>
			<Link to={"/"}>
				<button className="not-found-page__btn">Go back Home</button>
			</Link>
		</div>
	);
};

export default NotFoundPage;
