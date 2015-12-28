var MysqlORM = require('./../index')

var Project = MysqlORM.model('projects')
Project
.orderBy('id', true)
.exec()
.then(function(data){
  console.log(data)
  return Project.count('id')
})
.then(function(count){
  console.log(count)
})