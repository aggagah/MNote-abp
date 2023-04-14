import { createBrowserRouter } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import App from "./App.jsx";
import Summary from "./pages/Summary.jsx";
import Search from "./pages/Search.jsx";
import Settings from "./pages/Settings.jsx";
import Help from "./pages/Help.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
    {
        path: "/dashboard/*",
        element: <App />,
    },
    {
        path: "/dashboard/summary",
        element: <Summary />,
    },
    {
        path: "/dashboard/search",
        element: <Search />,
    },
    {
        path: "/dashboard/settings",
        element: <Settings />,
    },
    {
        path: "/dashboard/help",
        element: <Help />,
    },
]);

export default router;
