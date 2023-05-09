import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import OrderApi from "./api/OrderApi.js";
import LoadingSpinner from "./components/LoadingSpinner.jsx";

// this is the dashboard component
function App() {
    const [data, setData] = useState([]);
    const [orderData, setOrderData] = useState({
        name: "",
        amount: undefined,
    });

    const [yesterdayData, setYesterdayData] = useState([]);

    let yesterday = `${
        new Date().getDate() - 1 < 10 && new Date().getDate() - 1 >= 0
            ? "0" + new Date().getDate() - 1
            : new Date().getDate() - 1
    }-${
        new Date().getMonth() < 10 && new Date().getDate() - 1 >= 0
            ? "0" + (new Date().getMonth() + 1)
            : new Date().getMonth() + 1
    }-${new Date().getFullYear()}`;

    const [loadingToday, setLoadingToday] = useState(true);
    const [loadingYesterday, setLoadingYesterday] = useState(true);

    const getAllOrders = async () => {
        await OrderApi.post("/order", {
            userId: localStorage.getItem("userId"),
        })
            .then((res) => {
                console.log(res.data.data);
                setData(res.data.data);
                setLoadingToday(false);
            })
            .catch((err) => {
                console.log(err);
                setLoadingToday(false);
            });
    };

    const getYesterdayOrders = async () => {
        await OrderApi.post("/order/orderbydate", {
            userId: localStorage.getItem("userId"),
            date: yesterday,
        })
            .then((response) => {
                setYesterdayData(response.data.data.orders);
                setLoadingYesterday(false);
            })
            .catch((err) => {
                console.log(err);
                setLoadingYesterday(false);
            });
    };

    const change = (e) => {
        e.preventDefault();
        setOrderData({ ...orderData, [e.target.name]: e.target.value });
    };

    const addNewOrder = async (e) => {
        e.preventDefault();
        await OrderApi.post("/order/order", {
            userId: localStorage.getItem("userId"),
            name: orderData.name,
            amount: orderData.amount,
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
        setOrderData({
            name: "",
            amount: "--",
        });
    };

    useEffect(() => {
        getAllOrders();
        getYesterdayOrders();
    }, [data, orderData]);

    return (
        <div className="overflow-hidden h-screen bg-lightWhite">
            <Navbar />
            <div className="w-bodyContainer ml-bodyleft mt-topContent p-10 bg-lightWhite h-bodyHeight overflow-x-hidden flex justify-center items-center font-regular">
                {/* left */}
                <div className="w-2/4 flex h-full p-5 flex-col">
                    {/* today */}
                    <div className="w-full h-2/4 flex flex-col gap-5">
                        <h2 className="font-regular font-bold text-buttonText">
                            Today's order
                        </h2>
                        {loadingToday ? (
                            <LoadingSpinner />
                        ) : (
                            <div className="flex gap-5 overflow-x-scroll py-5 px-2 w-auto">
                                {data.length > 0 ? (
                                    data.map((order) => (
                                        <div
                                            className="w-cardWidth h-cardHeight bg-lightWhite shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-10 rounded-xl font-regular text-medium text-center"
                                            key={order._id}
                                        >
                                            <h2 className="font-bold text-large text-tertiary">
                                                {order.name}
                                            </h2>
                                            <p>{order.amount}</p>
                                            <p>{order.price}</p>
                                        </div>
                                    ))
                                ) : (
                                    <h2 className="text-primary">
                                        No data available
                                    </h2>
                                )}
                            </div>
                        )}
                    </div>
                    {/* yesterday */}
                    <div className="w-full h-2/4 flex flex-col gap-5">
                        <h2 className="font-regular font-bold text-buttonText">
                            Yesterday's order
                        </h2>
                        {loadingYesterday ? (
                            <LoadingSpinner />
                        ) : (
                            <div className="flex gap-5 overflow-x-scroll py-5 px-2">
                                {yesterdayData.length > 0 ? (
                                    yesterdayData.map((data) => (
                                        <div
                                            className="w-cardWidth h-cardHeight bg-lightWhite shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-10 rounded-xl font-regular text-medium text-center"
                                            key={data._id}
                                        >
                                            <h2 className="font-bold text-large text-tertiary">
                                                {data.name}
                                            </h2>
                                            <p>{data.amount}</p>
                                            <p>{data.price}</p>
                                        </div>
                                    ))
                                ) : (
                                    <h2 className="text-primary">
                                        No data available
                                    </h2>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* right */}
                <div className="w-2/4 h-5/6 flex flex-col items-start justify-start pl-20 top-0 pb-40">
                    <h2 className="text-buttonText font-bold font-regular h-1/5 text-center -translate-y-10">
                        Add New Order
                    </h2>
                    <form className="w-8/12 h-full flex flex-col justify-around my-10 gap-10 bg-lightWhite shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-2xl p-10 -translate-y-10">
                        <div className="flex flex-col items-start h-2/5 justify-center">
                            <label
                                htmlFor="name"
                                className="text-formLabel font-regular text-label"
                            >
                                Item Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] leading-formInput rounded-xl w-full font-regular px-5"
                                value={orderData.name}
                                onChange={change}
                            />
                        </div>
                        <div className="flex flex-col items-start h-2/5 justify-center">
                            <label
                                htmlFor="password"
                                className="text-formLabel font-regular text-label"
                            >
                                Amount
                            </label>
                            <select
                                name="amount"
                                className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] h-14 text-large rounded-xl w-full font-regular px-5 mx-auto"
                                value={orderData.amount}
                                onChange={change}
                            >
                                <option defaultChecked>--</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="p-2 rounded-full bg-buttonBlue w-2/5 mx-auto text-lightWhite text-buttonText font-regular"
                            onClick={addNewOrder}
                        >
                            Add
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;
