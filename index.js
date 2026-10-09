require('dotenv').config();

const dns = require("dns");
dns.setServers(["8.8.8.8" , "8.8.4.4"]);

const express = require("express");
const app = express();

const userroutes = require("./src/routes/userroutes");
const connectDB = require("./src/config/db");

app.use(express.json());    
app.use("/users",userroutes);

connectDB();
app.get("/",(req , res) =>{
  res.json("hello");
});

const PORT = process.env.PORT  

app.listen(PORT,() => {
    console.log(`server is running on http://localhost:${PORT}`);
});