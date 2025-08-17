const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('../src/routes/userRoute');
const app = express();
const cors = require('cors');
app.use(cors());
const { PrismaClient } = require('../generated/prisma/client');



const prisma = new PrismaClient();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/users', userRoutes);

module.exports = app;


