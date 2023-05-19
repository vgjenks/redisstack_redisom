const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        let { 
            visit_purpose,
            visit_city,
            city,
            first_name,
            last_name
        } = req.query;

        let { travelerRepo } = global.redisRepos;

        let data = travelerRepo.search();
            
        if (visit_purpose) {
            data = data.and("visit_purpose").contains(visit_purpose);
        }
        if (first_name) {
            data = data.and("first_name").match(`*${first_name}*`);
        }
        if (last_name) {
            data = data.and("last_name").match(`*${last_name}*`);
        }
        if (city) {
            data = data.and("city").match(city);
        }
        if (visit_city) {
            data = data.and("visit_city").contains(visit_city);
        }
        
        data = await data.return.all();
    
        if (!data || data.length === 0) {
            return res.status(404).send({
                error: "No records found"
            });
        }
        return res.status(200).send(data);
    } catch (e) {
        return res.status(500).send({
            error: `ERROR: ${e.message}`
        });
    }
});

module.exports = router;
