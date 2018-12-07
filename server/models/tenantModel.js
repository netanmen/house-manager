const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Tenant
let Tenant = new Schema(
  {
    fullname: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    financialDebt: {
      type: Number,
      required: true
    }
  },
  {
    collection: 'Tenants'
  }
);

module.exports = mongoose.model('Tenant', Tenant);