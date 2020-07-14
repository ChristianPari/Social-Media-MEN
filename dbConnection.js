const mongoose = require("mongoose"),
    uri = process.env.MONGO_URI,
    deprecatedObj = {

        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false

    };

module.exports = () => {

    mongoose.connect(uri, deprecatedObj, (err) => {

        if (err)
            return console.log("\nERROR\n", err);

        console.log("\nConnection Established to Database");

    });

    mongoose.connection.on("error", (err) => {

        console.log("\nAn error occured while trying to connect:\n", err);

    });

    mongoose.connection.on("connected", () => {

        console.log("\nConnecting to Database, URI:", uri);

    });

};