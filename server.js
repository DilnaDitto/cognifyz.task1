// server.js
const express = require('express');
const path = require('path');
const app = express();

// CHANGED PORT TO 3001 TO BYPASS GHOST SERVERS
const PORT = 3001; 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

const temporaryUserStorage = [];

// --- TASK 1 ROUTES ---
app.get('/', (req, res) => { 
    res.render('index'); 
});
app.post('/submit-form', (req, res) => { 
    res.render('success', { name: req.body.name, email: req.body.email }); 
});

// --- TASK 2 ROUTES ---
app.get('/task2', (req, res) => {
    res.render('task2');
});
app.post('/submit-task2', (req, res) => {
    const { name, email, age, password } = req.body;
    if (!name || !email || !age || !password) return res.status(400).send("<h1>Validation Failed: All fields are required!</h1>");
    if (parseInt(age) < 18) return res.status(400).send("<h1>Validation Failed: Age must be 18 or above!</h1>");
    if (password.length < 6) return res.status(400).send("<h1>Validation Failed: Password is too short!</h1>");
    
    temporaryUserStorage.push({ name, email, age });
    res.redirect('/submissions');
});
app.get('/submissions', (req, res) => {
    res.render('submissions', { users: temporaryUserStorage });
});

// --- TASK 3 ROUTES ---
app.get('/task3', (req, res) => {
    res.render('task3');
});

// --- SERVER START ---
// THIS MUST ALWAYS BE AT THE VERY BOTTOM OF THE FILE
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});