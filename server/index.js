import express from "express";
import mongoose from "mongoose";
import cors from "cors	";
import bodyParser from "body-parser";
import morgan from "morgan";
import authRouter from "./routes/Auth.route.js";
import orderRouter from "./routes/Order.route.js";
import userRoute from "./routes/User.route.js";

// define application
const app = express();
app.use(express.json());
app.use(cors());
app.options("*", cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); // logging http request

// basic api endpoint
app.get("/", (req, res) => {
    res.status(200).json({ message: "OK" });
});

// auth routes
app.use("/auth", authRouter);
// order routes
app.use("/orders", orderRouter);
// user routes
app.use("/users", userRoute);

// connect to database
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    });
