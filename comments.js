// Create web server
// Run the web server

// Import module
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

// Set view engine
app.set('view engine', 'ejs');

// Use middleware
app.use(bodyParser.urlencoded({extended: false}));

// Read file comment.json
let rawdata = fs.readFileSync('comment.json');
let comments = JSON.parse(rawdata);

// Create route
app.get('/', (req, res) => {
    res.render('index', {comments: comments});
});

app.post('/comment', (req, res) => {
    let name = req.body.name;
    let comment = req.body.comment;
    let new_comment = {
        name: name,
        comment: comment
    };
    comments.push(new_comment);

    // Write to file comment.json
    fs.writeFileSync('comment.json', JSON.stringify(comments));

    res.redirect('/');
});

// Run web server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});