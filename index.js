const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var files = fs.readdirSync('./photos');

app.use(express.static('photos'));

app.set('view engine', 'pug');

function getRandomMiku() {
    var item = files[Math.floor(Math.random() * files.length)];
    return item
}

app.get('/', function(req, res) {
    // res.sendFile(path.join(__dirname + '/index.html'));
    res.render('index', { title: 'Hey', message: 'Hello there!', image: '/' + getRandomMiku() });
});

app.get('/api', (req, res) => {
    res.send("This is the Miku API!");
})

app.get('/api/random', (req, res) => {
    res.json({ username: getRandomMiku() });
});

app.listen(port, () => console.log(`Miku app listening on port ${port}!`));