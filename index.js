const argv = require("yargs").argv;
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts/contacts.js");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      await listContacts();
      break;

    case "get":
      await getContactById(id);
      break;

    case "add":
      await addContact(name, email, phone);
      break;

    case "remove":
      await removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

const arr = [1, 2, 2, 3, 3, 3, 1, 1, 1];
const sortedArr = arr.sort();
let newArchive = [];
for (elem of arr) {
  if (sortedArr.includes(elem)) {
    newArchive.push({ elem: +1 });
  }
  newArchive.push({ elem: 1 });
}
console.log(elem);
