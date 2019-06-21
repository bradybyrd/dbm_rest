const express = require('express');
const router = new express.Router();
const multer = require('multer');
const webServerConfig = require('../config/web-server.js');
const projects = require('../controllers/projects_controller.js');
const packages = require('../controllers/packages_controller.js');
const environments = require('../controllers/environments_controller.js');
const dbmActions = require('../controllers/dbm-actions.js');
const welcome = require('../controllers/welcome.js');
const multerUpload = multer({dest: webServerConfig.upload_dir });

router.route('/projects/:project_id/packages/upload')
	.post(multerUpload.any(),packages.upload);
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
router.route('/')
	.get(welcome.get);

module.exports = router;
