const button = document.getElementById('enter');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const categoryInput = document.getElementById('otherCategory');
const categorySelect = document.getElementById('categorySelect');
const streetAdd = document.getElementById('streetAdd');
const city = document.getElementById('city');
const state = document.getElementById('state');
const zipcode = document.getElementById('zipcode');
const email = document.getElementById('email');
const website = document.getElementById('website');
const ul = document.getElementById('clientList');

// Event Listeners

button.addEventListener('click', createClient);
categoryInput.addEventListener('input', function () {
    updateCategoryOptions(categoryInput.value);
});

function validateClient() {
    const clientArr = [
        firstName.value,
        lastName.value,
        email.value,
        website.value,
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
    }
    return true;
}

function createClient() {
    if (validateClient()) {
        const clientData = {
            fname: firstName.value,
            lname: lastName.value,
            email: email.value,
            website: website.value,
            category: categorySelect.value || categoryInput.value,
            address: streetAdd.value,
            clientCity: city.value,
            clientState: state.value,
            clientZip: zipcode.value,
        };

        displayClient(clientData);
        saveToLocalStorage();
        clearClientInputs();
    }
}

function displayClient(clientData) {
    const li = document.createElement('li');
    li.innerHTML = `<span class="client-name">${clientData.fname} ${clientData.lname}</span><span class="client-category">${clientData.category}</span> <button class="delete">delete</button>`;
    ul.appendChild(li);
    li.querySelector('.delete').addEventListener('click', deleteClient);
}

function deleteClient(event) {
    event.stopPropagation();
    const deletedClient = this.closest('li');
    if (deletedClient) {
        deletedClient.remove();
        saveToLocalStorage();
    }
}

function saveToLocalStorage() {
    const clients = Array.from(ul.children).map(clientElement => {
        return {
            fname: clientElement.querySelector('.client-name').textContent.trim(),
            lname: '',
            email: '',
            website: '',
            category: clientElement.querySelector('.client-category').textContent.trim(),
            address: '',
            clientCity: '',
            clientState: '',
            clientZip: '',
        };
    });

    localStorage.setItem('clientList', JSON.stringify(clients));
}

function loadFromLocalStorage() {
    const savedClients = localStorage.getItem('clientList');
    if (savedClients) {
        const myClients = JSON.parse(savedClients);
        myClients.forEach(client => {
            displayClient(client);
        });
    }
}

function updateCategoryOptions(customCategory) {
    categorySelect.innerHTML = '';

    if (customCategory) {
        const customOption = document.createElement('option');
        customOption.value = customCategory;
        customOption.textContent = customCategory;
        categorySelect.appendChild(customOption);
    }

    ['Editing', 'Writing', 'Project Management'].forEach(category => {
        const option = document.createElement('option');
        option.value = category.toLowerCase();
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

function clearClientInputs() {
    firstName.value = '';
    lastName.value = '';
    email.value = '';
    website.value = '';
    categoryInput.value = '';
    categorySelect.value = '';
    streetAdd.value = '';
    city.value = '';
    state.value = '';
    zipcode.value = '';
}

loadFromLocalStorage();
