const xml = require("object-to-xml");

//for validating json schema
const jsonValidator = require('jsonschema').Validator;
const validator = new jsonValidator();

//for validating xml schema
const libxml = require('libxmljs2');

//sqlite instance
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

//importing the albumSchemas and adding
const countrySchemaJson = require("../schemas_for_validation/countries_schema_json");
validator.addSchema(countrySchemaJson);

const countrySchemaXsd = require("../schemas_for_validation/countries_schema_xsd");
const xsdDocument = libxml.parseXmlString(countrySchemaXsd);


//for setting up the id that will be passed in the url
exports.getCountryId = (req, res, next, id) => {
    const sql = 'SELECT * FROM Countries WHERE Countries.id = $id';
    const values = {$id: id};
    db.get(sql, values, (error, country) => {
        if(error) {
            next(error);
        } else if (country) {
            req.country = country;
            next();
        } else {
            res.sendStatus(404);
        }
    });
};

//get all country
exports.getCountries =  (req, res, next) => {
    db.all("SELECT * FROM Countries", (error, country) =>{
        //incase of any error it goes to the errorHandler middleware
        if(error) {
            next(error)
        } else {
            //requesting in json format
            if(req.get('Content-Type') === 'application/json') {
                res.status(200).json({countries: {country: country}});
            }

            //requesting in xml format
            if(req.get('Content-Type') === 'application/xml') {
                res.send(xml({countries:{country: country}}));
            }
        }
    });

};

//get country by id controller, using the param
exports.getCountryById = (req, res) => {
    if(req.get('Content-Type') === 'application/json') {
        res.status(200).json({countries:{country: req.country}});
    }
    if(req.get('Content-Type') === 'application/xml') {
        res.send(xml({countries:{country: req.country}}));
    }
};

//post country controller
exports.postCountry = (req, res, next) => {

    //posting in json format
    if(req.get('Content-Type') === 'application/json') {
        const country = req.body.country;
        const region = req.body.region;
        const population = req.body.population;

        //validate the json schema
        try{
            validator.validate(req.body, countrySchemaJson, { throwError: true })
        } catch (error) {
            res.status(401).end('Body of json is not valid with schema: ' + error.message);
            return;
        }

        const sql = 'INSERT INTO Countries(country, region, population)' +
            'VALUES($country, $region, $population)';

        const values = {
            $country: country,
            $region: region,
            $population: population
        };

        //run the sql insert command with the values
        db.run(sql, values, (error) =>  {
            if(error) {
                next(error);
            } else {
                res.status(201).json({countries: req.body});
            }
        })
    }

    //posting in xml format
    if(req.get('Content-Type') === 'application/xml') {
        //saving all xml data from the request body
        const allXmlData = libxml.parseXmlString(req.body);

        const country = allXmlData.get('//country');
        const region = allXmlData.get('//region');
        const population = allXmlData.get('//population');

        //checking if the xml data is valid before inserting
        if(allXmlData.validate(xsdDocument)) {
            const sql = 'INSERT INTO Countries(country, region, population)' +
                'VALUES($country, $region, $population)';

            //adding text method to get the only text inside the xml tag
            const values = {
                $country: country.text(),
                $region: region.text(),
                $population: population.text(),
            };

            //run the sql update command with the values
            db.run(sql, values, (error) => {
                if(error) {
                    next(error);
                } else {
                    res.status(201).send(req.body);
                }
            });
        } else {
            res.status(401).send('One or more tags missing \n And check if each tags have the right data types');
        }
    }
};

exports.putCountry = (req, res, next) => {
    //updating in json format
    if(req.get('Content-Type') === 'application/json') {

        let country = req.body.country;
        let region = req.body.region;
        let population = req.body.population;

        try {
            validator.validate(req.body, countrySchemaJson, {throwError: true});
        } catch (error) {
            res.status(401).send('Unable to update and not valid with the schema: ' + error.message);
            return;
        }

        const sql = `UPDATE Countries SET country = $country,  region = $region, population = $population 
    WHERE id = ${req.params.id}`;

        const values = {
            $country: country,
            $region: region,
            $population: population
        };

        db.run(sql, values, (error) => {
            if (error) {
                next(error);
            } else {
                res.status(201).json(req.body);
            }
        });
    }

    //updating in xml format
    if(req.get('Content-Type') === 'application/xml') {

        //saving all xml data
        const allXmlData = libxml.parseXmlString(req.body);

        //get each data from the xml to enable me post to the database
        const country = allXmlData.get('//country');
        const region = allXmlData.get('//region');
        const population = allXmlData.get('//population');

        if(allXmlData.validate(xsdDocument)) {
            const sql = `UPDATE Countries SET country = $country,  region = $region, population = $population 
                WHERE id = ${req.params.id}`;

            const values = {
                $country: country.text(),
                $region: region.text(),
                $population: population.text()
            };

            db.run(sql, values, (error) => {
                if(error) {
                    next(error);
                } else {
                    res.status(201).send(req.body);
                }
            });
        } else {
            res.status(401).send('One or more tags missing \n And check if each tags have the right data types');
        }
    }
};

//delete handler controller
exports.deleteCountry = (req, res, next) => {
    //deleting data in json format
    if(req.get('Content-Type') === 'application/json') {
        const sql = `DELETE FROM countries WHERE id = $id`;
        const values = {$id: req.params.id};

        db.run(sql, values, (error) => {
            if(error) {
                next(error);
            } else {
                res.status(200).send("Deleted successfully");
            }
        });
    }

    //deleting data in xml format
    if(req.get('Content-Type') === 'application/xml') {
        const sql = `DELETE FROM countries WHERE id = $id`;
        const values = {$id: req.params.id};

        db.run(sql, values, (error) => {
            if(error) {
                next(error);
            } else {
                res.status(200).send("Deleted successfully");
            }
        });
    }
}
