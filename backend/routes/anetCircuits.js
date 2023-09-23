const express = require('express');
const router = express.Router();
const AnetCircuit = require('../models/ANetCircuit');

router.post('/create', (req, res) => {
    const circuitData = req.body;
    const newCircuit = new AnetCircuit(circuitData);

    newCircuit.save()
        .then(circuit => res.json(circuit))
        .catch(error => res.status(500).json({error: 'Failed to create ANet Circuit'}))
});

//Read All
router.get('/', (req, res) => {
    AnetCircuit.find()
        .then(circuits => res.json(circuits))
        .catch(error => res.status(500).json({ error: "Failed to fetch ANet Circuit"}))
});

//Read search result (one)
router.get('/:id', (req, res) => {
    AnetCircuit.findById(req.params.id)
        .then(circuit => {
            if (circuit) res.json(circuit);
            else res.status(404).json({ error: 'ANet Circuit Not Found'});
        })
        .catch(error => res.status(500).json({ error: 'Failed to fetch ANet Circuit Data'}))
});

router.put('/update/:id', (req, res) => {
   AnetCircuit.findByIdAndUpdate(req.params.id, req.body, { new: true})
       .then(updatedCircuit => res.json(updatedCircuit))
       .catch(error => res.status(500).json({ error: 'Failed to update ANet Circuit Data'}))
});

router.delete('/delete/:id', (req, res) => {
    AnetCircuit.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'ANet Circuit deleted'}))
        .catch(error => res.status(500).json({ error: 'Failed to delete ANet Circuit Data'}))
});

module.exports = router;