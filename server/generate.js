// import { Faker } from "@faker-js/faker/faker";

var database = { users:[]};

database.users = [
    {
        "username" : 123456,
        "password" : 123456,
        "profile" : "centre"
    },
    {
        "username" : 456789,
        "password" : 456789,
        "profile" : "geologie"
    },
    {
        "username" : 741852,
        "password" : 741852,
        "profile" : "centre"
    },
    {
        "username" : 963852,
        "password" : 963852,
        "profile" : "geologie"
    }
];

console.log(JSON.stringify(database))