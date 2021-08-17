/** Documentation written by John Høeg */
/** Init Express and Controllers. */
const express = require('express');
const app = express();
const Controller = require('../Controllers/Controller');
/** Set up routing, Pug and Server. */
app.set('view engine', 'pug');
app.set('views', __dirname + '\\Views');
app.use(express.static('Server'));
/** Encoding of 'post' request data. */
app.use(express.json());
app.use(express.urlencoded());

session = require('express-session');
//app.use(session(sessionConfig));

app.get('/', async (req, res) => {
    res.render('FrontPage', {});
})



/** Generating server on specified portnumber and confirmation console log. */
const portNumber = 8080;
app.listen(portNumber, () => console.log(`Server started on ${portNumber}`));