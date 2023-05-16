const express = require("express");
const router = express.Router();

router.get("/:search", async (req, res) => {
    try {
        let { search } = req.params;
        let { travelerRepo } = global.redisRepos;

        let data = await travelerRepo.search()
            .where("first_name").match(search)
            .or("last_name").match(search)
            .or("street").match(search)
            .or("visit_purpose").contains(search)
            .or("visit_city").contains(search)
            .return.all();
    
        if (!data) {
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
