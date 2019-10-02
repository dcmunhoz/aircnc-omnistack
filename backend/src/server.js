const express  = require('express');
const mongoose = require('mongoose');
const routes   = require('./routes');
const cors     = require('cors');
const path     = require('path');

const app = express();

// Mongo connect
mongoose.connect("mongodb+srv://omni:omni@cluster0-jiamz.mongodb.net/omnistack9?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

app.listen(3333, () => {
    console.log("AIRCNC API OPEN PORT 3333");
});