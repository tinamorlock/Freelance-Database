const button = document.getElementById('enter');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const categoryInput = document.getElementById('otherCategory');
const categorySelect = document.getElementById('categorySelect');
const streetAdd = document.getElementById('streetAdd');
const city = document.getElementById('city');
const state = document.getElementById('state');
const zipcode = document.getElementById('zipcode');
const ul = document.getElementById('clientList');

// Event Listeners

button.addEventListener('click', createClient);
categoryInput.addEventListener('input', function () {
    updateCategoryOptions(categoryInput.value);
});

// checks that all values have been added

function validateClient() {
    clientArr = [
        firstName.value,
        lastName.value,
        streetAdd.value,
        city.value,
        state.value,
        zipcode.value,
    ];
    for (let x = 0; x < clientArr.length; x++) {
        if (clientArr[x] === '') {
            alert('Please fill in all the client data and resubmit.');
            return false;
        }
        return true;
    }
}

// grabs values from the input fields

function createClient () {
    if(validateClient()) {
        const clientData = {
            fname: firstName.value,
            lname: lastName.value,
            category: categorySelect.value || categoryInput.value,
            address: streetAdd.value,
            clientCity: city.value,
            clientState: state.value,
            clientZip: zipcode.value,
        }

        // adds to html page

        displayClient(clientData.fname, clientData.lname, clientData.category);
        saveToLocalStorage();
        clearClientInputs();
    }

}

// displays client name and category on the index page

function displayClient(clientFirst, clientLast, clientCategory) {
    const li = document.createElement('li');
    li.innerHTML = `<span class="client-name"> ${clientFirst} ${clientLast}</span><span class="client-category">${clientCategory}</span> <button class="delete">delete</button>`;
    ul.appendChild(li);
    li.querySelector('.delete').addEventListener('click', deleteClient);
}

// deletes client from page and local storage

function deleteClient(event) {
    event.stopPropagation();
    const deletedClient = this.closest('li');
    if (deletedClient) {
        deletedClient.remove();
        saveToLocalStorage();
    }
}

// saves any changes (add or remove) to local storage

function saveToLocalStorage() {
    const clients = Array.from(ul.children).map(clientElement => {
        const clientCategory = categorySelect.value !== '' ? categorySelect.value : categoryInput.value;
        const clientData = {
            fname: firstName.value.trim(),
            lname: lastName.value.trim(),
            category: clientCategory,
            address: streetAdd.value.trim(),
            city: city.value.trim(),
            state: state.value.trim(),
            zip: zipcode.value.trim(),
        };
        return clientData;
    });

    localStorage.setItem('clientList', JSON.stringify(clients));

}

// loads client data from local storage

function loadFromLocalStorage() {
    const savedClients = localStorage.getItem('clientList');
    if (savedClients) {
        const myClients = JSON.parse(savedClients);
        myClients.forEach(client => {
            const { fname, lname, category } = client;

            displayClient(fname, lname, category);
        });
    }
}

function updateCategoryOptions(customCategory) {
    // Clear existing options
    categorySelect.innerHTML = '';

    // Add custom category if provided
    if (customCategory) {
        const customOption = document.createElement('option');
        customOption.value = customCategory;
        customOption.textContent = customCategory;
        categorySelect.appendChild(customOption);
    }

    // Add default options
    ['Editing', 'Writing', 'Project Management'].forEach(category => {
        const option = document.createElement('option');
        option.value = category.toLowerCase();
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

function clearClientInputs () {
    firstName.value = '';
    lastName.value = '';
    categoryInput.value = '';
    categorySelect.value = '';
    streetAdd.value = '';
    city.value = '';
    state.value = '';
    zipcode.value = '';
}

loadFromLocalStorage();