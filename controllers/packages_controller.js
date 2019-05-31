const packages = require('../models/packages.js');

async function get(req, res, next) {
	try {
		const context = {};
		context.project_id = parseInt(req.params.project_id, 10);
		context.id = parseInt(req.params.id, 10);
		const rows = await packages.finder(context);
		if (req.params.id) {
			if ( rows.length === 1) {
				res.status(200).json(rows[0]);
			} else {
				res.status(404).end();
			}
		} else {
			res.status(200).json(rows);
		}
	} catch(err) {
		next(err);
	}
}

async function put(req, res, next) {
	try {
		const context = {};
		context.project_id = parseInt(req.params.project_id, 10);
		context.id = parseInt(req.params.id, 10);
		const rows = await packages.find(context);
		if (req.params.id) {
			if ( rows.length === 1) {
				res.status(200).json(rows[0]);
			} else {
				res.status(404).end();
			}
		} else {
			res.status(200).json(rows);
		}
	} catch(err) {
		next(err);
	}
}

async function post(req, res, next) {
	try {
		const context = {};
		context.project_id = parseInt(req.params.project_id, 10);
		context.id = parseInt(req.params.id, 10);
		const rows = await packages.find(context);
		if (req.params.id) {
			if ( rows.length === 1) {
				res.status(200).json(rows[0]);
			} else {
				res.status(404).end();
			}
		} else {
			res.status(200).json(rows);
		}
	} catch(err) {
		next(err);
	}
}

async function deploy(req, res, next) {
	try {
		const context = {};
		context.project_id = parseInt(req.params.project_id, 10);
		context.id = parseInt(req.params.id, 10);
		const rows = await packages.find(context);
		if (req.params.id) {
			if ( rows.length === 1) {
				res.status(200).json(rows[0]);
			} else {
				res.status(404).end();
			}
		} else {
			res.status(200).json(rows);
		}
	} catch(err) {
		next(err);
	}
}

module.exports.deploy = deploy;
module.exports.get = get;
module.exports.put = put;
module.exports.post = post;