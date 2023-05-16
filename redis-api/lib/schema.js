const { Schema } = require("redis-om");

let travelerSchema = new Schema("traveler", {
    first_name: { type: "text", sortable: true },
    last_name: { type: "text", sortable: true },
    street: { type: "text", path: "$.address.street" },
    visit_purpose: { type: "string[]", path: "$.visits[*].purpose" },
    visit_city: { type: "string[]", path: "$.visits[*].city" }
}, {
    stopWords: "OFF"
});

module.exports = {
    travelerSchema
};