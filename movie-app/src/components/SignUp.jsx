import "../scss/form.scss";
//import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import { doCreateUserWithEmailAndPasswordAndProfile } from "../firebase/auth";
import { useAuth } from "../contexts/authContext/useAuth.jsx";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

const SignUp = () => {
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [isRegistering, setIsRegistering] = useState(false);
	const [errorMessage, setErrorMessage] = useState({ email: "", password: "" });

	const { userLoggedIn } = useAuth();

	const navigate = useNavigate();

	if (userLoggedIn) {
		return <Navigate to={"/home"} replace={true} />;
	}

	const handleLoginClick = () => {
		navigate("/login");
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		setErrorMessage({ email: "", password: "" });
		if (!email.includes("@")) {
			setErrorMessage((prev) => ({ ...prev, email: "Email must include @" }));
			return;
		}
		if (password.length < 8) {
			setErrorMessage({
				...errorMessage,
				password: "Password must be at least 8 chars",
			});
			return;
		}

		if (!isRegistering) {
			setIsRegistering(true);
			// await doCreateUserWithEmailAndPassword(email, password);
			await doCreateUserWithEmailAndPasswordAndProfile(
				email,
				password,
				name,
				surname
			);
		}
	};

	return (
		<>
			<Nav />

			<div className="form__container">
				<form onSubmit={onSubmit}>
					<div className="form__firstSection">
						<div className="form__firstSectionBtn" onClick={handleLoginClick}>
							Login
						</div>
						<div className=" form__firstSectionBtn form__activeBtn">
							Sign Up
						</div>
					</div>
					<div className="form__secondSection">
						<input
							type="text"
							className="nameInput"
							placeholder="Enter your name"
							value={name}
							required
							onChange={(e) => setName(e.target.value)}
						/>
						<input
							type="text"
							className="surnameInput"
							placeholder="Enter your surname"
							value={surname}
							required
							onChange={(e) => setSurname(e.target.value)}
						/>
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
						<input
							className="passwordInput"
							type="password"
							placeholder="Repeat your password"
							autoComplete="current-password"
							required
							value={confirmPassword}
							onChange={(e) => {
								setConfirmPassword(e.target.value);
							}}
						/>
					</div>
					{errorMessage.email && (
						<span className="error">{errorMessage.email}</span>
					)}
					{errorMessage.password && (
						<span className="error">{errorMessage.password}</span>
					)}

					<button className="form-btn" type="submit" disabled={isRegistering}>
						Sign Up
					</button>
				</form>
			</div>
		</>
	);
};

export default SignUp;
