const fs = require('fs')
const faker = require('faker/locale/ro');
const COUNT = 100;

const entry = () => ({
  "victimFirstName": faker.name.firstName(),
  "victimLastName": faker.name.lastName(),
  "occupation": faker.name.jobTitle(),
  "age": (Math.floor(Math.random() * 70) + 18).toString(),
  "image":  faker.image.people() + '.jpg',
  "content": faker.lorem.paragraphs(),
  "authorFirstName": faker.name.firstName(),
  "authorLastName": faker.name.lastName(),
  "authorEmail": faker.internet.email()
});
const jsonString = JSON.stringify([...Array(COUNT).keys()].map(()=>entry()));

fs.writeFile('./import.json', jsonString, err => {
  if (err) {
    console.log('Error writing file', err)
  } else {
    console.log('Successfully wrote file')
  }
})
