import React, { useState, useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import App from "../App.jsx";
import Summary from "../pages/Summary.jsx";
import Search from "../pages/Search.jsx";
import Settings from "../pages/Settings.jsx";
import Help from "../pages/Help.jsx";
import { BiUserCircle } from "react-icons/bi";

function Navbar() {
    const [path, setPath] = useState("");
    const [user, setUser] = useState(null);

    const handlePath = () => {
        setPath(window.location.pathname);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("userId");
    };

    useEffect(() => {
        setUser(localStorage.getItem("user"));
    }, []);
    return (
        <>
            {/* top */}
            <nav className="flex justify-end gap-5 items-center px-10 py-5 w-screen h-topbar bg-lightWhite shadow-md  z-40 absolute">
                <h1 className="text-large">{user}</h1>
                <BiUserCircle className=" text-quaternary" size={"1.5em"} />
            </nav>
            {/* left */}
            <div className=" flex flex-col justify-around w-sidebar bg-lightWhite shadow-xl rounded-md h-screen z-40 absolute top-0 items-center gap-10 py-10 font-regular">
                <div className="top w-full text-center pr-5 h-full">
                    <div className="logo w-full pr-5 h-1/5">
                        <h1 className="text-tertiary text-dashboardLogo font-bold font-regular">
                            MNote
                        </h1>
                    </div>
                    <ul className="w-full pr-5 font-regular h-3/5">
                        <Link to="/dashboard" onClick={handlePath}>
                            <li
                                className={`leading-loose px-5 w-full text-buttonText ${
                                    window.location.pathname === "/dashboard"
                                        ? " rounded-r-xl bg-tertiary text-lightWhite"
                                        : ""
                                }
                                `}
                            >
                                Dashboard
                            </li>
                        </Link>
                        <Link to="/dashboard/summary" onClick={handlePath}>
                            <li
                                className={`leading-loose px-5 w-full text-buttonText ${
                                    window.location.pathname ===
                                    "/dashboard/summary"
                                        ? " rounded-r-xl bg-tertiary text-lightWhite"
                                        : ""
                                }
                                `}
                            >
                                Summary
                            </li>
                        </Link>
                        <Link to="/dashboard/search" onClick={handlePath}>
                            <li
                                className={`leading-loose px-5 w-full text-buttonText ${
                                    window.location.pathname ===
                                    "/dashboard/search"
                                        ? " rounded-r-xl bg-tertiary text-lightWhite"
                                        : ""
                                }
                                `}
                            >
                                Search
                            </li>
                        </Link>
                        <Link to="/dashboard/settings" onClick={handlePath}>
                            <li
                                className={`leading-loose px-5 w-full text-buttonText ${
                                    window.location.pathname ===
                                    "/dashboard/settings"
                                        ? " rounded-r-xl bg-tertiary text-lightWhite"
                                        : ""
                                }
                                `}
                            >
                                Settings
                            </li>
                        </Link>
                        <Link to="/dashboard/help" onClick={handlePath}>
                            <li
                                className={`leading-loose px-5 w-full text-buttonText ${
                                    window.location.pathname ===
                                    "/dashboard/help"
                                        ? " rounded-r-xl bg-tertiary text-lightWhite"
                                        : ""
                                }
                                `}
                            >
                                FaQ
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="bottom h-1/5">
                    <Link to="/" onClick={handleLogout}>
                        <li className="leading-loose w-full list-none bg-primary px-20 py-1 text-buttonText rounded-full text-lightWhite">
                            Logout
                        </li>
                    </Link>
                </div>
            </div>
            <Routes>
                <Route path="/dashboard" element={<App />} />
                <Route path="/dashboard/summary" element={<Summary />} />
                <Route path="/dashboard/search" element={<Search />} />
                <Route path="/dashboard/settings" element={<Settings />} />
                <Route path="/dashboard/help" element={<Help />} />
            </Routes>
        </>
    );
}

export default Navbar;
