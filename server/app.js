const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

//parsing Json bodies
app.use(express.json());
app.use(cors());

// Sample in-memory storage for fubars
let fubars = [];

// GET /fubar - Retrieve all fubars
app.get('/fubar', (req, res) => {
    res.json(fubars);
});

//GET /fubar/:fu_id - Retrieve a specific fubar by fu_id
app.get('/fubar/:fu_id', (req, res) => {
    const fu_id = req.params.fu_id;
    const fubar = fubars.find(f => f.fu_id === fu_id);
    if (fubar) {
        res.json(fubar);
    } else {
        res.status(404).json({ error: 'Fubar not found' });
    }
});

// POST /fubar - Create a new fubar
app.post('/fubar', (req, res) => {
    const newFubar = req.body;
    //Add a unique fu_id for today's date
    newFubar.fu_id = Date.now().toString();
    fubars.push(newFubar);
    res.status(201).json(newFubar);
});

//PATCH /fubar - Update a fubar (partial update)
app.patch('/fubar', (req, res) => {
    const updateData = req.body;
    const fu_id = updateData.fu_id;
    const fubar = fubars.find(f => f.fu_id === fu_id);

    if (fubar) {
        // Update the fubar with new properties (not fu_id)
        Object.assign(fubar, updateData);
        res.json(fubar);
    } else {
        res.status(404).json({ error: 'Fubar not found' });
    }
});

//DELETE /fubar/:fu_id - Delete a specific fubar
app.delete('/fubar/:fu_id', (req, res) => {
    const fu_id = req.params.fu_id;
    const index = fubars.findIndex(f => f.fu_id === fu_id);

    if (index !== -1){
        fubars.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Fubar not found' });
    }
});

//Starting the server
app.listen(port, () => {
    console.log(`Fubar_Project API is running at http://localhost:${port}`);
});