const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/formdb', {});

// Define a schema
const ticketSchema = new mongoose.Schema({
  name: String,
  email: String,
  issue: String,
  ticket_number: String,
  status: String,
});

// Create a model
const Ticket = mongoose.model('issues', ticketSchema);

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// API endpoint to fetch data
app.get('/api/tickets', async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
