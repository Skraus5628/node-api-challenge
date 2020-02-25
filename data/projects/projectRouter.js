const express = require('express');
const projectDB = require('../helpers/projectModel');
const router = express.Router();



//                                                              GET Requests

// GET all projects
router.get('/', (req, res) => {
    projectDB.get()
      .then(project => {
        if(project) {
          res.status(200).json(project);
        } else {
          res.status(404).json({
               message: 'project not found' });
        }
      })
      .catch(err => {
        res.status(500).json({
             message: 'Error retrieving project information' });
      })
  });

//   GET project by ID
  router.get('/:id', validateProjectId, (req, res) => {
    projectDB.get(req.params.id)
      .then(project => {
        if(project) {
          res.status(200).json(project);
        } else {
          res.status(404).json({
               message: 'project not found' });
        }
      })
      .catch(err => {
        res.status(500).json({
             message: 'Error retrieving project information' });
      })
  });

//   GEt project actions by id
  router.get('/:id/actions', (req, res) => {
    projectDB.getProjectActions(req.params.id)
      .then(action => {
        if(action) {
            res.status(200).json(action);
        } else {
            res.status(500).json({
                 message: "Project does not have any actions." }) 
        }
      })
      .catch(err => {
        res.status(500).json({
             message: 'Error retrieving project information' });
      })
  });

//                                                              POST Requests

// Posts new project
  router.post('/', validateProject, (req, res) => {
    projectDB.insert(req.body)
     .then(project => {
            res.status(201).json(project); 
        })
        .catch(err =>{
            res.status(500).json({
                message: 'Error adding the post',
            });
        })
  });

//                                                          PUT Requests

// Edit project by ID
  router.put('/:id', validateProjectId, (req, res) => {
    const changes = req.body;
    projectDB.update(req.params.id, changes)
        .then(project => {
            if (project) {
                res.status(200).json(project);
            } else {
                res.status(404).json({
                     message: 'The project could not be found' });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error updating the project',
            });
        });
});

//                                                              DELETE Requests

// Delete Project
router.delete('/:id', validateProjectId, (req, res) => {
    // delete method for '/:id'
    projectDB.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({
                     message: 'Project successfully removed' });
            } else {
                res.status(404).json({
                     message: 'No project to remove' });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error removing the project',
            });
        });
});

//                                                                      Middlewares!

function validateProjectId(req, res, next) {
    const { id } = req.params;

    projectDB.get(id)
      .then(project => {
        if (project) {
          req.project = project;
          next();
        } else {
          res.status(400).json({ message: 'invalid project id' });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: err });
      });
  }


function validateProject(req, res, next) {
    const { name } = req.body;
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({
           message: 'missing project data' });
    } else if (!name) {
      res.status(400).json({
           message: 'missing required name field' });
    } else {
      next();
    }
  };



module.exports = router;

