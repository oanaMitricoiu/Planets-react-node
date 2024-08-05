const { getAllLaunches, addNewLaunch } = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
}

const httpAddNewLaunch = (req, res) => {
    const launch = req.body;
    const { mission, rocket, launchDate, destination } = launch;

    if (!mission || !rocket || !launchDate || !destination) {
        return res.status(400).json({
            error: "Missing required launch property",
        });
    }

    launch.launchDate = new Date(launch.launchDate);

    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: "Invalid launch date",
        });
    }

    addNewLaunch(launch);

    return res.status(201).json(launch);
};

module.exports = { httpGetAllLaunches, httpAddNewLaunch };