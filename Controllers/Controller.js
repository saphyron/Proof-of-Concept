const app = express();
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'bibliotek',
    password: 1234,
    database: 'bibliotek'
});

async function getAllGenre() {
    let routeObj = {};
    return routeObj;
}

module.exports = {getAllGenre};