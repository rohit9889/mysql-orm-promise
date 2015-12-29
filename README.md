# mysql-orm-promise

This is an ORM meant to read/modify data from your MySQL database into the node.js application.

### Install

    npm install mysql-orm-promise

### Initialization

    var MySQLORM = require('mysql-orm-promise')
    MysqlORM.connection.connect({
        host     : '<hostname>',
        user     : '<username>',
        password : '<password>',
        database : '<database_name>'
    })

### Features

#### A Robust Query Interface
Executing a query can prove to be as simple as

    var UserModel = MysqlORM.model('user')
    // `UserModel` will now act as the model representation for the `user` table in your database
    UserModel.findAll().exec().then(function(usersData){
        // usersData is the array of results
        // The attributes of the records can be accessed as `usersData[0].attributes`
        // So, in order to get the `name` attribute of the user, you will have to execute the following code
        console.log(usersData[0].attributes.name)
    })

    // `findAll` also has an alias function `all`

###### Get results based on conditions

    UserModel.where({"name": "Jack"}).exec().then(function(usersData){
        // ... handle all the Jacks here ...
    })

###### Select the fields to be retrieved

    UserModel.only(['first_name', 'last_name']).exec().then(function(usersData){
        // ... handle the results here ...
    })

###### Control how much data you want to read

    UserModel.skip(5).limit(10).exec().then(function(usersData){
        // ... handle the results here ...
    })

###### Control the order in which the data is read

    // Fetch data in ascending order
    UserModel.orderBy('id').exec().then(function(usersData){
        // ... handle the results here ...
    })

    // Fetch data in descending order
    UserModel.orderBy('id', true).exec().then(function(usersData){
        // ... handle the results here ...
    })