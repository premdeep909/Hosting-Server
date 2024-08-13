const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

// Create a new person
router.post('/', async (req, res) => {
    try {
        const data = req.body; // Parsing request body data
        console.log('Request Data:', data); // Log request data to debug

        const newPerson = new Person(data); // Creating a new person instance with the data
        
        const response = await newPerson.save(); // Saving data
        console.log('Data saved successfully');
        res.status(201).json({ response }); // Use 201 for successful creation
    } catch (err) {
        console.error('Error saving data:', err); // Enhanced error logging
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(error => error.message);
            res.status(400).json({ error: 'Validation error', details: errors });
        } else if (err.code === 11000) {
            res.status(400).json({ error: 'Email already exists' });
        } else {
            res.status(500).json({ error: 'Internal server error', details: err.message });
        }
    }
});

// Get all people
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        res.status(200).json({ data });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
});

// Get people by work type
router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (['chef', 'waiter', 'manager'].includes(workType)) {
            const response = await Person.find({ work: workType });
            res.status(200).json(response);
        } else {
            res.status(400).json({ error: 'Invalid work type' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
});

// Update person by ID
router.put('/:id', async (req, res) => {
    try {
        const personID = req.params.id; // Extract id from URL parameter
        const updatePersonData = req.body; // Updated data for the person
        const response = await Person.findByIdAndUpdate(personID, updatePersonData, {
            new: true, // Return the updated document
            runValidators: true // Run mongoose validation
        });
        if (!response) {
            return res.status(404).json({ error: "Person not found" });
        }
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
});

// Delete person by ID
router.delete('/:id', async (req, res) => {
    try {
        const personID = req.params.id;
        const response = await Person.findByIdAndDelete(personID);
        if (!response) {
            return res.status(404).json({ error: "Person not found" });
        }
        res.status(200).json({ message: "Person data deleted" });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
});

module.exports = router;
