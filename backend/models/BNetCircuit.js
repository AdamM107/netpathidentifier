const mongoose = require('mongoose');

const bnetCircuitSchema = new mongoose.Schema({
    POP : String,
    SwitchType : String,
    CKT_ID : String,
    Mgmt_IP: String
});


module.exports = mongoose.model('BNetCircuit',bnetCircuitSchema);