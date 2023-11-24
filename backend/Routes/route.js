// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// require('../db/conn');
// const User = require('../models/user');
// const Project = require('../models/project');
// const Task = require('../models/task');
// const authenticate = require('../middleware/authenticate');


// //* Save Task Data:
// router.post('/SaveTasks/:id', authenticate, async (req, res) => {
//   try {
//     const { name, detail, deadline, status } = req.body;
//     const refProjid = req.params.id; // Reference Project Id:-

//     console.log(name, detail, deadline, status, refProjid);
//     if (!name || !detail || !deadline || !status) {
//       return res.status(422).json({ error: 'fill all the fields of the form' });
//     }
//     const addtask = new Task({
//       name,
//       detail,
//       deadline,
//       status,
//       project_id: [refProjid],
//     });
//     const data = await addtask.save();
//     console.log(data);
//     // Save task id to project collection
//     const project = await Project.findById(refProjid);

//     if (!project) {
//       return res.status(404).json({ error: 'Project not found' });
//     }
//     //* Put the task id in the given project id:
//     project.task_id.push([data._id]);
//     await project.save();
//     if (data) {
//       return res.status(200).json({ message: 'Task Data saved successfully' });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });
// //? fetch all task
// router.get('/ProjectTask/:id', authenticate, async (req, res) => {
//   const project_id = req.params.id;
//   try {
//     //* Project Display on manager page:
//     const tasks = await Task.find({ project_id });
//     if (tasks) {
//       res.json(tasks);
//     } else {
//       res.status(400).send(null);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });
// //? Fetch all Developers:
// router.get('/assignTask', authenticate, async (req, res) => {
//   try {
//     //* Project Display on manager page:
//     const users = await User.find({ usertype: 'Developer' });
//     if (users) {
//       res.json(users);
//     } else {
//       res.status(400).send(null);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });
// //? Get Task's value to be set and then Update:
// router.get('/getTasksData/:id', async (req, res) => {
//   const _id = req.params.id;
//   try {
//     const getTasks = await Task.findById({ _id });
//     console.log(getTasks);
//     res.status(200).json(getTasks);
//   } catch (err) {
//     console.log(err);
//   }
// });
// //* Update the Record of the Task by put method:
// router.put('/updateTask/:id', async (req, res) => {
//   const _id = req.params.id;
//   const updateTask = await Task.findByIdAndUpdate(_id, req.body, {
//     new: true,
//   });
//   if (updateTask) {
//     res.status(200).json({ success: 'Updated User SuccessFully' });
//   } else {
//     res.status(400).send();
//   }
// });
// //! Delete the task by id:
// router.delete('/deletetasks/:id', async (req, res) => {
//   const _id = req.params.id;
//   try {
//     const deleteTask = await Task.findById(_id);
//     if (!deleteTask) {
//       res.status(400).send('Error');
//     } else {
//       const ProjectID = deleteTask.project_id;
//       if (ProjectID) {
//         const FindProject = await Project.findById({ _id: ProjectID });
//         // Check if the Given task is assigned to project
//         const index = FindProject.task_id.indexOf(_id);
//         if (index === -1) {
//           return res
//             .status(422)
//             .json({ error: 'Task not assigned to the Project' });
//         } else {
//           //delete the given task also:-
//           await deleteTask.deleteOne();
//           //Remove one task from the Project
//           FindProject.task_id.splice(index, 1);
//           await FindProject.save();
//           return res
//             .status(200)
//             .json({ message: 'task removed from the Project successfully' });
//         }
//       }
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Internal Server Error');
//   }
// });
// // todo saved user_ids assigned to Given Tasks:
// router.post('/developerAssign/:id', authenticate, async (req, res) => {
//   try {
//     const { devId } = req.body;
//     const taskId = req.params.id; // Reference Task Id:-

//     console.log(devId);
//     if (!devId) {
//       return res.status(422).json({ error: 'fill all the fields of the form' });
//     }

//     // Save task id to project collection
//     const task = await Task.findById(taskId);

//     if (!task) {
//       return res.status(422).json({ error: 'Task not found' });
//     } else if (task.user_id.includes(devId)) {
//       return res
//         .status(422)
//         .json({ error: 'User already assigned to the task' });
//     } else {
//       //* Put the task id in the given task id:
//       task.user_id.push([devId]);
//       await task.save();
//       return res.status(200).json({ task });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });
// //* Delete the assigned user from task:
// router.delete('/AssignDelete/:id', authenticate, async (req, res) => {
//   try {
//     const { devID } = req.body;
//     const taskId = req.params.id;

//     const task = await Task.findById(taskId);

//     if (!task) {
//       return res.status(422).json({ error: 'Task not found' });
//     }

//     // Check if the developer is assigned to the task
//     const index = task.user_id.indexOf(devID);
//     if (index === -1) {
//       return res
//         .status(422)
//         .json({ error: 'Developer not assigned to the task' });
//     }
//     // else Remove one developer from the task
//     task.user_id.splice(index, 1);
//     await task.save();

//     return res
//       .status(200)
//       .json({ message: 'Developer removed from the task successfully' });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
// // * get Project to track progress:
// router.get('/showClickProject/:id', authenticate, async (req, res) => {
//   const _id = req.params.id;
//   try {
//     //* Project Display on manager page:
//     const projects = await Project.find({ _id });
//     console.log(projects);
//     res.json(projects);
//   } catch (err) {
//     console.log(err);
//   }
// });
// // !! get Tasks of Given Project to track progress:
// router.get('/showClickTask/:project_id', async (req, res) => {
//   const project_id = req.params.project_id;
//   try {
//     const getTasks = await Task.find({ project_id: project_id });
//     console.log('the Click task are ' + getTasks);
//     res.status(200).json(getTasks);
//   } catch (err) {
//     console.log(err);
//   }
// });
// //? For Developer:
// router.get('/Developer', authenticate, async (req, res) => {
//   try {
//     const _id = req.userId;
//     console.log('id is:' + _id);
//     const task = await Task.find({ user_id: _id });
//     console.log('tasks are' + task);
//     if (task) {
//       res.json(task);
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
// //* For Developer Status Update:
// router.put('/DevloperUpdateStatus/:id', async (req, res) => {
//   const _id = req.params.id;
//   const updateTask = await Task.findByIdAndUpdate(_id, req.body, {
//     new: true,
//   });
//   if (updateTask) {
//     res.status(200).json({ success: 'Updated User SuccessFully' });
//   } else {
//     res.status(400).send();
//   }
// });
// module.exports = router;
