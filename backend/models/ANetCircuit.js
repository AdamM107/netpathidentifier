const mongoose = require('mongoose');
const string_decoder = require("string_decoder");

const anetCircuitSchema = new mongoose.Schema({
    POP : String,
    Device : String,
    CircuitID : String,
    Description : String,
    APort : String,
    ZPort : String,
    ZEnd : String,
    Comments : String
})

module.exports = mongoose.model('ANetCircuit', anetCircuitSchema);