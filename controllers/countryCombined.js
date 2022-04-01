/**
 *
 * l only use this to visualise the country not everything
 */

const xml = require("object-to-xml");

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

//get all country
exports.getCountriesCombined =  (req, res, next) => {
    db.all("SELECT * FROM Album Countries  LEFT JOIN Album ON Countries.id = Album.id ORDER BY year DESC", (error, country) =>{
        //incase of any error it goes to the errorHandler middleware
        if(error) {
            next(error)
        } else {
            //requesting in json format
            if(req.get('Content-Type') === 'application/json') {
                res.status(200).json({countriesCombined:{countries: {country: country}}});
            }

            //requesting in xml format
            if(req.get('Content-Type') === 'application/xml') {
                res.send(xml({countriesCombined:{countries:{country: country}}}));
            }
        }
    });

};
