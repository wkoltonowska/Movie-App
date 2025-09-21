import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyD6Bi4PjcIgQ6CMHinL8FBvpn6vCCMej8c",
	authDomain: "first-project-8a9e5.firebaseapp.com",
	projectId: "first-project-8a9e5",
	storageBucket: "first-project-8a9e5.firebasestorage.app",
	messagingSenderId: "581033742921",
	appId: "1:581033742921:web:0b4e3b198934bbc5eaa598",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
