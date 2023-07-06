const http = require('http');
const express = require('express')
const app = express();

let mantras = [
    {
        mantra: "My mind is brilliant. My body is healthy. My spirit is tranquil.",
        showed: false,
        id: 0
    },
    {
        mantra: "I create my own path and walk it with joy.",
        showed: false,
        id: 1
    },
    {
        mantra: "My positive thoughts guide me to new heights.",
        showed: false,
        id: 2
    }
];

function getRandomId(max) {
    return Math.floor(Math.random() * max);
  }

const generateId = () => {
    const maxId = mantras.length > 0
      ? Math.max(...mantras.map(n => n.id))
      : 0
    return maxId + 1
}

app.use(express.json());
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
});

app.get('/addmantra', (req, res) => {
    res.sendFile(__dirname + "/add-mantra.html")
});

app.get('/api/mantra', (req, res) => {
    res.json(mantras)
});

app.get('/api/mantra/random', (req, res) => {
    const randomId = getRandomId(mantras.length);
    const mantra = mantras.find(mantra => mantra.id === randomId);
    res.json(mantra)
});

app.post('/api/mantra', (req, res) => {
    const body = req.body

    if(body.mantra === ''){
        return res.status(400).json({
            error: 'content missing'
        })
    }

    const mantra = {
        mantra: body.mantra,
        showed: false,
        id: generateId()
    }

    mantras = mantras.concat(mantra);
    res.json(mantra);
    console.log(mantras);
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});