const mongoose = require('mongoose');
const connection = require('../services/mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  lastUpdatedOn: {
    type: Date,
    default: Date.now
  },
  lastUpdatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  due: {
    type: Date,
    required: true
  }
});

module.exports = connection.model('Task', taskSchema);