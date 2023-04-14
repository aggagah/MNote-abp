import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import OrderApi from "../api/OrderApi.js";

function Summary() {
    const [tableData, setTableData] = useState([]);
    const [date, setDate] = useState("");

    const fetchDataByDate = () => {
        OrderApi.post("/order/orderbydate", {
            userId: localStorage.getItem("userId"),
            date: `${date[8]}${date[9]}-${date[5]}${date[6]}-${date[0]}${date[1]}${date[2]}${date[3]}`,
        }).then((response) => {
            setTableData(response.data.data.orders);
        });
    };

    const handleDelete = (e) => {
        e.preventDefault();
        OrderApi.delete("/order", {
            data: {
                userId: localStorage.getItem("userId"),
                orderId: e.target.id,
            },
        }).then(() => {
            setTableData(tableData.filter((row) => row._id !== e.target.id));
        });
    };

    useEffect(() => {}, [tableData]);

    return (
        <div className="overflow-hidden h-screen bg-lightWhite">
            <Navbar />
            <div className="w-bodyContainer ml-bodyleft mt-topContent p-10 bg-lightWhite h-bodyHeight overflow-x-hidden flex flex-col gap-10 font-regular">
                {/* top */}
                <div className="flex flex-col items-start justify-center gap-3 h-2/12">
                    <h2 className="text-large text-label">Select Date</h2>
                    <div className="flex gap-5 items-center">
                        <input
                            type="date"
                            name="date"
                            className="px-7 py-1 bg-gray2 rounded-full text-large"
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <button
                            type="submit"
                            onClick={fetchDataByDate}
                            className="bg-tertiary
                         text-lightWhite rounded-full px-5 py-2 hover:bg-primary"
                        >
                            Filter
                        </button>
                    </div>
                </div>

                {/* bottom */}
                <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-9/12 h-8/12 bg-lightWhite rounded-xl p-5">
                    <table className="w-full">
                        <thead className="text-center ">
                            <tr className="flex justify-around">
                                <th className="w-1/5">Date</th>
                                <th className="w-1/5">Amount</th>
                                <th className="w-1/5">Total Price</th>
                                <th className="w-1/5">Item Name</th>
                                <th className="w-1/5">Action</th>
                            </tr>
                        </thead>
                        <hr className="text-gray mt-2" />
                        <tbody className="text-center">
                            {tableData.length > 0 &&
                                tableData.map((data) => (
                                    <tr
                                        className="flex justify-around text-center leading-sidebarItem"
                                        key={data.user}
                                    >
                                        <td className="w-1/5">{data.date}</td>
                                        <td className="w-1/5">{data.amount}</td>
                                        <td className="w-1/5">{data.price}</td>
                                        <td className="w-1/5">{data.name}</td>
                                        <td className="w-1/5">
                                            <button
                                                className="px-3 py-0.5 bg-primary rounded-xl w-8/12 leading-normal text-lightWhite text-medium"
                                                id={data._id}
                                                onClick={handleDelete}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Summary;
