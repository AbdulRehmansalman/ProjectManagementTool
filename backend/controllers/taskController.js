const Project = require('../models/project');
const Task = require('../models/task');
const User = require('../models/user');

//* Create Tasks:(Manager)
const createTasks = async (req, res) => {
  try {
    const { name, detail, deadline, status } = req.body;
    const refProjid = req.params.id; // Reference Project Id:-

    console.log(name, detail, deadline, status, refProjid);
    if (!name || !detail || !deadline || !status) {
      return res.status(422).json({ error: 'fill all the fields of the form' });
    }
    const addtask = new Task({
      name,
      detail,
      deadline,
      status,
      project_id: [refProjid],
    });
    const data = await addtask.save();
    console.log(data);
    // Save task id to project collection
    const project = await Project.findById(refProjid);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    //* Put the task id in the given project id:
    project.task_id.push([data._id]);
    await project.save();
    if (data) {
      return res.status(200).json({ message: 'Task Data saved successfully' });
    }
  } catch (err) {
    console.log(err);
  }
};
//* Fetch all task of particular project id :
const fetchTasks = async (req, res) => {
  const project_id = req.params.id;
  try {
    //* Project Display on manager page:
    const tasks = await Task.find({ project_id });
    if (tasks) {
      res.json(tasks);
    } else {
      res.status(400).send(null);
    }
  } catch (err) {
    console.log(err);
  }
};
//* Fetch all Develoepers to asssign task:
const assignTasks = async (req, res) => {
  try {
    //* Project Display on manager page:
    const users = await User.find({ usertype: 'Developer' });
    if (users) {
      res.json(users);
    } else {
      res.status(400).send(null);
    }
  } catch (err) {
    console.log(err);
  }
};
//* First Fetch particular task values,and to display for Update:
const showSpecificTask = async (req, res) => {
  const _id = req.params.id;
  try {
    const getTasks = await Task.findById({ _id });
    console.log(getTasks);
    res.status(200).json(getTasks);
  } catch (err) {
    console.log(err);
  }
};
//* Update the Record of Particular Task:
const updateTask = async (req, res) => {
  const _id = req.params.id;
  const updateTask = await Task.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  if (updateTask) {
    res.status(200).json({ success: 'Updated User SuccessFully' });
  } else {
    res.status(400).send();
  }
};
//* Delete the Record of Particular Task:
const deleteTask = async (req, res) => {
  const _id = req.params.id;
  try {
    const deleteTask = await Task.findById(_id);
    if (!deleteTask) {
      res.status(400).send('Error');
    } else {
      const ProjectID = deleteTask.project_id;
      if (ProjectID) {
        const FindProject = await Project.findById({ _id: ProjectID });
        // Check if the Given task is assigned to project
        const index = FindProject.task_id.indexOf(_id);
        if (index === -1) {
          return res
            .status(422)
            .json({ error: 'Task not assigned to the Project' });
        } else {
          //delete the given task also:-
          await deleteTask.deleteOne();
          //Remove one task from the Project
          FindProject.task_id.splice(index, 1);
          await FindProject.save();
          return res
            .status(200)
            .json({ message: 'task removed from the Project successfully' });
        }
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};
//* Save Developers_id to particular task that are assigned(dev).
const devIDSave = async (req, res) => {
  try {
    const { devId } = req.body;
    const taskId = req.params.id; // Reference Task Id:-

    console.log(devId);
    if (!devId) {
      return res.status(422).json({ error: 'fill all the fields of the form' });
    }

    // Save task id to project collection
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(422).json({ error: 'Task not found' });
    } else if (task.user_id.includes(devId)) {
      return res
        .status(422)
        .json({ error: 'User already assigned to the task' });
    } else {
      //* Put the task id in the given task id:
      task.user_id.push([devId]);
      await task.save();
      return res.status(200).json({ task });
    }
  } catch (err) {
    console.log(err);
  }
};
//* Remove the Developers IF they are Removed By the manager:
const devRemove = async (req, res) => {
  try {
    const { devID } = req.body;
    const taskId = req.params.id;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(422).json({ error: 'Task not found' });
    }

    // Check if the developer is assigned to the task
    const index = task.user_id.indexOf(devID);
    if (index === -1) {
      return res
        .status(422)
        .json({ error: 'Developer not assigned to the task' });
    }
    // else Remove one developer from the task
    task.user_id.splice(index, 1);
    await task.save();

    return res
      .status(200)
      .json({ message: 'Developer removed from the task successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
//* For Developer to find his Tasks:
const developer = async (req, res) => {
  try {
    const _id = req.userId;
    console.log('id is:' + _id);
    const task = await Task.find({ user_id: _id });
    console.log('tasks are' + task);
    if (task) {
      res.json(task);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Developer can Update the status of the Task:
const updatedevTask = async (req, res) => {
  const _id = req.params.id;
  const updateTask = await Task.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  if (updateTask) {
    res.status(200).json({ success: 'Updated User SuccessFully' });
  } else {
    res.status(400).send();
  }
};
module.exports = {
  createTasks,
  fetchTasks,
  assignTasks,
  showSpecificTask,
  updateTask,
  deleteTask,
  devIDSave,
  devRemove,
  developer,
  updatedevTask,
};
