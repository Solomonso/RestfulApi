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
const topSongSchemaJson = require("../schemas_for_validation/topSongs_schema_json");
validator.addSchema(topSongSchemaJson);

const topSongSchemaXsd = require("../schemas_for_validation/topsSongs_schema_xsd");
const xsdDocument = libxml.parseXmlString(topSongSchemaXsd);

//for setting up the id that will be passed in the url
exports.getTopSongId = (req, res, next, id) => {
    const sql = 'SELECT * FROM Topsong WHERE TopSong.id = $id';
    const values = {$id: id};
    db.get(sql, values, (error, topSong) => {
        if(error) {
            next(error);
        } else if (topSong) {
            req.topSong = topSong;
            next();
        } else {
            res.sendStatus(404);
        }
    });
};

//get all top songs
exports.getTopSongs = (req, res, next) => {
    db.all("SELECT * FROM TopSong", (error, topSong) => {
        //incase of any error it goes to the errorHandler middleware
        if(error) {
            next(error)
        } else {
            //requesting in json format
            if(req.get('Content-Type') === 'application/json') {
                res.status(200).json({songs: {song: topSong}});
            }

            //requesting in xml format
            if(req.get('Content-Type') === 'application/xml') {
                res.send(xml({songs:{song: topSong}}));
            }
        }
    });
};

//get top songs by id
exports.getTopSongById = (req, res) => {
    if(req.get('Content-Type') === 'application/json') {
        res.status(200).json({songs:{song: req.topSong}});
    }
    if(req.get('Content-Type') === 'application/xml') {
        res.send(xml({songs:{song: req.topSong}}));
    }
};

//post top songs controller
exports.postTopSong = (req, res, next) => {

    //posting in json format
    if(req.get('Content-Type') === 'application/json') {
        //data to post
        const id = req.body.id;
        const title = req.body.title;
        const artist = req.body.artist;
        const topGenre = req.body.genre;
        const year = req.body.year;

        //validate the json schema
        try{
            validator.validate(req.body, topSongSchemaJson, { throwError: true })
        } catch (error) {
            res.status(401).end('Body of json is not valid with schema: ' + error.message);
            return;
        }

        const sql = 'INSERT INTO TopSong(id, title, artist, topgenre, year)' +
            'VALUES($id, $title, $artist, $topGenre, $year)';

        const values = {
            $id: id,
            $title: title,
            $artist: artist,
            $topGenre: topGenre,
            $year: year
        };

        //run the sql insert command with the values
        db.run(sql, values, (error) =>  {
            if(error) {
                next(error);
            } else {
                res.status(201).json({countries: req.body});
            }
        });
    }

    //posting in xml format
    if(req.get('Content-Type') === 'application/xml') {
        //saving all xml data
        const allXmlData = libxml.parseXmlString(req.body);

        const id = allXmlData.get('//id');
        const title = allXmlData.get('//title');
        const artist = allXmlData.get('//artist');
        const topGenre = allXmlData.get('//genre');
        const year = allXmlData.get('//year');
        const bpm = allXmlData.get('//bpm');
        const energy = allXmlData.get('//energy');
        const dance = allXmlData.get('//danceability');
        const liveliness = allXmlData.get('//liveliness');

        //also checking if xml data is valid using the schema
        if(allXmlData.validate(xsdDocument)) {
            const sql = 'INSERT INTO TopSong(id, title, artist, topgenre, year, bpm, energy, dnce, live)' +
            'VALUES($id, $title, $artist, $topGenre, $year, $bpm, $energy, $dance, $liveliness)';

            const values = {
                $id: id.text(),
                $title: title.text(),
                $artist: artist.text(),
                $topGenre: topGenre.text(),
                $year: year.text(),
                $bpm: bpm.text(),
                $energy: energy.text(),
                $dance: dance.text(),
                $liveliness: liveliness.text()
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

//updating  top songs controller
exports.putTopSong = (req, res,next) => {
    //updating in json format
    if(req.get('Content-Type') === 'application/json') {

        const title = req.body.title;
        const artist = req.body.artist;
        const topGenre = req.body.genre;
        const year = req.body.year;

        //validate the json body with the schema
        try{
            validator.validate(req.body, topSongSchemaJson, { throwError: true })
        } catch (error) {
            res.status(401).end('Body of json is not valid with schema: ' + error.message);
            return;
        }

        const sql = `UPDATE  TopSong SET title = $title, artist = $artist, topgenre = $topGenre, year = $year
             WHERE id = ${req.params.id} `;

        const values = {
            $title: title,
            $artist: artist,
            $topGenre: topGenre,
            $year: year
        };

        //running the update command with the values
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

        const id = allXmlData.get('//id');
        const title = allXmlData.get('//title');
        const artist = allXmlData.get('//artist');
        const topGenre = allXmlData.get('//genre');
        const year = allXmlData.get('//year');
        const bpm = allXmlData.get('//bpm');
        const energy = allXmlData.get('//energy');
        const dance = allXmlData.get('//danceability');
        const liveliness = allXmlData.get('//liveliness');

        //validating the xml with the schema
        if(allXmlData.validate(xsdDocument)) {
            const sql = `UPDATE  TopSong SET title = $title, artist = $artist, topgenre = $topGenre, year = $year,
            bpm = $bpm, energy = $energy, dnce = $dance, live = $liveliness
             WHERE id = ${req.params.id} `;

            const values = {
              //  $id: id.text(),
                $title: title.text(),
                $artist: artist.text(),
                $topGenre: topGenre.text(),
                $year: year.text(),
                $bpm: bpm.text(),
                $energy: energy.text(),
                $dance: dance.text(),
                $liveliness: liveliness.text()
            };

            //running the update command with the values
            db.run(sql, values, (error) => {
                if (error) {
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

//delete top song controller
exports.deleteTopSong = (req, res, next) => {
    //deleting data in json format
    if(req.get('Content-Type') === 'application/json') {
        const sql = `DELETE FROM TopSong WHERE id = $id`;
        const values = {$id: req.params.id};

        db.run(sql,  values, (error) => {
            if(error) {
                next(error);
            } else {
                res.status(200).send("Deleted successfully");
            }
        });
    }

    //deleting data in xml format
    if(req.get('Content-Type') === 'application/xml') {
        const sql = `DELETE FROM TopSong WHERE id = $id`;
        const values = {$id: req.params.id};

        //run the delete command with id to be delete
        db.run(sql, values, (error) => {
            if(error) {
                next(error);
            } else {
                res.status(200).send("Deleted successfully");
            }
        });
    }
};
