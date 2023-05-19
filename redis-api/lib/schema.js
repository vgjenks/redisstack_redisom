const { Schema } = require("redis-om");

let travelerSchema = new Schema("traveler", {
    first_name: { type: "text" },
    last_name: { type: "text" },
    street: { type: "text", path: "$.address.street" },
    city: { type: "text", path: "$.address.city" },
    state: { type: "text", path: "$.address.state" },
    postal: { type: "text", path: "$.address.postal" },
    visit_purpose: { type: "string[]", path: "$.visits[*].purpose" },
    visit_city: { type: "string[]", path: "$.visits[*].city" },
    visit_start: { type: "date" },
    visit_end: { type: "date" }
}, {
    stopWords: "OFF"
});

module.exports = {
    travelerSchema
};