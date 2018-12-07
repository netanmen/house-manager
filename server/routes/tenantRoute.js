const express = require('express');
const tenantRoutes = express.Router();

let Tenant = require('../models/tenantModel');

// List all tenants
tenantRoutes.route('/list').get((req, res) => {
  Tenant.find(function(err, result){
    if(err){
    	res.json({errorMessage: err});
      console.log(err);
    }
    else {
      res.json(result);
      console.log('GET request at /tenants/list');
    }
  });
});

// Create new tenant
tenantRoutes.route('/create').post((req, res) => {
  const newTenant = {
    fullname: req.body.fullname,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    financialDebt: req.body.financialDebt
  };
  Tenant.create(newTenant, function(err, result){
    if (err) {
      res.json({errorMessage: err});
    	console.log(err);
    } else {
	    res.json('Create completed');
	    console.log('POST to /tenants/create');
	    console.log(`New tenant has been created: ${JSON.stringify(newTenant)}`);
		}
  });
});

// Update tenant
tenantRoutes.route('/edit').post((req, res) => {
  const editTenantId = { 
    _id: req.body._id 
  };
  Tenant.findOne(editTenantId, function(err, result) {
    if (err)
      res.json({errorMessage: err});
    else {
      result.fullname = req.body.fullname;
      result.phoneNumber = req.body.phoneNumber;
      result.address = req.body.address;
      result.financialDebt = req.body.financialDebt;

      result.save()
      .then(result => {
        res.json('Update completed');
      })
      .catch(err => {
        res.json({errorMessage: err});
      });
    }
	});
});

// Delete tenant
tenantRoutes.route('/delete').post((req, res) => {
  const deleteTenant = {
    _id: req.body._id
  };
  Tenant.findOneAndDelete(deleteTenant, function(err, result){
    if(err) {
      res.json({errorMessage: err});
    } else {
	    res.json('Delete completed');
	    console.log('POST to /tenants/delete');
	    console.log(`Tenant has been deleted: ${(result)}`);
    }
  });
});

module.exports = tenantRoutes;