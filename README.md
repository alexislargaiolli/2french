# 2french

a [Sails](http://sailsjs.org) application

 ## Prerequire

 Install sails : npm install -g sails@0.12.1
 Install bower : npm install -g bower
 Install mongodb : https://docs.mongodb.com/manual/installation/
 Create local mongo user by using mongo shell (type mongo in a terminal) and type : 
    use 2french
    db.createUser(
    {
        user: "localUser",
        pwd: "password",
        roles: [
        { role: "readWrite", db: "2french" }
        ]
    }
    )

## Continuous integration
Test are made on codeship. Care about protractor version, last version supported is 4.0.11
Test are triggered by commit push on master and production branches.

## Deploy
Deploy is made on heroku server and triggered by a commit push on production branch.

