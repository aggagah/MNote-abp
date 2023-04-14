import React from "react";
import Navbar from "../components/Navbar.jsx";

function Help() {
    return (
        <div className="overflow-hidden h-screen bg-lightWhite">
            <Navbar />
            <div className="w-bodyContainer ml-bodyleft mt-topContent p-10 bg-lightWhite h-bodyHeight overflow-x-hidden font-regular grid place-items-center">
                <div className="w-9/12 h-['85%'] shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-xl p-10 text-center">
                    <h1 className="text-dashboardLogo text-tertiary font-bold">
                        MNote
                    </h1>
                    <p className="text-medium text-gray italic">
                        "Effortlessly track your food orders with MNote - Your
                        ultimate food diary!"
                    </p>
                    {/* content */}
                    <div className="flex flex-col justify-around items-center h-['85%'] w-full mt-5 gap-5 overflow-y-auto py-5">
                        <div className="flex flex-col items-start w-9/12 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md bg-lightWhite px-5 py-2 gap-2">
                            <h3>How to login?</h3>
                            <hr className="text-gray w-full" />
                            <p className="text-justify">
                                Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Doloribus dolores dolorem a.
                                Dolorem deserunt dolor ad, harum nihil iste qui.
                                Ea, sed quidem. Tenetur numquam, minus
                                voluptatibus obcaecati delectus nostrum maiores
                                velit reprehenderit, quibusdam qui hic. Eaque
                                necessitatibus officia placeat dolores quibusdam
                                eligendi laborum iste explicabo impedit animi,
                                alias ratione.
                            </p>
                        </div>
                        <div className="flex flex-col items-start w-9/12 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md bg-lightWhite px-5 py-2 gap-2">
                            <h3>How to login?</h3>
                            <hr className="text-gray w-full" />
                            <p className="text-justify">
                                Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Doloribus dolores dolorem a.
                                Dolorem deserunt dolor ad, harum nihil iste qui.
                                Ea, sed quidem. Tenetur numquam, minus
                                voluptatibus obcaecati delectus nostrum maiores
                                velit reprehenderit, quibusdam qui hic. Eaque
                                necessitatibus officia placeat dolores quibusdam
                                eligendi laborum iste explicabo impedit animi,
                                alias ratione.
                            </p>
                        </div>
                        <div className="flex flex-col items-start w-9/12 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md bg-lightWhite px-5 py-2 gap-2">
                            <h3>How to login?</h3>
                            <hr className="text-gray w-full" />
                            <p className="text-justify">
                                Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Doloribus dolores dolorem a.
                                Dolorem deserunt dolor ad, harum nihil iste qui.
                                Ea, sed quidem. Tenetur numquam, minus
                                voluptatibus obcaecati delectus nostrum maiores
                                velit reprehenderit, quibusdam qui hic. Eaque
                                necessitatibus officia placeat dolores quibusdam
                                eligendi laborum iste explicabo impedit animi,
                                alias ratione.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Help;
