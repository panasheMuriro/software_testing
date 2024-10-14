// app.js
import express from 'express';
import rateLimit from 'express-rate-limit';

const app = express();
app.use(express.json());

// Limit to 10 requests per minute
const limiter = rateLimit({
    windowMs: 60 * 1000, 
    max: 10, 
    message: "Too many requests from this IP, please try again later."
});

app.use(limiter);

let users = [];

// --- CRUD Operations

// Create User
app.post('/api/users', (req, res) => {
    const user = { id: users.length + 1, ...req.body };
    users.push(user);
    res.status(201).json(user);
});

// Read Users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// Update User
app.put('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');

    Object.assign(user, req.body);
    res.json(user);
});

// Delete User
app.delete('/api/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).send('User not found');

    users.splice(userIndex, 1);
    res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// module.exports = app; // Export the app for testing
export default app;