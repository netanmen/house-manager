const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const tenantRoute = require('./routes/tenantRoute');
const auth = require('./routes/auth');

const app = express();

const port = 5000;
const url = 'mongodb://localhost:27017/house_manager';

mongoose.Promise = global.Promise;
mongoose.connect(url, { useNewUrlParser: true })
	.then(() => {
		console.log('Database is connected') 
	}, 
	err => { 
		console.log('Can not connect to the database'+ err)
	}
);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', auth);

app.use(auth.authenticateUser);
app.use('/tenants', tenantRoute);



app.listen(port, () => {
  console.log(`Server is running on port ${port}...`)
});

