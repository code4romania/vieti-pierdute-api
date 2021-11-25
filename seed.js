const fs = require('fs');
const faker = require('faker/locale/ro');
const COUNT = 100;

const entry = () => ({
  victimFirstName: faker.name.firstName(),
  victimLastName: faker.name.lastName(),
  occupation: faker.name.jobTitle(),
  age: (Math.floor(Math.random() * 70) + 18).toString(),
  county: faker.address.county(),
  city: faker.address.state(),
  image: faker.image.people() + '.jpg',
  content: faker.lorem.paragraphs(),
  authorFirstName: faker.name.firstName(),
  authorLastName: faker.name.lastName(),
  authorRelation: faker.lorem.word(),
  authorEmail: faker.internet.email(),
  isExternal: faker.datatype.boolean(),
  externalLink: faker.internet.url(),
});

const jsonString = JSON.stringify(
  [...Array(COUNT).keys()].map(() => entry())
);

fs.writeFile('./import.json', jsonString, (err) => {
  if (err) {
    console.log('Error writing file', err);
  } else {
    console.log('Successfully wrote file');
  }
});
