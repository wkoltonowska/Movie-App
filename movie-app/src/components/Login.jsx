import "../scss/form.scss";
import {
	doSignInWithEmailAndPassword,
	//doSignInWithGoogle,
} from "../firebase/auth";
import { useAuth } from "../contexts/authContext/useAuth.jsx";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

const Login = () => {
	const { userLoggedIn } = useAuth();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [isSigningIn, setIsSigningIn] = useState(false);
	const [errorMessage, setErrorMessage] = useState({ email: "", password: "" });

	const navigate = useNavigate();

	if (userLoggedIn) {
		return <Navigate to={"/home"} replace={true} />;
	}
	const handleSignUpClick = () => {
		navigate("/signup");
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		setErrorMessage({ email: "", password: "" });
		if (!email.includes("@")) {
			setErrorMessage((prev) => ({ ...prev, email: "Email must include @" }));
			return;
		}
		// if (password.length < 8) {
		// 	setErrorMessage({
		// 		...errorMessage,
		// 		password: "Password must be at least 8 chars",
		// 	});
		// 	return;
		// }

		if (!isSigningIn) {
			setIsSigningIn(true);
			try {
				await doSignInWithEmailAndPassword(email, password);
			} catch (err) {
				// np. FirebaseAuthError
				console.error(err);

				setErrorMessage((prev) => ({
					...prev,
					password: "Incorrect email or password",
				}));
				setIsSigningIn(false);
			}
		}
	};

	// const onGoogleSignIn = (e) => {
	// 	e.preventDefault();
	// 	if (!isSigningIn) {
	// 		setIsSigningIn(true);
	// 		doSignInWithGoogle().catch((err) => {
	// 			console.error(err);
	// 			setIsSigningIn(false);
	// 		});
	// 	}
	// };

	return (
		<>
			<Nav />

			<div className="form__container">
				<form onSubmit={onSubmit}>
					<div className="form__firstSection">
						<div className="form__firstSectionBtn form__activeBtn">Login</div>
						<div className=" form__firstSectionBtn" onClick={handleSignUpClick}>
							Sign Up
						</div>
					</div>
					<div className="form__secondSection">
						<input
							className="emailInput"
							type="email"
							placeholder="Enter your email"
							autoComplete="email"
							required
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
						<input
							className="passwordInput"
							type="password"
							placeholder="Enter your password"
							autoComplete="current-password"
							required
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
					</div>
					{errorMessage.email && (
						<span className="error">{errorMessage.email}</span>
					)}
					{errorMessage.password && (
						<span className="error">{errorMessage.password}</span>
					)}
					<div className="form__rememberMe-container">
						<div className="form__rememberMe-container-box"></div>
						<div className="form__rememberMe-container-text">Remember me</div>
					</div>
					<button className="form-btn" type="submit" disabled={isSigningIn}>
						Login
					</button>
				</form>
			</div>
		</>
	);
};

export default Login;
