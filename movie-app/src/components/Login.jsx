import "../scss/form.scss";
import {
	doSignInWithEmailAndPassword,
	doSignInWithGoogle,
} from "../firebase/auth";
import { useAuth } from "../contexts/authContext/useAuth.jsx";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Nav from "./Nav";
import { zodResolver } from "@hookform/resolvers/zod";

const Login = () => {
	const { userLoggedIn } = useAuth();

	const schema = z.object({
		email: z.string().email(),
		password: z.string().min(8),
	});

	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: { email: "" },
		resolver: zodResolver(schema),
	});

	const [isSigningIn, setIsSigningIn] = useState(false);

	const navigate = useNavigate();

	if (userLoggedIn) {
		return <Navigate to={"/home"} replace={true} />;
	}
	const handleSignUpClick = () => {
		navigate("/signup");
	};

	const onSubmit = async (data) => {
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			console.log(data);
		} catch (error) {
			console.error(error);
			setError("root", { message: "This email is already taken" });
		}
		if (!isSigningIn) {
			setIsSigningIn(true);
			try {
				await doSignInWithEmailAndPassword(data.email, data.password);
			} catch (err) {
				console.error(err);

				setError("password", { message: "Incorrect email or password" });
				setIsSigningIn(false);
			}
		}
		reset();
	};

	const onGoogleSignIn = async () => {
		try {
			await doSignInWithGoogle();
			console.log("Google login success ✅");
			navigate("/home"); // jeśli chcesz od razu przekierować
		} catch (err) {
			console.error("Google login error ❌", err);
			setError("root", { message: "Google sign-in failed" });
		}
	};

	return (
		<>
			<Nav />

			<div className="form__container">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="form__firstSection">
						<div className="form__firstSectionBtn form__activeBtn">Login</div>
						<div className=" form__firstSectionBtn" onClick={handleSignUpClick}>
							Sign Up
						</div>
					</div>
					<div className="form__secondSection">
						<input
							{...register("email")}
							className="emailInput"
							type="text"
							placeholder="Enter your email"
							autoComplete="email"
						/>
						{errors.email && (
							<div className="form__error">{errors.email.message}</div>
						)}
						<input
							{...register("password")}
							className="passwordInput"
							type="password"
							placeholder="Enter your password"
							autoComplete="current-password"
						/>
						{errors.password && (
							<div className="form__error">{errors.password.message}</div>
						)}
					</div>

					{/* <div className="form__rememberMe-container">
						<div className="form__rememberMe-container-box"></div>
						<div className="form__rememberMe-container-text">Remember me</div>
					</div> */}
					<button className="form__btn" type="submit" disabled={isSubmitting}>
						{isSubmitting ? "Loading..." : "Login"}
					</button>
					{errors.root && (
						<div className="form__error">{errors.root.message}</div>
					)}
					<button
						className="form__btn form__btn-google"
						type="button"
						onClick={onGoogleSignIn}>
						Sign in with Google
					</button>
				</form>
			</div>
		</>
	);
};

export default Login;
