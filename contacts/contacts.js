const fs = require("fs/promises");
const path = require("path");
const contactsFolder = path.join(process.cwd(), "db", "contacts.json");
const uuid = require('uuid');


async function listContacts() {
  try {
    const data = await fs.readFile(contactsFolder);
    const parsed = await JSON.parse(data);
    if (parsed.length === 0) return console.log(`list is empty and is ===`, parsed)
    console.table(parsed);
    console.log(`length our massive Json`, parsed.length);
  } catch (err) {
    return console.error(err.message);
  }
}

async function getContactById(id) {
  try {
    const data = await fs.readFile(contactsFolder);
    const parsed = await JSON.parse(data);
    const contact = await parsed.find(
      (elem) => elem.id === String(id)
    );
    if (!contact) return console.log(
        `Sorry contact does not exist with this ID "${id}"`);
 
    return console.table(contact);
  } catch (err) {
    return console.error(err.message);
  }
}

async function removeContact(id) {
  try {
    const data = await fs.readFile(contactsFolder);
    const parsed = await JSON.parse(data);
    const contacts = await parsed.filter(
      (elem) => elem.id !== String(id)
    );
    if (contacts.length === parsed.length) return console.log(
        `Sorry contact does not exist with this ID "${id}" and it reason why we are not able to delete it,Sorry:)))`
      );
  
    const json = await JSON.stringify(contacts, null, 2);
    await fs.writeFile(contactsFolder, json);
    console.log(
      `we deleted our file successful,amount is : "${contacts.length}" was : "${parsed.length}" `
    );
  } catch (err) {
    return console.error(err.message);
  }
}

async function addContact(name, email, phone) {
  const contact = {
    id: uuid.v1(),
    name: name,
    email: email,
    phone: String(phone),
  };

  try {
    if (!name || !email || !phone) return console.log(
        `Some field was wrong written name = "${name}" , email = "${email}" , phone = "${phone}"`);

    const data = await fs.readFile(contactsFolder);
    const parsed = await JSON.parse(data);
    const contacts = await [...parsed, contact];
    const json = await JSON.stringify(contacts, null, 2);
    await fs.writeFile(contactsFolder, json);
    console.log(
      `we updated our file success successful,length is : ${contacts.length} was : ${parsed.length} `
    );
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
