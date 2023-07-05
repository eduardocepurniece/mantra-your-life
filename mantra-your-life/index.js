const http = require('http');
const express = require('express')
const app = express();

let mantras = [
    {
        mantra: "My mind is brilliant. My body is healthy. My spirit is tranquil.",
        showed: false
    },
    {
        mantra: "I create my own path and walk it with joy.",
        showed: false
    },
    {
        mantra: "My positive thoughts guide me to new heights.",
        showed: false
    }
];

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
});

app.get('/api/mantra', (req, res) => {
    res.json(mantras)
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});