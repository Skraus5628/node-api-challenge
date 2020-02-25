const express = require('express');
const projectRouter = require('./data/projects/projectRouter');
const actionRouter = require('./data/actions/actionRouter');
const server = express();
const port = 4000
const cors = require('cors')


server.use(express.json()); 
server.use('/projects', projectRouter);
server.use('/actions', actionRouter);


server.get('/', (req, res) =>{
    res.json({
        message:"We're all mad here...."
    })
})


  server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})


server.use(cors)
