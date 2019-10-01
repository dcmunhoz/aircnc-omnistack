const express  = require('express');
const mongoose = require('mongoose');
const routes   = require('./routes');

const app = express();

// Mongo connect
mongoose.connect("mongodb+srv://omni:omni@cluster0-jiamz.mongodb.net/omnistack9?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
    console.log("AIRCNC API OPEN PORT 3333");
});