const express = require('express');
const app = express();
const path = require('path');
const cheerio = require('cheerio')
const fs = require('fs')
const server = () => {
app.get('/backend/page.json', express.json(), (req, res) => {
    const page = req.query.page;
    if (page == 0) {
        const $ = cheerio.load(fs.readFileSync(path.join(__dirname, 'public', 'home.html')))
        res.json({title: false, html: $('main').html().trim()})
    }
    if (page == 1) {
        const $ = cheerio.load(fs.readFileSync(path.join(__dirname, 'public', 'page1.html')))
        res.json({title: true, html: $('main').html().trim()})
    }
    else if (page == 2) {
        const $ = cheerio.load(fs.readFileSync(path.join(__dirname, 'public', 'page2.html')))
        res.json({title: false, html: $('main').html().trim()})
    }
})
app.use(async (req, res) => {
    res.set('Cache-Control', 'private')
    res.sendFile(req.path, {root: path.join(__dirname, 'public')});
});

app.listen(3000);
}
server()