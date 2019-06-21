
async function get(req, res, next) {
	try {
    var message = `
      Welcome to the DBmaestro API.
      Helpful hints:
      REST Examples:
      List of projects                       GET<baseUrl>/api/projects
      Single project                         GET<baseUrl>/api/projects/:id
      Project environments                   GET<baseUrl>/api/projects/:id/environments
      Packages in project                    GET<baseUrl>/api/projects/:id/packages
      Package details                        GET<baseUrl>/api/projects/:project_id/packages/:id
      Deploy a package                       POST<baseUrl>/api/projects/:project_id/packages/:id/deploy
                                              {environment: DEV}
      Create a package                       POST<baseUrl>/api/projects/:project_id/packages/upload
                                              {packageName: V2.1, scripts [script1.sql, script2.sql]}
                                              (multipart with zip attachment)
      Project environment report             GET<baseUrl>/api/projects/:project_id/environments/:id/report > report.html
    `
		var restResult = {"status" : "SUCCESS", "message" : message};
		res.status(200).json(restResult);

	} catch(err) {
		next(err);
	}
}

module.exports.get = get;
