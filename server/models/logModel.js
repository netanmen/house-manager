const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Log
let Log = new Schema(
  {
    userId: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    event: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now,
      required: true
    }
  },
  {
    collection: 'Logs'
  }
);

module.exports = mongoose.model('Log', Log);