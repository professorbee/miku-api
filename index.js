const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const favicon = require('express-favicon');

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(favicon(__dirname + '/photos/icon.png'));

var files = fs.readdirSync('./photos');

app.use(express.static('photos'));

app.set('view engine', 'pug');

async function getRandomMiku() {
    var item = files[Math.floor(Math.random() * files.length)];
    return item
}

app.get('/', async (req, res) => {
    // res.sendFile(path.join(__dirname + '/index.html'));
    res.render('index', { title: 'Plush Miku!', message: 'Hello there!', image: '/' + await getRandomMiku() });
});

app.get('/api', (req, res) => {
    res.send("This is the Miku API!");
})

app.get('/api/random', async (req, res) => {
    res.json({ username: await getRandomMiku() });
});

app.listen(port, () => console.log(`Miku app listening on port ${port}!`));
