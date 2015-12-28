var MysqlORM = require('./../index')
MysqlORM.connection.connect({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'project_po_development'
})

require('./user-model')