require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 5000 || process.env.PORT;
const path = require("path");
const mongoose = require("mongoose");
const {logger} = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoute");
const corsOptions = require("./config/corsOptions");
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/", require("./routes/root"));

// auth routes
app.use("/auth", authRoutes);
app.all("*", (req, res)=>{
    res.status(404);
    if(req.accepts("html"))
    {
        res.sendFile(path.join(__dirname, "views", "404.html"));
    }else if(req.accepts("json"))
    {
        res.json({message: "404 not found"});
    }else
    {
        res.type("txt").send("404 not found");
    }
})

app.use(errorHandler);
const start = async()=> {
    try{
        await mongoose
            .connect(process.env.DATABASE_URL)
            .then(() => {
                console.log("Connected to DB")
            })
            .catch(err => {
                console.log("Error while connecting to DB" + err)
            });
        app.listen(PORT, () => {
            console.log("Server Running on port " + PORT);
        })
    }catch(err)
    {
        console.log("Error" + err);
    }
}

start();
