const {eventDbSetup} = require("./EventService");
const {personDbSetup} = require("./PersonService");
const {serviceDbSetup} = require("./ServiceService");

const sqlDbFactory = require("knex");

let sqlDb = sqlDbFactory({
    client: "pg",
    connection: process.env.DATABASE_URL || "postgres://zkcvavvgitmiec:d8345aa9e5b8db97ff53c2f49caf53c7d432a7fd2ce00d486215cf6174d4f405@ec2-46-137-177-160.eu-west-1.compute.amazonaws.com:5432/dbb2aa6skut733?ssl=true",
    ssl: true,
    debug: true
});

function setupDataLayer() {
    console.log("Setting up Data Layer...");

    //TODO implement a Promise all when all the DbSetups will be available

    eventDbSetup(sqlDb);
    personDbSetup(sqlDb);
    return serviceDbSetup(sqlDb);
}

module.exports = {database: sqlDb, setupDataLayer};