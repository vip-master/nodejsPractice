const fs = require('fs').promises;
// const { dirname } = require("path")

const contactsPath = __dirname + '/db/contacts.json';

async function deserialize(path) {
  return JSON.parse(await fs.readFile(path));
}

function serialize(path, data) {
  fs.writeFile(path, JSON.stringify(data));
}

function randomId(usedId) {
  if (usedId.length > 99) return -1;

  let random;

  do {
    random = Number.parseInt(Math.random() * 100);
  } while (usedId.includes(random));

  return random;
}

async function listContacts() {
  return await deserialize(contactsPath);
}

async function getContactById(contactId) {
  return (await deserialize(contactsPath)).find(e => e.id === contactId);
}

async function removeContact(contactId) {
  const data = await deserialize(contactsPath);

  serialize(
    contactsPath,
    data.filter(e => e.id !== contactId),
  );
}

async function addContact(name, email, phone) {
  const data = await deserialize(contactsPath);

  const id = randomId(data.map(e => e.id));

  if (id === -1) return -1;

  data.push({ id, name, email, phone });

  serialize(contactsPath, data);
}

module.exports = { listContacts, getContactById, removeContact, addContact };
