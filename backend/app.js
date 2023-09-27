const express = require("express");
const cors = require('cors');
const errorMiddlwares = require("./middleware/errors")
const bodyParser = require("body-parser");

require('./config/database');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  };
  
app.use(cors(corsOptions));
  
// app.use(upload.single("image"));

const products = require('./routes/product');

app.use('/api/v1', products);

//mmiddleware to handle errors
app.use(errorMiddlwares);

module.exports = app;