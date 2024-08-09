const mongoose = require("mongoose");

const MONGO_URL = `mongodb+srv://oana:Mitricoiu01@cluster0.4esbfu7.mongodb.net/nasa?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connection.once("open", () => {
    console.log("Mongodb connected yeyyy");
});

mongoose.connection.on("error", (error) => {
    console.log(error);
});

async function mongoConnect() {
    await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
    await mongoose.disconnect();
}

module.exports = { mongoConnect, mongoDisconnect };
