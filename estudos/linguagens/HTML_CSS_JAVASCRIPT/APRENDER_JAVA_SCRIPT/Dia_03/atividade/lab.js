let contacts = [{
    name: "Maxwell Wright",
    phone: "(0191) 719 6495",
    email: "Curabitur.egestas.nunc@nonummyac.co.uk"
}, {
    name: "Raja Villarreal",
    phone: "0866 398 2895",
    email: "posuere.vulputate@sed.com"
}, {
    name: "Helen Richards",
    phone: "0800 1111",
    email: "libero@convallis.edu"
}];

// Function to show a specific contact
function showContact(contacts, index) {
    if (Array.isArray(contacts) && typeof index === 'number') {
        if (index >= 0 && index < contacts.length) {
            const contact = contacts[index];
            console.log(`Contact ${index}:`);
            console.log(`Name: ${contact.name}`);
            console.log(`Phone: ${contact.phone}`);
            console.log(`Email: ${contact.email}`);
        } else {
            console.log("Index out of range.");
        }
    } else {
        console.log("Invalid arguments: contacts must be an array and index must be a number.");
    }
}

// Function to show all contacts
function showAllContacts(contacts) {
    if (Array.isArray(contacts)) {
        console.log("All Contacts:");
        contacts.forEach((contact, index) => {
            console.log(`${index}: ${contact.name}`);
        });
    } else {
        console.log("Invalid argument: contacts must be an array.");
    }
}

// Function to add a new contact
function addNewContact(contacts, name, phone, email) {
    if (Array.isArray(contacts) && name && phone && email) {
        const newContact = { name, phone, email };
        contacts.push(newContact);
        console.log("New contact added:");
        console.log(newContact);
    } else {
        console.log("Invalid arguments: contacts must be an array and all contact data must have values.");
    }
}

// Example calls to the functions
showContact(contacts, 1); // Show contact at index 1
showAllContacts(contacts); // Show all contacts
addNewContact(contacts, "John Doe", "(123) 456-7890", "john.doe@example.com"); // Add a new contact

// Show updated contacts list
showAllContacts(contacts);
