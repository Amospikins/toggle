
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = 3000;


app.use(express.json());


// app.get('/', (req, res) => {
//     res.send('Hello from Express!');
// });

app.post('/toggle-identity', (req, res) => {
    const { id, action } = req.body;

    if (!id || !['lock', 'unlock'].includes(action)) {
        return res.status(400).json({ error: 'Invalid payload' });
    }

    const trustScore = Math.floor(Math.random() * 41) + 60; 
    const riskLevel = trustScore >= 80 ? 'low' : trustScore >= 60 ? 'medium' : 'high';

    res.json({
        status: action === 'lock' ? 'locked' : 'unlocked',
        trust_score: trustScore,
        risk_level: riskLevel,
        timestamp: new Date().toISOString()
    });
});




// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
