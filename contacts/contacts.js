const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(process.cwd(), "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const dataParsed = await JSON.parse(data);
    if (dataParsed.length === 0) {
      return console.log(`list is empty and is ===`, dataParsed);
    }
    console.table(dataParsed);
    console.log(`length our massive Json`, dataParsed.length);
    return;
  } catch (error) {
    return console.error(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const dataParsed = await JSON.parse(data);
    const getContactById = await dataParsed.find(
      (elem) => elem.id === contactId
    );
    if (!getContactById) {
      return console.log(
        `Sorry contact does not exist with this ID "${contactId}"`
      );
    }
    return console.table(getContactById);
  } catch (error) {
    return console.error(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const dataParsed = await JSON.parse(data);
    const removeContactById = await dataParsed.filter(
      (elem) => elem.id !== contactId
    );
    if (removeContactById.length === dataParsed.length) {
      return console.log(
        `Sorry contact does not exist with this ID "${contactId}" and it reason why we are not able to delete it,Sorry:)))`
      );
    }
    const contactsString = await JSON.stringify(removeContactById, null, 2);
    await fs.writeFile(contactsPath, contactsString);
    console.log(
      `we deleted our file success is : "${removeContactById.length}" was : "${dataParsed.length}" `
    );
  } catch (error) {
    return console.error(error.message);
  }
}

async function addContact(name, email, phone) {
  const newContact = {
    id: Number(phone),
    name: name,
    email: email,
    phone: phone,
  };

  try {
    if (!name || !email || !phone) {
      return console.log(
        `Some field was wrong written name = "${name}" , email = "${email}" , phone = "${phone}"`
      );
    }
    const data = await fs.readFile(contactsPath);
    const dataParsed = await JSON.parse(data);
    const addNewContact = await [...dataParsed, newContact];
    const contactsString = await JSON.stringify(addNewContact, null, 2);
    await fs.writeFile(contactsPath, contactsString);
    console.log(
      `we updated our file success success is : ${addNewContact.length} was : ${dataParsed.length} `
    );
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
