import "../scss/form.scss";
import {
	doCreateUserWithEmailAndPasswordAndProfile,
	doSignInWithGoogle,
} from "../firebase/auth";
import { useAuth } from "../contexts/authContext/useAuth.jsx";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Nav from "./Nav";

const SignUp = () => {
	const [isRegistering, setIsRegistering] = useState(false);

	const { userLoggedIn } = useAuth();

	const navigate = useNavigate();

	const signUpSchema = z
		.object({
			name: z.string().min(1, "Name is required"),
			surname: z.string().min(1, "Surname is required"),
			email: z.string().min(1, "Email is required").email(),
			password: z
				.string()
				.min(1, "Password is required")
				.min(8, "Password must be at least 8 characters long")
				.regex(/[A-Z]/, "Password must contain at leat one uppercase letter")
				.regex(/[0-9]/, "Password must cotain at least one number")
				.regex(
					/[^a-zA-Z0-9]/,
					"Password must contain at least one special character"
				),
			confirmPassword: z.string().min(1, "Password is required"),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: "Password must match",
			path: ["confirmPassword"],
		});

	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors, isSubmitting },
	} = useForm({ resolver: zodResolver(signUpSchema), mode: "onChange" });

	if (userLoggedIn) {
		return <Navigate to={"/home"} replace={true} />;
	}

	const handleLoginClick = () => {
		navigate("/login");
	};

	const onSubmit = async (data) => {
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));
		} catch (error) {
			console.error(error);
			setError("root", { message: "This email is already taken" });
		}

		if (!isRegistering) {
			setIsRegistering(true);
			await doCreateUserWithEmailAndPasswordAndProfile(
				data.email,
				data.password,
				data.name,
				data.surname
			);
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
						<div className="form__firstSectionBtn" onClick={handleLoginClick}>
							Login
						</div>
						<div className=" form__firstSectionBtn form__activeBtn">
							Sign Up
						</div>
					</div>
					<div className="form__secondSection">
						<input
							{...register("name")}
							type="text"
							className="nameInput"
							placeholder="Enter your name"
						/>
						{errors.name && <div className="error">{errors.name.message}</div>}
						<input
							{...register("surname")}
							type="text"
							className="surnameInput"
							placeholder="Enter your surname"
						/>
						{errors.surname && (
							<div className="error">{errors.surname.message}</div>
						)}
						<input
							{...register("email")}
							className="emailInput"
							type="email"
							placeholder="Enter your email"
							autoComplete="email"
						/>
						{errors.email && (
							<div className="error">{errors.email.message}</div>
						)}
						<input
							{...register("password")}
							className="passwordInput"
							type="password"
							placeholder="Enter your password"
							autoComplete="current-password"
						/>
						{errors.password && (
							<div className="error">{errors.password.message}</div>
						)}
						<input
							{...register("confirmPassword")}
							className="passwordInput"
							type="password"
							placeholder="Repeat your password"
							autoComplete="current-password"
						/>
						{errors.confirmPassword && (
							<div className="error">{errors.confirmPassword.message}</div>
						)}
					</div>

					<button className="form-btn" type="submit" disabled={isSubmitting}>
						Sign Up
					</button>
					{errors.root && <div className="error">{errors.root.message}</div>}
					<button className="form-btn" type="button" onClick={onGoogleSignIn}>
						Sign in with Google
					</button>
				</form>
			</div>
		</>
	);
};

export default SignUp;
