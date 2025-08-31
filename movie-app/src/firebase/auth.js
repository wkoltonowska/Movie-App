import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

import { auth } from "./firebase";

import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	sendEmailVerification,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	updatePassword,
} from "firebase/auth";

// export const doCreateUserWithEmailAndPassword = async (email, password) => {
// 	return createUserWithEmailAndPassword(auth, email, password);
// };

export const doCreateUserWithEmailAndPasswordAndProfile = async (
	email,
	password,
	name,
	surname
) => {
	// tworzymy usera w Firebase Auth
	const userCredential = await createUserWithEmailAndPassword(
		auth,
		email,
		password
	);
	const user = userCredential.user;

	// zapisujemy dodatkowe dane w Firestore
	await setDoc(doc(db, "users", user.uid), {
		email: user.email,
		name,
		surname,
		favourites: [],
	});

	return user; // zwracamy usera, jeśli chcemy go użyć w komponencie
};

export const doSignInWithEmailAndPassword = (email, password) => {
	return signInWithEmailAndPassword(auth, email, password);
};

// export const doSignInWithGoogle = async () => {
// 	const provider = new GoogleAuthProvider();
// 	const result = await signInWithPopup(auth, provider);
// 	const user = result.user;
// 	return result;
// };

export const doSignOut = () => {
	return auth.signOut();
};

export const doPasswordReset = (email) => {
	return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
	return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
	return sendEmailVerification(auth.currentUser, {
		url: `$window.location.origin}/home`,
	});
};
