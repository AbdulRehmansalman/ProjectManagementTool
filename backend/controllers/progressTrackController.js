const Project = require('../models/project');
const Task = require('../models/task');

//* Project to track progress
const showParticularproject = async (req, res) => {
  const _id = req.params.id;
  try {
    //* Project Display on manager page:
    const projects = await Project.find({ _id });
    console.log(projects);
    res.json(projects);
  } catch (err) {
    console.log(err);
  }
};

//* to show Developer,His Specific Tasks:

const showTask = async (req, res) => {
  const project_id = req.params.project_id;
  try {
    const getTasks = await Task.find({ project_id: project_id });
    console.log('the Click task are ' + getTasks);
    res.status(200).json(getTasks);
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  showParticularproject,
  showTask,
};
