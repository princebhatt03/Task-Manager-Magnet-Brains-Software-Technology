const mongoose = require('mongoose');

const PRIORITIES = ['low', 'medium', 'high'];
const STATUSES = ['pending', 'completed'];

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 120,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    dueDate: {
      type: Date,
    },
    priority: {
      type: String,
      enum: PRIORITIES,
      default: 'medium',
      index: true,
    },
    status: {
      type: String,
      enum: STATUSES,
      default: 'pending',
      index: true,
    },
  },
  { timestamps: true }
);

taskSchema.index({
  userId: 1,
  status: 1,
  priority: 1,
  dueDate: 1,
  createdAt: -1,
});

const Task = mongoose.model('Task', taskSchema);
module.exports = { Task, PRIORITIES, STATUSES };
