const express = require('express');
const actionsDB = require('../helpers/actionModel');
const projectDB = require('../helpers/projectModel');
const router = express.Router();

//                                                                  GET Requests

// GET all actions
router.get('/', (req, res) => {
    actionsDB.get()
        .then(action => {
            if (action) {
                res.status(200).json(action);
            } else {
                res.status(404).json({ message: 'action not found' });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error retrieving the action',
            });
        });
});


// GET action by ID
router.get('/:id', (req, res) => {
    actionsDB.get(req.params.id)
    .then(action => {

        if(action) {
            res.status(200).json(action);
        } else {
            res.status(404).json({
                message: 'Action not found'});
            }
        })

    .catch(err => {
        res.status(500).send('Error retreiving actions');
    })
});


//                                                          POST Requests

// Add new Action
router.post('/', validateProjectId ,(req, res) => {
    actionsDB.insert(req.body)
    .then(action =>{
        res.status(201).json(action);
    })
    .catch(err => {
        res.status(500).json({
            message: 'Error adding the action',
        });
    })
});

//                                                          PUT Requests

// Edit Action
router.put('/:id', (req, res) => {
    const changes = req.body;
    actionsDB.update(req.params.id, changes)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ 
                    message: 'The post could not be found' });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error updating the action',
            });
        });
});


//                                                          DELETE Requests

// Delete action
router.delete('/:id', (req, res) => {
    actionsDB.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ 
                    message: 'Action successfully removed' });
            } else {
                res.status(404).json({ 
                    message: 'No action to remove' });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error removing the Action',
            });
        });
});


//                                                              Middlewares

function validateProjectId(req, res, next) {
    const { id } = req.params;

    projectDB.get(id)
      .then(project => {
        if (project) {
          req.project = project;
          next();
        } else {
          res.status(400).json({ message: 'Error adding the action' });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: err });
      });
  }

module.exports = router;  