const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");

const { loadPlanetsData } = require("./models/planets.model");

const PORT = 8000;

const MONGO_URL = `mongodb+srv://oana:Mitricoiu01@cluster0.4esbfu7.mongodb.net/nasa?retryWrites=true&w=majority&appName=Cluster0`;

const server = http.createServer(app);

mongoose.connection.once("open", () => {
    console.log("Mongodb connected yeyyy");
});

mongoose.connection.on("error", (error) => {
    console.log(error);
});

async function startServer() {
    await mongoose.connect(MONGO_URL);
    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
}

startServer();
