import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import profileDefault from "../assets/profileDefault.png";
import UserApi from "../api/UserApi.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

function Settings() {
    const [user, setUser] = useState({
        fullname: "",
        email: "",
        username: "",
        phoneNumber: "",
        password: "",
    });
    const [loading, setLoading] = useState(true);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const fetchUser = () => {
        UserApi.post("/user", {
            userId: localStorage.getItem("userId"),
        }).then((response) => {
            setUser(response.data.data);
            setLoading(false);
        });
    };

    const updateUser = (e) => {
        e.preventDefault();
        let updatedPassword = "";
        if (
            newPassword !== "" &&
            confirmPassword !== "" &&
            newPassword == confirmPassword
        ) {
            updatedPassword = confirmPassword;
        } else {
            updatedPassword = "default";
        }
        UserApi.put("/user", {
            userId: localStorage.getItem("userId"),
            fullname: user.fullname,
            email: user.email,
            username: user.username,
            phone: user.phoneNumber,
            password: updatedPassword,
        }).then(() => {
            localStorage.setItem("user", user.fullname);
        });

        setNewPassword("");
        setConfirmPassword("");
        window.location.reload(true);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div className="overflow-hidden h-screen bg-lightWhite">
            <Navbar />
            <div className="w-bodyContainer ml-bodyleft mt-topContent p-10 bg-lightWhite h-bodyHeight overflow-x-hidden font-regular grid place-items-center">
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="h-full w-full flex flex-col px-10 items-center justify-evenly">
                        <div className="flex flex-col items-center justify-center gap-1 h-['10%']">
                            <img
                                src={profileDefault}
                                className="h-24 rounded-full bg-lightWhite shadow-md p-2"
                            />
                            <h2 className="text-large">{user.fullname}</h2>
                            <p
                                className="text-med
                         text-gray"
                            >
                                {user.username}
                            </p>
                        </div>
                        <form className="w-2/4 h-['90%'] flex flex-col gap-4">
                            <div className="flex justify-between gap-5">
                                <div className="flex flex-col gap-2 w-2/4">
                                    <label htmlFor="fullname">Name</label>
                                    <input
                                        type="text"
                                        name="fullname"
                                        className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-full leading-sidebarItem bg-lightWhite px-5"
                                        value={user.fullname}
                                        onChange={(e) =>
                                            setUser({
                                                ...user,
                                                fullname: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="flex flex-col gap-2 w-2/4">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-full leading-sidebarItem bg-lightWhite px-5"
                                        value={user.username}
                                        onChange={(e) =>
                                            setUser({
                                                ...user,
                                                username: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email">Email address</label>
                                <input
                                    type="text"
                                    name="email"
                                    className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-full leading-sidebarItem bg-lightWhite px-5"
                                    value={user.email}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="phoneNumber">
                                    Phone number
                                </label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-full leading-sidebarItem bg-lightWhite px-5"
                                    value={user.phoneNumber}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            phoneNumber: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="flex justify-between gap-5">
                                <div className="flex flex-col gap-2 w-2/6">
                                    <label htmlFor="currentPassword">
                                        Current password
                                    </label>
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-full leading-sidebarItem bg-lightWhite px-5"
                                        value={user.password}
                                    />
                                </div>
                                <div className="flex flex-col gap-2 w-2/6">
                                    <label htmlFor="newPassword">
                                        New password
                                    </label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-full leading-sidebarItem bg-lightWhite px-5"
                                        value={newPassword}
                                        onChange={(e) =>
                                            setNewPassword(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="flex flex-col gap-2 w-2/6">
                                    <label htmlFor="confirmPassword">
                                        Confirm password
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-full leading-sidebarItem bg-lightWhite px-5"
                                        value={confirmPassword}
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="mx-auto px-7 py-2 bg-buttonBlue text-lightWhite rounded-full"
                                onClick={updateUser}
                            >
                                Update
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Settings;
