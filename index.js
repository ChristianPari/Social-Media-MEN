require("dotenv").config();
const express = require("express"),
    app = express(),
    port = process.env.PORT || 5000,
    morgan = require("morgan"),
    dbConnection = require("./dbConnection"),
    userRouter = require("./routes/userRouter"),
    homeRouter = require("./routes/homeRouter");

app.use(morgan("dev"));
app.use(express.json());

dbConnection();

app.use("/", homeRouter);
app.use("/users", userRouter);

app.listen(port, () => { console.log("\nListening on port:", port) });