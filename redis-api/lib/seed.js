const { EntityId } = require("redis-om");

const seedData = require("./seed_data");

const seedRedis = async () => {
    let { travelerRepo } = global.redisRepos;
    let existing = await travelerRepo.search().return.count();
    if (existing === 0) {
        for (let i=0; i<seedData.length; i++) {
            let result = await travelerRepo.save(seedData[i]);
            console.log("Seed result", result[EntityId]);
        }
    }
};

module.exports = {
    seedRedis
};