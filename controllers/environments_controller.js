const environments = require('../models/environments.js');

async function get(req, res, next) {
	// api/projects/:id/packages
	try {
		const context = {};
		context.project_id = parseInt(req.params.project_id, 10);
		if (req.params.id) {
			context.id = parseInt(req.params.id, 10);
			const rows = await environments.finder("by_id", context);
			if ( rows.length === 1) {
				res.status(200).json(rows[0]);
			} else {
				res.status(404).end();
			}
		} else {
			const rows = await environments.finder("by_project", context);		
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
		const rows = await environments.find(context);
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

module.exports.get = get;
module.exports.post = post;
