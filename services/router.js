const express = require('express');
const router = new express.Router();
const employees = require('../controllers/employees.js');
const projects = require('../controllers/projects.js');

router.route('/employees/:id?')
	.get(employees.get);
router.route('/projects/:id?')
	.get(projects.get);
	
module.exports = router;