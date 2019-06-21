
Following: https://jsao.io/2018/03/creating-a-rest-api-with-node-js-and-oracle-database/

PS C:\automation\dev\dbm_rest> node -v
v8.9.4
PS C:\automation\dev\dbm_rest> npm init -y
Wrote to C:\automation\dev\dbm_rest\package.json:

{
  "name": "dbm_rest",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}




   ╭─────────────────────────────────────╮
   │                                     │
   │   Update available 5.6.0 → 6.9.0    │
   │       Run npm i npm to update       │
   │                                     │
   ╰─────────────────────────────────────╯

PS C:\automation\dev\dbm_rest> npm install express -s
+ express@4.17.0
added 50 packages in 3.563s


PS C:\automation\dev\dbm_rest> npm install oracledb -s
oracledb ********************************************************************************
oracledb ** Node-oracledb 3.1.2 installed for Node.js 8.9.4 (win32, x64)
oracledb **
oracledb ** To use node-oracledb:
oracledb ** - Oracle Client libraries (64-bit) must be in your PATH environment variable
oracledb ** - To get libraries, install an Instant Client Basic or Basic Light package from
oracledb **   https://www.oracle.com/technetwork/topics/winx64soft-089540.html
oracledb ** - A Microsoft Visual Studio Redistributable suitable for your Oracle Client library version must be availabl
e
oracledb **   See https://oracle.github.io/node-oracledb/INSTALL.html for details
oracledb **
oracledb ** Installation instructions: https://oracle.github.io/node-oracledb/INSTALL.html
oracledb ********************************************************************************

#=> Adding File Upload Capability
npm install --save multer async node-cmd
C:\Automation\dev\dbm_rest>npm install --save multer async node-cmd
npm WARN dbm_rest@1.0.0 No repository field.

+ async@3.0.1
+ multer@1.4.1
+ node-cmd@3.0.0
added 23 packages in 4.176s

https://medium.com/technoetics/handling-file-upload-in-nodejs-7a4bb9f09a27

Installing TEsting harness
C:\Automation\dev\dbm_rest>npm install --save mocha
npm WARN dbm_rest@1.0.0 No repository field.

+ mocha@6.1.4
added 112 packages in 12.671s

C:\Automation\dev\dbm_rest>npm install --save-dev should
npm WARN dbm_rest@1.0.0 No repository field.

+ should@13.2.3
added 6 packages in 2.245s

C:\Automation\dev\dbm_rest>npm install --save-dev supertest
npm WARN dbm_rest@1.0.0 No repository field.

+ supertest@4.0.2
added 15 packages in 3.313s
