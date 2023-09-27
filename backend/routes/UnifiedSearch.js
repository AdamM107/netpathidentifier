const express = require('express');
const router = express.Router();
const ANetCircuit = require('../models/ANetCircuit');
const BNetCircuit = require('../models/BNetCircuit');
router.post('/search', async (req, res) => {
    console.log('Received search request', req.body);
    const searchQuery = req.body.keyword;
    let anetResults = [];
    let bnetResults = [];

    try {
        anetResults = await ANetCircuit.find({
            $or: [
                { POP: new RegExp(searchQuery, 'i')},
                { Device: new RegExp(searchQuery, 'i')},
                { CircuitID: new RegExp(searchQuery, 'i')},
                { Description: new RegExp(searchQuery, 'i')},
                { APort: new RegExp(searchQuery, 'i')},
                { ZPort: new RegExp(searchQuery, 'i')},
                { ZEnd: new RegExp(searchQuery, 'i')},
                { Comments: new RegExp(searchQuery, 'i')},
            ]
        });

        bnetResults = await BNetCircuit.find({
            $or: [
                { POP: new RegExp(searchQuery, 'i')},
                { SwitchType: new RegExp(searchQuery, 'i')},
                { CKT_ID: new RegExp(searchQuery, 'i')},
                { Mgmt_IP: new RegExp(searchQuery, 'i')},
            ]
        });

        res.json({ anetResults, bnetResults });
    } catch (error) {
        res.status(500).json({ error: 'Error occurred during search'});
    }
});

module.exports = router;