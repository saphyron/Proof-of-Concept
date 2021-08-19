/** Documentation written by John Høeg */
/** Init Express and Controllers. */
const express = require('express');
const app = express();
const controller = require('../Controllers/Controller');
/** Set up routing, Pug and Server. */
app.set('view engine', 'pug');
app.set('views', __dirname + '\\Views');
app.use(express.static('Server'));
/** Encoding of 'post' request data. */
app.use(express.json());
app.use(express.urlencoded());

session = require('express-session');
//app.use(session(sessionConfig));
function authenticateLoginStatus(req, res, next) {
    if(req.session.loggedIn) {
        return next();
    } else {
        res.redirect('/')
    }
}
function isAdmin(req,res,next) {
    if(req.session.admin == '1') {
        return next();
    } else {
        res.send('You do not have admin rights.')
    }
}


app.get('/', async (req, res) => {
    res.render('FrontPage', {});
})

app.get('/admin', isAdmin, async (req, res) => {
    const title = 'AdminPage';
    const products = "";
    res.render('AdminPage', { products: products, title: title });
})

app.get('/books', async (req, res) => {
    const title = 'Book List';
    const products = "";
    res.render('BookList', { products: products, title: title });
})

app.post('/auth', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const validLogin = await controller.login(username, password);

    if (validLogin) {
        let userType = await controller.getUserType(username);
        req.session.admin = userType.admin;
        req.session.loggedIn = true;
        req.session.username = username;
        res.redirect('/admin');
    }
    else {
        res.render('/', { error: 'Invalid username or password' });
    }
    res.end();
});

app.get('/logout', authenticateLoginStatus, (req, res) => {
    req.session.destroy();
    res.redirect('/');
})



/** Generating server on specified portnumber and confirmation console log. */
const portNumber = 8080;
app.listen(portNumber, () => console.log(`Server started on ${portNumber}`));