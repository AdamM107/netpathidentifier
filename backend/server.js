require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const app = express();

app.use(cors()); // Enabling CORS for all routes
app.use(express.json()); //Enabling parsing of JSON request bodies

const PORT = 5000;

mongoose.connect(process.env.MONGO_URI, {...}); // Accessing MongoDB credentials in "conn.env"

const anetCircuitsRouter = require('./routes/anetCircuits');
const bnetCircuitsRouter = require('./routes/bnetCircuits');

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log('Error connecting to MongoDB', err);
});

app.get('/', (req, res) => {
    res.send('Server responding');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.use('/api/anet', anetCircuitsRouter);
app.use('/api/bnet', bnetCircuitsRouter);
