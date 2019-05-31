const database = require('../services/database.js');
 
const baseQuery = 
 `select lsid "id",
  lsname "name",
  is_rmsource "is_rs"
  from tbl_ls`;
 
async function find(context) {
  let query = baseQuery;
  const binds = {};
   if (context.id) {
    binds.employee_id = context.id;
     query += `\nwhere lsid = :id`;
  }
  const result = await database.simpleExecute(query, binds);
  return result.rows;
}
 
module.exports.find = find;
