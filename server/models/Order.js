import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

export default mongoose.model("Order", schema);
