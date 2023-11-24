const Project = require('../models/project');
const Task = require('../models/task');

// * Save project creation by Manager:
const createProjects = async (req, res) => {
  try {
    const { name, description, deadline } = req.body;
    const creator_id = req.userId;

    if (!name || !description || !deadline) {
      return res.status(422).json({ error: 'fill all the feilds of the form' });
    }
    // console.log(creator_id);
    const adduser = new Project({ name, description, deadline, creator_id });
    const data = await adduser.save();
    console.log(data);
    if (data) {
      return res
        .status(200)
        .json({ message: 'Project Data saved successfully' });
    }
  } catch (err) {
    console.log(err);
  }
};
//* get all the projects created by particular user(manager):
const getProjectbyUserId = async (req, res) => {
  const creator_id = req.userId;
  try {
    //* Project Display on manager page:
    const projects = await Project.find({ creator_id });
    console.log(projects);
    res.json(projects);
  } catch (err) {
    console.log(err);
  }
};
//* Get Project Value to be set in Ui,before Update
const SpecificProjectSet = async (req, res) => {
  const _id = req.params.id;
  try {
    const getProjects = await Project.findById({ _id });
    console.log(getProjects);
    res.status(200).json(getProjects);
  } catch (err) {
    console.log(err);
  }
};
//* Update Projects (Manager):
const updateProjects = async (req, res) => {
  const _id = req.params.id;
  const updateUser = await Project.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  if (updateUser) {
    res.status(200).json(updateUser);
    console.log('Updated User SuccesFully');
  } else {
    res.status(400).send();
  }
};
//* Delete Projects (Manager):
const DeleteProjects = async (req, res) => {
  const _id = req.params.id;
  try {
    const deleteProj = await Project.findById(_id);
    if (!deleteProj) {
      res.status(400).send('Error');
    } else {
      const taskID = deleteProj.task_id;
      // * Delete the project
      await deleteProj.deleteOne();

      //? and delete all associated Task:$in means that elements matches taskID:-
      await Task.deleteMany({ _id: { $in: taskID } });
      res.status(200).json('Project and associated Tasks deleted SuccesFully ');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  createProjects,
  getProjectbyUserId,
  SpecificProjectSet,
  updateProjects,
  DeleteProjects,
};
