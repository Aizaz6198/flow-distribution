const express = require('express');
const { Astrologer, User } = require('./models');
const FlowDistribution = require('./algorithm');

const app = express();
const port = 3000;
const flowDistribution = new FlowDistribution();

app.use(express.json());

// Add astrologer
app.post('/astrologers', (req, res) => {
    const { id, name, isTop } = req.body;
    const astrologer = new Astrologer(id, name, isTop);
    flowDistribution.addAstrologer(astrologer);
    res.status(201).send(astrologer);
});

// Distribute user
app.post('/users', (req, res) => {
    const { id, name } = req.body;
    const user = new User(id, name);
    const assignedAstrologer = flowDistribution.distributeUser(user);
    if (assignedAstrologer) {
        res.status(200).send({ user, assignedAstrologer });
    } else {
        res.status(500).send('No astrologers available');
    }
});

// Toggle top astrologer status
app.post('/astrologers/:id/toggle', (req, res) => {
    const { id } = req.params;
    flowDistribution.toggleTopAstrologer(parseInt(id));
    res.status(200).send('Toggled astrologer status');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
