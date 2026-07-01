// server.js

// 1. Import the Express module
const express = require('express');
const app = express();
const PORT = 3000;

// 2. Configure the server
// Tell Express to use EJS as the view engine (for Server-Side Rendering)
app.set('view engine', 'ejs');
const path = require('path');
// This line tells Express: "Look for the views folder exactly where THIS server.js file is located"
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse data submitted from HTML forms
// This makes form data available inside 'req.body'
app.use(express.urlencoded({ extended: true }));

// 3. Create Server-Side Endpoints

// Endpoint 1: A GET request to load the home page (the form)
app.get('/', (req, res) => {
    // This looks inside the 'views' folder for 'index.ejs' and renders it
    res.render('index'); 
});

// Endpoint 2: A POST request to handle the form submission
app.post('/submit-form', (req, res) => {
    // Extract the data sent from the form input fields
    const userName = req.body.name;
    const userEmail = req.body.email;

    // Use Server-Side Rendering to generate the success page.
    // We pass the extracted data to the 'success.ejs' template.
    res.render('success', { 
        name: userName, 
        email: userEmail 
    });
});

// 4. Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});