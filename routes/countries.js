const express = require('express');
const countryRouter = express.Router();

//requiring all the countries controller logic for CRUD
const {
    getCountries,
    getCountryId,
    getCountryById,
    postCountry,
    putCountry,
    deleteCountry
} = require('../controllers/countries');

//use for setting up the id to perform CRUD
countryRouter.param("id", getCountryId);

//GET
countryRouter.get("/", getCountries);

//GET by a single resource
countryRouter.get("/:id", getCountryById);

//POST
countryRouter.post("/", postCountry);

//UPDATE
countryRouter.put("/:id", putCountry);

//DELETE
countryRouter.delete("/:id",deleteCountry);

module.exports = countryRouter;
