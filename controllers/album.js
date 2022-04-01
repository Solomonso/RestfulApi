//requesting for all th middlewares that will be used

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
const albumSchema = require("../schemas_for_validation/album_schema_json");
validator.addSchema(albumSchema);

const albumSchemaXsd = require("../schemas_for_validation/album_schema_xsd");
const xsdDocument = libxml.parseXmlString(albumSchemaXsd);

//for setting up the id that will be passed in the url
//this is used anytime there is an id found in the url
exports.getAlbumId = (req, res, next, id) => {
    const sql = 'SELECT * FROM album WHERE Album.id = $id';
    const values = {$id: id};
    db.get(sql, values, (error, album) => {
        if(error) {
            next(error);
        } else if (album) {
            req.album = album;
            next();
        } else {
            res.sendStatus(404);
        }
    });
};

//get all albums
exports.getAlbum =  (req, res, next) => {
     db.all("SELECT * FROM Album", (error , album) => {
         //incase of any error it goes to the errorHandler middleware
         if(error) {
            next(error)
        } else {
            //requesting in json format
            if(req.get('Content-Type') === 'application/json') {
                res.status(200).json({albums: {album: album}});
            }

            //requesting in xml format
            if(req.get('Content-Type') === 'application/xml') {
                res.send(xml({albums:{album: album}}));
            }
        }
    });

};

//get album by id controller
exports.getAlbumById = (req, res) => {
    if(req.get('Content-Type') === 'application/json') {
        res.status(200).json({albums:{album: req.album}});
    }
    if(req.get('Content-Type') === 'application/xml') {
        res.send(xml({albums:{album: req.album}}));
    }
};

//post album controller
exports.postAlbum = (req, res, next) => {
    //posting in json format
    if(req.get('Content-Type') === 'application/json') {
        //declaring variables, this use for inserting into the database
        const  id = req.body.albums[0].id;
        const artist = req.body.albums[0].artist;
        const albumName = req.body.albums[0].albumName;
        const label = req.body.albums[0].label;
        const year = req.body.albums[0].year;
        const country =  req.body.albums[0].country;
        const albumReview =  req.body.albums[0].reviews[0].albumReview;
        const reviewName = req.body.albums[0].reviews[0].reviewerName;

        //using try catch to validate
        try{
            validator.validate(req.body, albumSchema, { throwError: true })
        } catch (error) {
            res.status(401).end('Body of json is not valid with schema: ' + error.message);
            return;
        }

    const  sql = 'INSERT INTO Album(id, artist, albumName, label, year, country, albumReview, reviewerName)' +
      'VALUES($id, $artist, $albumName, $label, $year, $country, $albumReview, $reviewerName)';

    const values = {
        $id: id,
        $artist: artist,
        $albumName: albumName,
        $label: label,
        $year: year,
        $country: country,
        $albumReview: albumReview,
        $reviewerName: reviewName
    };
        //run the sql command and the values
        db.run(sql, values, (error) =>  {
            if(error) {
                next(error);
            } else {
                res.status(201).json({albums: req.body});
            }
        })
    }

    //posting in xml format
    if(req.get('Content-Type') === 'application/xml') {
        //saving all xml data
        const allXmlData = libxml.parseXmlString(req.body);

        //get each data from the xml to enable me post to the database
        const id = allXmlData.get('//id');
        const artist = allXmlData.get('//artist');
        const albumName = allXmlData.get('//albumName');
        const label = allXmlData.get('//label');
        const year = allXmlData.get('//year');
        const country = allXmlData.get('//country');
        const reviewName = allXmlData.get('//reviewerName');
        const albumReview = allXmlData.get('//albumReview');

        //checking if the xml data is valid before inserting
        if(allXmlData.validate(xsdDocument))  {
            const  sql = 'INSERT INTO Album(id, artist, albumName, label, year, country, albumReview, reviewerName)' +
                'VALUES($id, $artist, $albumName, $label, $year, $country, $albumReview, $reviewerName)';

            //add text() to the values to filter and get the text only from the xml and save the data in db
            const values = {
                $id: id.text(),
                $artist: artist.text(),
                $albumName: albumName.text(),
                $label: label.text(),
                $year: year.text(),
                $country: country.text(),
                $albumReview: albumReview.text(),
                $reviewerName: reviewName.text()
            };
            //run the sql command and the values
            db.run(sql, values, (error) =>  {
                if(error) {
                    next(error);
                } else {
                    res.status(201).send(req.body);
                }
            });
        }  else {
            res.status(401).send('One or more tags missing \n And check if each tags have the right data types');
        }
    }
};

//post album controller
exports.putAlbum = (req, res, next) => {
    //updating in json format
    if(req.get('Content-Type') === 'application/json') {
        let artist = req.body.albums[0].artist;
        let albumName = req.body.albums[0].albumName;
        let label = req.body.albums[0].label;
        let year = req.body.albums[0].year;
        let country = req.body.albums[0].country;
        let albumReview = req.body.albums[0].reviews[0].albumReview;
        let reviewName = req.body.albums[0].reviews[0].reviewerName;

        //using try catch to validate
        try {
            validator.validate(req.body, albumSchema, {throwError: true})
        } catch (error) {
            res.status(401).send('Unable to update and valid with schema: ' + error.message);
            return;
        }

        const sql = `UPDATE Album SET artist = $artist, albumName = $albumName, label = $label, year = $year, country = $country, 
            albumReview = $albumReview, reviewerName = $reviewerName  WHERE id = ${req.params.id}`
        const values = {
            $artist: artist,
            $albumName: albumName,
            $label: label,
            $year: year,
            $country: country,
            $albumReview: albumReview,
            $reviewerName: reviewName
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
        const artist = allXmlData.get('//artist');
        const albumName = allXmlData.get('//albumName');
        const label = allXmlData.get('//label');
        const year = allXmlData.get('//year');
        const country = allXmlData.get('//country');
        const reviewName = allXmlData.get('//reviewerName');
        const albumReview = allXmlData.get('//albumReview');

        //checking if the xml data is valid before updating
        if(allXmlData.validate(xsdDocument))  {
            const sql = `UPDATE Album SET artist = $artist, albumName = $albumName, label = $label, year = $year, country = $country, 
            albumReview = $albumReview, reviewerName = $reviewerName  WHERE id = ${req.params.id}`

            //add text() to the values to filter and updating data in db
            const values = {
                $artist: artist.text(),
                $albumName: albumName.text(),
                $label: label.text(),
                $year: year.text(),
                $country: country.text(),
                $albumReview: albumReview.text(),
                $reviewerName: reviewName.text()
            };
            db.run(sql, values, (error) => {
                if (error) {
                    next(error);
                } else {
                 //run the sql command and the values
                // db.get(`SELECT * FROM album WHERE id = ${req.params.id}`,
                    // (error,album) => {
                        res.status(201).send(req.body);
                    // });
                }
            });

        }  else {
            res.status(401).send('One or more tags missing \n And check if each tags have the right data types');
        }
    }
};

//delete handler controller
 exports.deleteAlbum =  (req, res, next) => {
     //deleting data in json format
     if(req.get('Content-Type') === 'application/json') {
         const sql = `DELETE FROM album WHERE id = $id`;
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
         const sql = `DELETE FROM album WHERE id = $id`;
         //get the id to be deleted from the database
         const values = {$id: req.params.album};

         db.run(sql, values, (error) => {
             if(error) {
                 next(error);
             } else {
                 res.status(200).send("Deleted successfully");
             }
         });
      }
};

