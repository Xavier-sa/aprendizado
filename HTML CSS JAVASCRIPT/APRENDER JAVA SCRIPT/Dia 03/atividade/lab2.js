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
let showContact = function(contacts, i) {
    if (contacts instanceof Array && contacts[i]) {
        console.log(`${contacts[i].name} / ${contacts[i].phone} / ${contacts[i].email}`);
    }
}

// Function to show all contacts
let showAllContacts = function(contacts) {
    if (contacts instanceof Array) {
        for (let contact of contacts) {
            console.log(`${contact.name} / ${contact.phone} / ${contact.email}`);
        }
    }
}

// Function to add a new contact
let addNewContact = function(contacts, name, phone, email) {
    if (contacts instanceof Array && name && phone && email) {
        contacts.push({
            name: name,
            phone: phone,
            email: email
        });
    }
}

// Function to sort contacts
let sortContacts = function(contacts, key) {
    if (contacts instanceof Array) {
        contacts.sort((a, b) => {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        });
    }
}

// Function to handle user input for sorting
let userSortContacts = function() {
    const sortBy = prompt("Sort contacts by (name, phone, email):").toLowerCase();
    if (["name", "phone", "email"].includes(sortBy)) {
        sortContacts(contacts, sortBy);
        console.log(`Contacts sorted by ${sortBy}:`);
        showAllContacts(contacts);
    } else {
        console.log("Invalid sort option. Please choose 'name', 'phone', or 'email'.");
    }
}

// Example usage
showAllContacts(contacts); // Show initial contacts
userSortContacts(); // Prompt user to sort contacts

// Add a new contact and show updated list
addNewContact(contacts, "John Doe", "(123) 456-7890", "john.doe@example.com");
console.log("Updated contacts list:");
showAllContacts(contacts);
