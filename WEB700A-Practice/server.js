const Sequelize = require("sequelize");

// set up sequelize to point to our postgres database
var sequelize = new Sequelize('database', 'user', 'password', {
    host: 'host',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: { rejectUnauthorized: false }
    }
});

var Project = sequelize.define('Project', {
    title: Sequelize.STRING,
    description: Sequelize.TEXT
});

/*var Project = sequelize.define('Project', {
    project_id: {
        type: Sequelize.INTEGER,
        primaryKey: true, // use "project_id" as a primary key
        autoIncrement: true // automatically increment the value
    },
    title: Sequelize.STRING,
    description: Sequelize.TEXT
},{
    createdAt: false, // disable createdAt
    updatedAt: false // disable updatedAt
});*/

let User = sequelize.define("User", {
    fullName: Sequelize.STRING, // the user's full name (ie: "Jason Bourne")
    title: Sequelize.STRING // the user's title within the project (ie, developer)
});

var Task = sequelize.define('Task', {
    title: Sequelize.STRING, // title of the task
    description: Sequelize.TEXT // main text for the task
});

User.hasMany(Task);


let Name = sequelize.define("Name", {
    fName: Sequelize.STRING,
    lName: Sequelize.STRING
})

sequelize.sync().then(() => { // needs to be run exactly once before the server starts

    /*Project.create({
        title: 'Project1',
        description: 'First Project'
    }).then(proj=>{
        proj = proj.dataValues;
        console.log("project created in the database!");
        console.log(proj);
    });*/


    // Create user "Jason Bourne"
    /*User.create({
        fullName: "Jason Bourne",
        title: "developer"
    }).then(function (user) {

        console.log("user created");

        // Create "Task 1" for the new user
        Task.create({
            title: "Task 1",
            description: "Task 1 description",
            UserId: user.id // set the correct Userid foreign key
        }).then(function () {
            console.log("Task 1 created")
        });

        // Create "Task 2" for the new user
        Task.create({
            title: "Task 2",
            description: "Task 2 description",
            UserId: user.id // set the correct Userid foreign key
        }).then(function () { console.log("Task 2 created") });
    });*/

    /*User.destroy({
        where: { id: 1}
    }).then(()=>{
        console.log("user with id 1 destroyed");
    })*/

    /*Name.create({
        fName: "Fred",
        lName: "Flintstone"
    }).then(()=>console.log("Fred created!"));

    Name.create({
        fName: "Wilma",
        lName: "Flintstone"
    }).then(()=>console.log("Wilma created!"));

    Name.create({
        fName: "Barney",
        lName: "Rubble"
    }).then(()=>console.log("Barney created!"));*/

    /*Name.findAll({
        attributes: ['fName']
    }).then(data=>{
        data = data.map(x=>x.dataValues);
        console.log(data);
    });*/

    /*Name.findAll().then(data=>{
        data = data.map(x=>x.dataValues);
        console.log(data);
    })*/

    /*Name.findAll({
        where: {
            id: 2
        }
    }).then(data=>{
        data = data.map(x=>x.dataValues);
        console.log(data);
    })*/

    /*Name.update({
        lName: "Bedrock"
    },{
        where: {
            id: 2
        }
    }).then(()=>{ console.log("wilma changed her name")});*/

    Name.destroy({
        where: {id: 3}
    }).then(()=>{console.log("user with id 3 was removed")});



}).catch(err => {
    console.log(err);
})
