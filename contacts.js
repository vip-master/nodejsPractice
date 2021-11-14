const fs = require('fs');
// const { dirname } = require("path")

const contactsPath = __dirname + '/db/contacts.json';

function deserialize(path) {
  return JSON.parse(fs.readFileSync(path));
}

function serialize(path, data) {
  fs.writeFileSync(path, JSON.stringify(data));
}

function randomId(usedId) {
  if (usedId.length > 99) return -1;

  let random;

  do {
    random = Number.parseInt(Math.random() * 100);
  } while (usedId.includes(random));

  return random;
}

function listContacts() {
  return deserialize(contactsPath);
}

function getContactById(contactId) {
  return deserialize(contactsPath).find(e => e.id === contactId);
}

function removeContact(contactId) {
  const data = deserialize(contactsPath);

  serialize(
    contactsPath,
    data.filter(e => e.id !== contactId),
  );
}

function addContact(name, email, phone) {
  const data = deserialize(contactsPath);

  const id = randomId(data.map(e => e.id));

  if (id === -1) return -1;

  data.push({ id, name, email, phone });

  serialize(contactsPath, data);
}

module.exports = { listContacts, getContactById, removeContact, addContact };
