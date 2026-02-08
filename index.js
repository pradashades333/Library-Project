const myLibrary = [];

function Book(title, author, pages, read, rating) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.rating = rating
    this.id = crypto.randomUUID()
}

Book.prototype.toggleRead = function(){
    this.read = !this.read
}

function addBookToLibrary(title, author, pages, read, rating) {
    const book = new Book(title, author, pages, read, rating)
    myLibrary.push(book)
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true, 4);
addBookToLibrary("1984", "George Orwell", 328, false, 3);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 432, true, 5);

function displayBooks() {
    const container = document.getElementById("library-container");
    container.innerHTML = "";

    myLibrary.forEach(book => {
        const bookCards = document.createElement("div");     
        bookCards.className = "book-card";
       
        bookCards.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author ${book.author} </p>
            <p>Total Pages: ${book.pages} </p>
            <p>Read: ${book.read ? 'Yes' : 'No'} </p>
            <p> Rating ${book.rating}/5 </p>
            <button class="remove-btn" data-id="${book.id}">Remove</button>
            <button class = "toggle-read-btn" data-id="${book.id}"> Toggle Read </button>

        `;
        
        container.appendChild(bookCards);

    });

    setupRemoveButton();

    setupReadButton();
}

displayBooks();


const newBookButton = document.getElementById("new-book-btn");
const bookDialog = document.getElementById('book-dialog');
const bookForm = document.getElementById('book-form');
const cancelBtn = document.getElementById('cancel-btn');

newBookButton.addEventListener('click', () => {
    bookDialog.showModal()
});

bookForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    const rating = document.getElementById('rating').value;

    addBookToLibrary(title, author, pages, read,rating);

    displayBooks();

    bookDialog.close();

    bookForm.reset();

});


cancelBtn.addEventListener('click', () => {
    bookDialog.close()
})


function setupRemoveButton(){
    const removeButtons = document.querySelectorAll('.remove-btn');

    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const bookId = button.dataset.id;
            const bookIndex = myLibrary.findIndex(book => book.id === bookId);
            myLibrary.splice(bookIndex, 1);
            displayBooks();
        });
    });
}


function setupReadButton(){
    const readButton = document.querySelectorAll('.toggle-read-btn')

    readButton.forEach(button => {
        button.addEventListener('click', () => {
            const bookId = button.dataset.id;
            const book = myLibrary.find(book => book.id === bookId);
            book.toggleRead();
            displayBooks();

        })
    })
}

