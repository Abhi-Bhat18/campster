"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = require("@faker-js/faker");
var csv_writer_1 = require("csv-writer");
// Define the CSV writer
var csvWriter = (0, csv_writer_1.createObjectCsvWriter)({
    path: 'contacts.csv',
    header: [
        { id: 'first_name', title: 'first_name' },
        { id: 'last_name', title: 'last_name' },
        { id: 'email', title: 'email' },
        { id: 'contact', title: 'contact' },
        { id: 'attributes', title: 'attributes' },
        { id: 'opt_in', title: 'opt_in' },
        { id: 'unsubscribed', title: 'unsubscribed' },
        { id: 'updated_at', title: 'updated_at' },
        { id: 'created_at', title: 'created_at' },
    ],
});
// Function to generate random contact data
var generateContactData = function () { return ({
    first_name: faker_1.faker.person.firstName(),
    last_name: faker_1.faker.person.lastName(),
    email: faker_1.faker.person.firstName + faker_1.faker.person.lastName() + '@mailinator.com',
    contact: faker_1.faker.phone.number(),
    attributes: JSON.stringify({
        interests: faker_1.faker.word.noun(),
        notes: faker_1.faker.lorem.sentence(),
    }),
    opt_in: faker_1.faker.datatype.boolean(),
    unsubscribed: faker_1.faker.datatype.boolean(),
    updated_at: faker_1.faker.date.recent().toISOString(),
    created_at: faker_1.faker.date.past().toISOString(),
}); };
// Generate 200 rows of data
var contacts = Array.from({ length: 100 }, generateContactData);
// Write the data to CSV file
csvWriter
    .writeRecords(contacts)
    .then(function () { return console.log('CSV file created successfully at contacts.csv'); })
    .catch(function (err) { return console.error('Error writing CSV file', err); });
