const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const taskController = require('../controllers/taskController');

//* Save Task Data:
router.post('/api/SaveTasks/:id', authenticate, taskController.createTasks);

//? fetch all task
router.get('/api/ProjectTask/:id', taskController.fetchTasks);
//? Fetch all Developers:
router.get('/api/assignTask', authenticate, taskController.assignTasks);
//? Get Task's value to be set and then Update:
router.get('/api/getTasksData/:id', taskController.showSpecificTask);
//* Update the Record of the Task by put method:
router.put('/api/updateTask/:id', taskController.updateTask);
//! Delete the task by id:
router.delete('/api/deletetasks/:id', taskController.deleteTask);
// todo saved user_ids(developers) assigned to Given Tasks:
router.post('/api/developerAssign/:id', authenticate, taskController.devIDSave);
//* Delete the assigned user from task:
router.delete('/api/AssignDelete/:id', authenticate, taskController.devRemove);

//? For Developer:
router.get('/api/Developer', authenticate, taskController.developer);
//* For Developer Status Update:
router.put('/api/DevloperUpdateStatus/:id', taskController.updatedevTask);

module.exports = router;
