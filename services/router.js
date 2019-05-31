const express = require('express');
const router = new express.Router();
const employees = require('../controllers/employees.js');
const projects = require('../controllers/projects_controller.js');
const packages = require('../controllers/packages_controller.js');
const environments = require('../controllers/environments_controller.js');
const dbmActions = require('../controllers/dbm-actions.js');

router.route('/employees/:id?')
	.get(employees.get);
router.route('/projects/:project_id/packages/:id/deploy')
	.post(packages.deploy);
router.route('/projects/:project_id/packages/:id?')
	.post(packages.post)
  .put(packages.put)
  .get(packages.get);
router.route('/projects/:project_id/environments/:id?')
	.post(environments.post)
  .get(environments.get);
router.route('/projects/:id?')
	.get(projects.get)
  .post(projects.post);
router.route('/actions')
	.post(dbmActions.post);
	
module.exports = router;