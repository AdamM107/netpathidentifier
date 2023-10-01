require('dotenv').config({ path: __dirname + '/../.env' });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const app = express();


const whitelist = ['http://localhost:3000', 'https://net-path-identifier-1ed05fb97878.herokuapp.com/' ];

const corsOptions = {
    origin: function (origin, callback) {
        console.log('Incoming origin:', origin);
        if (!origin || whitelist.indexOf(origin) !== -1 || origin === 'undefined') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json()); //Enabling parsing of JSON request bodies
app.use(express.static(path.join(__dirname, 'build')));

const PORT = process.env.PORT;

app.listen(PORT, function() {
    console.log(`Server is running on ${PORT}`);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + 'build/index.html'));
});
console.log('before');
console.log(process.env.MONGODB_URI);
console.log('After');
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log('Error connecting to MongoDB', err);
}); // Accessing MongoDB credentials in ".env"

const anetCircuitsRouter = require('./routes/anetCircuits');
const bnetCircuitsRouter = require('./routes/bnetCircuits');
const unifiedSearchRoute = require('./routes/UnifiedSearch');

app.get('/', (req, res) => {
    res.send('Server responding');
});

app.use(unifiedSearchRoute);
app.use('/api/anetCircuits', anetCircuitsRouter);
app.use('/api/bnetCircuits', bnetCircuitsRouter);