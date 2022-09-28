const express = require('express');
const connectDB = require('./config/db');
const app = express();

// connect database
connectDB();

app.get('/', (req, res) => res.send('Hello World!'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));