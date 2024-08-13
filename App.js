const http = require('http');
const express = require('express');
const db = require('./db'); // Ensure this is correctly pointing to your db.js file
const personRoutes = require('./routes/personRoutes');
 
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3005

app.use(express.json());

// Register person routes
app.use('/person', personRoutes);

// Root route
app.use('/', (req, res) => {
    res.send('<h1>My name is Premdeep</h1>');
});


// Start server
const server = http.createServer(app);
server.listen(PORT, () => {
    console.log('Server is listening on port 3005');
});
