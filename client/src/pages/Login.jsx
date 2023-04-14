import React, { useEffect, useState } from "react";
import AuthApi from "../api/AuthApi.js";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

function Login() {
    const [userData, setUserData] = useState({
        username: "",
        password: "",
    });

    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const change = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        await AuthApi.post("/signin", {
            username: userData.username,
            password: userData.password,
        }).then((response) => {
            localStorage.setItem("userId", response.data.data._id);
            localStorage.setItem("user", response.data.data.fullname);
            response.data.message === "login successful"
                ? navigate("/dashboard")
                : alert("Login failed");
        });

        setUserData({
            username: "",
            password: "",
        });
    };
    setTimeout(() => {
        setIsLoading(false);
    }, 2000);

    return (
        <div className="login w-screen h-screen flex items-center justify-center bg-lightWhite font-regular">
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <div className="form-container w-8/12 h-4/5 flex items-center justify-around">
                    {/* left */}
                    <div className="w-2/5 text-center font-regular">
                        <h1 className="text-tertiary text-logo">MNote</h1>
                    </div>

                    {/* right */}
                    <div className="bg-lightWhite border-1 border-gray shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-xl h-5/6 w-2/4 flex flex-col items-center justify-center">
                        <h2 className="text-formTitle font-bold font-regular">
                            Hi, let's note
                        </h2>
                        <form className="w-8/12 h-3/5 flex flex-col justify-around my-10">
                            <div className="flex flex-col items-start h-2/5 justify-center">
                                <label
                                    htmlFor="username"
                                    className="text-formLabel font-regular text-label"
                                >
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] leading-formInput rounded-xl w-full font-regular px-5"
                                    value={userData.username}
                                    onChange={change}
                                />
                            </div>
                            <div className="flex flex-col items-start h-2/5 justify-center">
                                <label
                                    htmlFor="password"
                                    className="text-formLabel font-regular text-label"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={userData.password}
                                    className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] leading-formInput rounded-xl w-full font-regular px-5 mx-auto"
                                    onChange={change}
                                />
                            </div>
                            <button
                                type="submit"
                                className="p-2 rounded-full bg-buttonBlue w-2/5 mx-auto text-lightWhite text-buttonText font-regular"
                                onClick={handleLogin}
                            >
                                Login
                            </button>
                        </form>
                        <p className="text-formLabel font-regular">
                            Don't have an account?{" "}
                            <span className="text-tertiary text-formLabel font-regular">
                                <a href="/signup">Register now</a>
                            </span>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;
