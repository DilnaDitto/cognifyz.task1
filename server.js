const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001; 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Essential for Task 4 and Task 5

// Temporary data store
let tasks = [{ id: 1, title: "Finish Task 5" }]; 
const temporaryUserStorage = [];

// --- TASK 1 ---
app.get('/', (req, res) => { res.render('index'); });
app.post('/submit-form', (req, res) => { res.render('success', { name: req.body.name, email: req.body.email }); });

// --- TASK 2 ---
app.get('/task2', (req, res) => { res.render('task2'); });
app.post('/submit-task2', (req, res) => {
    temporaryUserStorage.push(req.body);
    res.redirect('/submissions');
});
app.get('/submissions', (req, res) => { res.render('submissions', { users: temporaryUserStorage }); });

// --- TASK 3 ---
app.get('/task3', (req, res) => { res.render('task3'); });

// --- TASK 4 ---
app.get('/task4', (req, res) => { res.render('task4'); });
app.post('/api/register', (req, res) => {
    res.json({ message: "Registration Successful, " + req.body.username + "!" });
});

// --- TASK 5 ---
app.get('/task5', (req, res) => { res.render('task5'); });
app.get('/api/tasks', (req, res) => { res.json(tasks); });
app.post('/api/tasks', (req, res) => {
    tasks.push({ id: Date.now(), title: req.body.title });
    res.json({ success: true });
});
app.delete('/api/tasks/:id', (req, res) => {
    tasks = tasks.filter(t => t.id != req.params.id);
    res.json({ message: "Deleted" });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});