const express = require('express');
const topSongRouter = express.Router();

//requiring all the top songs controller logic for CRUD
const {
    getTopSongId,
    getTopSongs,
    getTopSongById,
    postTopSong,
    putTopSong,
    deleteTopSong
} = require('../controllers/topSong');

//use for setting up the id to perform CRUD
topSongRouter.param("id", getTopSongId);

//GET
topSongRouter.get("/", getTopSongs);

//GET by a single resource
topSongRouter.get("/:id", getTopSongById);

//POST
topSongRouter.post("/", postTopSong);

//UPDATE
topSongRouter.put("/:id", putTopSong);

//DELETE
topSongRouter.delete("/:id",deleteTopSong);

module.exports = topSongRouter;
