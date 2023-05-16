const { createClient } = require("redis");
const { Repository } = require("redis-om");

const schema = require("./schema");

const SERVER = "redis://localhost:6379";

const loadSchemas = async client => {
    let { travelerSchema } = schema;
    let travelerRepo = new Repository(travelerSchema, client);
    await travelerRepo.createIndex();
    return {
        travelerRepo
    };
};

const openClient = async () => {
    let client = createClient({ url: SERVER });
    await client.connect();
    global.redisRepos = await loadSchemas(client);
    global.redisClient = client;
};

const closeClient = async () => {
    await global.redisClient.close();
};

module.exports = {
    openClient,
    closeClient
};