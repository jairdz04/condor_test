require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./routing");
const cors = require("cors");
const port = Number(process.env.PORT || 3000);
const db = require("./database/connection");

app.use(cors({ origin: "*", optionSuccessStatus: 200 }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '900mb' }));


routes(app);

app.listen(port, () => {
	console.log('server listening on', port);
});

module.exports = app;
