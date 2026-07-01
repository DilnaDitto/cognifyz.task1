// server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

// --- TASK 2 FEATURE: Step 4: Temporary server-side storage array ---
const temporaryUserStorage = [];

// Existing Task 1 route (Keep intact)
app.get('/', (req, res) => { res.render('index'); });
app.post('/submit-form', (req, res) => { res.render('success', { name: req.body.name, email: req.body.email }); });


// ================== TASK 2 ROUTES ==================

// 1. Render Task 2 form page
app.get('/task2', (req, res) => {
    res.render('task2');
});

// 2. Handle Task 2 Submission with Server-Side Validation
app.post('/submit-task2', (req, res) => {
    const { name, email, age, password } = req.body;

    // Step 3: Implement server-side validation rules
    if (!name || !email || !age || !password) {
        return res.status(400).send("<h1>Validation Failed: All fields are required!</h1>");
    }
    if (parseInt(age) < 18) {
        return res.status(400).send("<h1>Validation Failed: Age must be 18 or above!</h1>");
    }
    if (password.length < 6) {
        return res.status(400).send("<h1>Validation Failed: Password is too short!</h1>");
    }

    // If validations pass, store the data in our array
    temporaryUserStorage.push({ name, email, age });

    // Redirect user to the dashboard to view storage array
    res.redirect('/submissions');
});

// 3. Render Dashboard list
app.get('/submissions', (req, res) => {
    // Pass the storage array down to the EJS template
    res.render('submissions', { users: temporaryUserStorage });
});


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});