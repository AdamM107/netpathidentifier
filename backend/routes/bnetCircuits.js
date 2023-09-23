const express = require('express');
const router = express.Router();
const BnetCircuit = require('../models/BNetCircuit');

router.post('/create', (req, res) => {
    const circuitData = req.body;
    const newCircuit = new BnetCircuit(circuitData);

    newCircuit.save()
        .then(circuit => res.json(circuit))
        .catch(error => res.status(500).json({error: 'Failed to create BNet Circuit'}))
});

//Read All
router.get('/', (req, res) => {
    BnetCircuit.find()
        .then(circuits => res.json(circuits))
        .catch(error => res.status(500).json({ error: "Failed to fetch BNet Circuit"}))
});

//Read search result (one)
router.get('/:id', (req, res) => {
    BnetCircuit.findById(req.params.id)
        .then(circuit => {
            if (circuit) res.json(circuit);
            else res.status(404).json({ error: 'BNet Circuit Not Found'});
        })
        .catch(error => res.status(500).json({ error: 'Failed to fetch BNet Circuit Data'}))
});

router.put('/update/:id', (req, res) => {
    BnetCircuit.findByIdAndUpdate(req.params.id, req.body, { new: true})
        .then(updatedCircuit => res.json(updatedCircuit))
        .catch(error => res.status(500).json({ error: 'Failed to update BNet Circuit Data'}))
});

router.delete('/delete/:id', (req, res) => {
    BnetCircuit.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'BNet Circuit deleted'}))
        .catch(error => res.status(500).json({ error: 'Failed to delete BNet Circuit Data'}))
});

module.exports = router;