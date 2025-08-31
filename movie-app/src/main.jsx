import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import Home from "./components/Home.jsx";
import Movies from "./components/Movies.jsx";
import Series from "./components/Series.jsx";
import MyList from "./components/MyList.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext/AuthProvider.jsx";
import { MoviesProvider } from "./contexts/movieContext/MoviesProvider.jsx";
import "bootstrap-icons/font/bootstrap-icons.css";

const router = createBrowserRouter([
	{ path: "/", element: <App /> },
	{ path: "/home", element: <Home /> },
	{ path: "/series", element: <Series /> },
	{ path: "/movies", element: <Movies /> },
	{ path: "/mylist", element: <MyList /> },
	{ path: "/login", element: <Login /> },
	{ path: "/signup", element: <SignUp /> },
	{ path: "*", element: <NotFoundPage /> },
	//{ path: "/login/:id", element: <Login /> },
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<AuthProvider>
			<MoviesProvider>
				<RouterProvider router={router} />
			</MoviesProvider>
		</AuthProvider>
	</StrictMode>
);
