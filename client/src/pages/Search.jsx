import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import OrderApi from "../api/OrderApi.js";

function Search() {
    const [tableData, setTableData] = useState([]);
    const [name, setName] = useState("");

    const fetchSearch = () => {
        OrderApi.post("/order/search", {
            userId: localStorage.getItem("userId"),
            name: name,
        }).then((response) => {
            setTableData(response.data.data);
        });
        setName("");
    };
    useEffect(() => {
        console.clear();
    });
    return (
        <div className="overflow-hidden h-screen bg-lightWhite">
            <Navbar />
            <div className="w-['70%'] ml-bodyleft mt-topContent p-10 bg-lightWhite h-bodyHeight overflow-x-hidden flex flex-col gap-10 font-regular">
                {/* top */}
                <div className="flex flex-col items-start justify-center gap-3 h-2/12">
                    <h2 className="text-large text-label">Search Order</h2>
                    <div className="flex gap-5 items-center">
                        <input
                            type="text"
                            name="name"
                            className="px-7 py-1 bg-gray2 rounded-full text-large"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <button
                            type="submit"
                            onClick={fetchSearch}
                            className="bg-tertiary
                         text-lightWhite rounded-full px-5 py-2 hover:bg-primary"
                        >
                            Search
                        </button>
                    </div>
                </div>

                {/* bottom */}
                <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-9/12 h-8/12 bg-lightWhite rounded-xl p-5">
                    <table className="w-full">
                        <thead className="text-center ">
                            <tr className="flex justify-around">
                                <th className="w-1/4">Item Name</th>
                                <th className="w-1/4">Amount</th>
                                <th className="w-1/4">Total Price</th>
                                <th className="w-1/4">Date</th>
                            </tr>
                        </thead>
                        <hr className="text-gray mt-2" />
                        <tbody className="text-center">
                            {tableData.length > 0 &&
                                tableData.map((data) => (
                                    <tr
                                        className="flex justify-around text-center leading-sidebarItem"
                                        key={data._id}
                                    >
                                        <td className="w-1/4">{data.name}</td>
                                        <td className="w-1/4">{data.amount}</td>
                                        <td className="w-1/4">{data.price}</td>
                                        <td className="w-1/4">{data.date}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Search;
