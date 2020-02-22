const express = require('express');
const projectRouter = require('./data/projects/projectRouter');
const actionRouter = require('./data/actions/actionRouter');

const server = express();
const port = 4000

// server.use('./data/projects', projectRouter)
// server.use('./data/actions', actionRouter)

server.get('/', (req, res) =>{
    res.json({
        message:"We're all mad here...."
    })
})


server.listen(port, () =>{
    console.log(`Server listening on http://localhost:${port}`)
})

server.use(express.json());