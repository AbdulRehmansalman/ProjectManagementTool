const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  creator_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userSchema',
  },
  task_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'taskSchema',
    },
  ],
});

const Project = new mongoose.model('Project', projectSchema);
module.exports = Project;
