const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3001;
const SECRET_KEY = 'YOUR_SUPER_SECRET_KEY';

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/myAppDB')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Database connection error:", err));

// User Schema
const User = mongoose.model('User', new mongoose.Schema({ 
    username: { type: String, required: true, unique: true }, 
    password: { type: String, required: true } 
}));

// --- ROUTES ---

// 1. Root Route
app.get('/', (req, res) => {
    res.send('<h1>Server is running!</h1><p>Visit <a href="/task6">/task6</a> to test the auth system.</p>');
});

// 2. Auth Routes
app.post('/auth/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await User.create({ username: req.body.username, password: hashedPassword });
        res.json({ message: "Registration Successful!" });
    } catch (err) { res.status(400).json({ error: "Username already exists" }); }
});

app.post('/auth/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } else { res.status(401).send("Invalid credentials"); }
});

// 3. Task 6 Route
app.get('/task6', (req, res) => {
    res.render('task6');
});

// 4. Secure API
app.get('/api/secure-data', (req, res) => {
    res.json({ data: "This is sensitive data!" });
});

// --- SERVER START ---
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});