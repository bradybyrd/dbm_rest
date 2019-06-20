const database = require('../services/database.js');
const environments = require('./environments.js');
const packages = require('./packages.js');
const util = require('util');

const baseQuery =
 `select proj.flowid "id",
  proj.flowname "name",
  proj.description,
  s.SCRIPTOUTPUTFOLDER "staging_path",
  s.SEPARATESCRIPTFOREACHTARGET "is_version"
  from tbl_flow proj inner join tbl_flow_settings s ON s.flowid = proj.flowid`;

async function find(context) {
  let query = baseQuery;
  const binds = {};
  if (context.id) {
    binds.id = context.id;
    query += `\nwhere proj.flowid = :id`;
  }
  const result = await database.simpleExecute(query, binds);
  return result.rows;
}

async function find_by_name(context) {
  let query = baseQuery;
  const binds = {};
  if (context.name) {
    binds.name = context.name;
    query += `\nwhere proj.flowname = ':name'`;
  }
  const result = await database.simpleExecute(query, binds);
  return result.rows[0];
}

async function projectInfo(context) {
		var binds = {};
    var envs = null;
		var answer = {"id" : context.id, "status" : "ERROR"};
		binds.id = context.id;
		const rows = await find(context);
		try{
			if ( rows.length === 1) {
				//console.log(`found records ${util.inspect(rows, {showHidden: false, depth: null}) }`);
        answer.name = rows[0].name;
        answer.staging_path = rows[0].staging_path;
        answer.is_version = rows[0].is_version;
        binds.project_id = context.id;
        envs = await environments.finder("by_project", binds)
        answer["environments"] = envs;
        answer["status"] = "SUCCESS";
				return(answer);
			} else {
				return(answer);
			}
		}catch(err){
			console.log(err)
		}
}

function releaseSource(opt, cacheInfo = {}) {
  var answer = {"status" : "ERROR"};
  console.log(`releaseSource-start: ${util.inspect(cacheInfo, {showHidden: false, depth: null}) }`);
  var context = {};
  if(opt !== "cache"){
    context.id = cacheInfo.id;
    projectInfo(context).then(function(result){
      cacheInfo = result
    });
  }
  for (env in cacheInfo.environments) {
    if(cacheInfo.environments[env].environment_type === "Release Source") {
      answer = cacheInfo.environments[env];
      answer.status = "SUCCESS";
    }
    //console.log(`releaseSource-inner: ${util.inspect(answer, {showHidden: false, depth: null}) }`);

  }
  console.log(`releaseSource: ${util.inspect(answer, {showHidden: false, depth: null}) }`);
  return answer;
}

module.exports.projectInfo = projectInfo;
module.exports.releaseSource = releaseSource;
module.exports.find_by_name = find_by_name;
module.exports.find = find;
