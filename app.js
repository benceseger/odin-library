const removeButtons = document.querySelectorAll('.remove-book');
const authorInput = document.getElementById('authorInput');
const titleInput = document.getElementById('titleInput');
const pagesInput = document.getElementById('pagesInput');
const readInput = document.getElementById('readCheck');

const submitBtn = document.getElementById('submit');


class Book {
    constructor(author, title, pages, isRead) {
        this.author = authorInput.value;
        this.title = titleInput.value;
        this.pages = pagesInput.value;
        this.isRead = readInput.value;
    }
}

let myLibrary = []
let newBook;

// const book = new Book();
let i = 0;

function addBookToLibrary() {
    event.preventDefault();
    newBook = new Book(authorInput.value, titleInput.value, pagesInput.value, readInput.value)
    myLibrary.push(newBook);
    setDataInStorage();
    createVisualCard();
}

function createVisualCard() {
    const cardContainer = document.getElementById('cardContainer');
    const cards = document.querySelectorAll('.card text-white bg-success mb-3 mt-3');
    cards.forEach(card => cardContainer.removeChild(card));

    for (let i = 0; i < myLibrary.length; i++) {
        createBook(myLibrary[i]);
    }
}

function createBook(book) {
    const container = document.querySelector('.container')
    const cardContainer = document.getElementById('cardContainer')
    const card = document.createElement('div');
    card.className = 'card text-white bg-success mb-3 mt-3';
    const cardHeader = document.createElement('div');
    cardHeader.className = 'card-header';
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    const removeBook = document.createElement('button');
    removeBook.classList.add('remove-book')
    const readBtn = document.createElement('button');
    
    cardHeader.textContent = `BOOK #${++i}`
    cardBody.innerHTML = `
    <h4 class="card-title" data-title>${book.title}</h4>
    <p class="card-author" data-author>Author: ${book.author}</p>
    <p class="card-page" data-pages>Pages: ${book.pages}</p>
    `
    removeBook.setAttribute('id', 'removeBook')
    removeBook.textContent = 'Remove Book'

    if (readInput.checked == false) {
        readBtn.textContent = 'Not Read';
        readBtn.className = 'btn btn-warning';
    } else {
        readBtn.textContent = 'Read';
        readBtn.className = 'btn btn-info';
    }
    
    removeBook.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(book), 1);
        setDataInStorage();
        createVisualCard();
    })

    readBtn.addEventListener('click', () => {
        if (readBtn.className === 'btn btn-warning') {
            readBtn.textContent = 'Read';
            readBtn.className = 'btn btn-info';
        } else {
            readBtn.textContent = 'Not Read';
            readBtn.className = 'btn btn-warning';
        }
    })

    container.appendChild(cardContainer);
    cardContainer.appendChild(card);
    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    cardBody.appendChild(removeBook);
    cardBody.appendChild(readBtn);
}

// LOCAL STORAGE
function setDataInStorage() {
    localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}

function recoverDataFromStorage() {
    if (!localStorage.myLibrary) {
        createVisualCard();
    } else {
        let items = localStorage.getItem('myLibrary');
        items = JSON.parse(items);
        myLibrary = items;
        createVisualCard();
    }
}

recoverDataFromStorage();

document.getElementById('submit').addEventListener('click', () => {
    addBookToLibrary()
})

