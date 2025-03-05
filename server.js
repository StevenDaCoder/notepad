const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/save', (req, res) => {
    const noteContent = req.body.content;
    const fileName = generateRandomCode() + '.txt';
    const filePath = path.join(__dirname, 'notes', fileName);

    fs.writeFile(filePath, noteContent, (err) => {
        if (err) {
            res.status(500).json({ error: 'Failed to save note' });
        } else {
            res.json({ fileName });
        }
    });
});

app.get('/notes/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, 'notes', fileName);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(404).send('Note not found');
        } else {
            res.send(data);
        }
    });
});

function generateRandomCode() {
    return Math.random().toString(36).substr(2, 9);
}

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});