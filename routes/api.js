
const express = require('express');
const apiRouter = express.Router();

const albumRouter = require('./album');
const countryRouter = require('./countries');
const  topSong = require('./topSong');
const countryCombined = require('./countryCombined');

//specify all endpoint
apiRouter.use('/album', albumRouter);
apiRouter.use('/country', countryRouter);
apiRouter.use('/topsong', topSong)
apiRouter.use('/countryCombined', countryCombined);

module.exports = apiRouter;
