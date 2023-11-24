const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

const projectController = require('../controllers/projectController');

//* Save Manager Projects :
router.post(
  '/api/SaveProjects',
  authenticate,
  projectController.createProjects
);

// *Get all Projects that the particular user(Mnaager) has
router.get(
  '/api/userProjects',
  authenticate,
  projectController.getProjectbyUserId
);

//? Get Project's value to be set and then Update:
router.get('/api/getProject/:id', projectController.SpecificProjectSet);

//* Update the Record of the Project by put method:
router.put('/api/updateProject/:id', projectController.updateProjects);

// //* Delete the project record by id
router.delete('/api/deleteProjects/:id', projectController.DeleteProjects);

module.exports = router;
