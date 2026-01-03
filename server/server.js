import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";

//Initialize express app

const app =  express()

// connect database
await connectDB()

//Middleware

app.use(cors());
app.use(express.json())
app.get('/' ,(req,res)=>res.send("Server is running"))

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))