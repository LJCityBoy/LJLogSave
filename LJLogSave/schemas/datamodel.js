
var mongod = require("mongoose");

module.exports = new mongod.Schema({
    system : String,
    type : String,
    date : String,
    other : String
});