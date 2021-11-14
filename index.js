const { listContacts, getContactById, removeContact, addContact } = require(__dirname + '/contacts.js');
const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  id = Number.parseInt(id);
  switch (action) {
    case 'list':
      console.table(listContacts());
      break;

    case 'get':
      console.table(getContactById(id));
      break;

    case 'add':
      console.log(addContact(name, email, phone) === -1 ? 'error: full id pull' : 'OK');
      break;

    case 'remove':
      removeContact(id);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
