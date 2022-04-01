//requesting all the middlewares that will be used
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('errorhandler');
const express = require('express');
const morgan = require("morgan");
const app = express();

//setting up the middlewares by using the app.use
app.use(bodyParser.json());
app.use(bodyParser.raw({type: 'application/xml'}));
app.use(cors());
//l use this for logging into the terminal incase if error is found
app.use(morgan('dev'))

//for catching error
app.use(errorHandler());

//requiring all the routes
const  apiRouter = require('./routes/api');

//starting route /api
app.use('/api', apiRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
})

module.exports = app;
