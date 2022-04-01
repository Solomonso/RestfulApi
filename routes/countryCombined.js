const express = require('express');
const countryCombineRouter = express.Router();


const {getCountriesCombined} = require('../controllers/countryCombined');

//GET
countryCombineRouter.get("/", getCountriesCombined);

module.exports = countryCombineRouter;

