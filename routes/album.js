const express = require('express');
const albumRouter = express.Router();
//requiring all the album controller logic for CRUD
const {
    getAlbum,
    getAlbumId,
    getAlbumById,
    postAlbum,
    putAlbum,
    deleteAlbum
} = require('../controllers/album');

//use for setting up the id to perform CRUD
//which will be the id passed in the url
albumRouter.param("id", getAlbumId);

//GET
albumRouter.get("/", getAlbum);

//GET by a single resource
albumRouter.get("/:id", getAlbumById)

//POST
albumRouter.post("/", postAlbum);

//UPDATE
albumRouter.put("/:id", putAlbum);

//DELETE
albumRouter.delete("/:id", deleteAlbum);

module.exports = albumRouter;

