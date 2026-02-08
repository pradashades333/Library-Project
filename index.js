const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.id = crypto.randomUUID()
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read)
    myLibrary.push(book)
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 432, true);

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

        `;
        
        container.appendChild(bookCards);

    });
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

    addBookToLibrary(title, author, pages, read);

    displayBooks();

    bookDialog.close();

    bookForm.reset();

});


cancelBtn.addEventListener('click', () => {
    bookDialog.close()
})