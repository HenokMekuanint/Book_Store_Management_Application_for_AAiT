import express from "express";
import { errorHandler, notFound } from "./Middleware/Errors.js";
import userRoute from "./Routes/UserRoutes.js";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import orderRouter from "./Routes/orderRoutes.js";
import productRoute from "./routes/BookRoutes.js";

dotenv.config()
const app =express();
connectDatabase();
app.use(express.json())
app.use("/api/users",userRoute)
app.use("/api/products",orderRouter)
app.use("/api/products", productRoute);
app.use(notFound)
app.use(errorHandler)

app.get("/",(req,res)=>{
    res.send("API is Running...");
})

const PORT=process.env.PORT ||1000;
app.listen(PORT,console.log(`server run in port ${PORT}`));