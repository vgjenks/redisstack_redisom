const express = require("express");

const redis = require("./lib/redis");
const seed = require("./lib/seed");

const indexRouter = require("./routes/index");

const app = express();

(async () => {
    try {
        await redis.openClient();
        await seed.seedRedis();

        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use("/", indexRouter);
    } catch (e) {
        console.log(e);
    }
})();

module.exports = app;