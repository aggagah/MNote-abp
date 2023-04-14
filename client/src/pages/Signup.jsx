import React, { useState } from "react";
import AuthApi from "../api/AuthApi.js";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [userData, setUserData] = useState({
        fullname: "",
        username: "",
        email: "",
        phoneNumber: "",
        password: "",
    });

    const navigate = useNavigate();

    const change = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        await AuthApi.post("/signup", {
            fullname: userData.fullname,
            username: userData.username,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
            password: userData.password,
        }).then((response) => {
            if (response.data.message === "user created successfully") {
                navigate("/");
            }
        });

        setUserData({
            fullname: "",
            username: "",
            email: "",
            phoneNumber: "",
            password: "",
        });
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-lightWhite">
            <div className="bg-lightWhite border-1 border-label shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-xl h-5/6 w-5/6 flex flex-col justify-center items-center">
                <h2 className="text-formTitle font-bold font-regular h-1/5">
                    Register
                </h2>
                <form className="flex justify-center items-center px-10 w-full h-3/4 ">
                    {/* left */}
                    <div className="w-2/4 h-5/6 flex flex-col items-center justify-around">
                        <div className="flex flex-col items-start h-2/5 justify-center w-2/4">
                            <label
                                htmlFor="fullname"
                                className="text-formLabel font-regular text-label"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                name="fullname"
                                className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] leading-formInput rounded-xl w-full font-regular px-5 border-none"
                                value={userData.fullname}
                                onChange={change}
                            />
                        </div>
                        <div className="flex flex-col items-start h-2/5 justify-center w-2/4">
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
                        <div className="flex flex-col items-start h-2/5 justify-center w-2/4">
                            <label
                                htmlFor="email"
                                className="text-formLabel font-regular text-label"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] leading-formInput rounded-xl w-full font-regular px-5"
                                value={userData.email}
                                onChange={change}
                            />
                        </div>
                    </div>
                    {/* right */}
                    <div className="w-2/4 h-5/6 flex flex-col items-center justify-around">
                        <div className="flex flex-col items-start h-2/5 justify-center w-2/4">
                            <label
                                htmlFor="phoneNumber"
                                className="text-formLabel font-regular text-label"
                            >
                                Phone Number
                            </label>
                            <input
                                type="text"
                                name="phoneNumber"
                                className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] leading-formInput rounded-xl font-regular px-5 w-full"
                                value={userData.phoneNumber}
                                onChange={change}
                            />
                        </div>
                        <div className="flex flex-col items-start h-2/5 justify-center w-2/4">
                            <label
                                htmlFor="password"
                                className="text-formLabel font-regular text-label"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] leading-formInput rounded-xl w-full font-regular px-5"
                                value={userData.password}
                                onChange={change}
                            />
                        </div>
                        <div className="w-2/4 flex flex-col justify-center items-center gap-7">
                            <button
                                type="submit"
                                className="p-2 rounded-full bg-buttonBlue w-2/5 mx-auto text-lightWhite text-buttonText font-regular"
                                onClick={handleRegister}
                            >
                                Register
                            </button>
                            <p className="text-formLabel font-regular">
                                Already have an account?{" "}
                                <span className="text-tertiary text-formLabel font-regular">
                                    <a href="/">Login</a>
                                </span>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
