////////////////////// When X EventListener happens

document.addEventListener("DOMContentLoaded", () => {
    const bookListUL = document.getElementById("list")

    fetchAllBooks()

    bookListUL.addEventListener("click", event => clickOnBook(event))
})

/////////////////////// Fetch Y from server
function fetchAllBooks() {
    fetch("http://localhost:3000/books")
    .then(res => res.json())
    .then(books => renderBooks(books))
}

let bookID;

function fetchOneBook(bookID){
    fetch(`http://localhost:3000/books/${bookID}`)
    .then(res => res.json())
    .then(book => showBookDetail(book))
}

function fetchReadBook(bookID){
    fetch(`http://localhost:3000/books/${bookID}`)
    .then(res => res.json())
    .then(book => updateBookReaders(book))
}

function fetchUser1(book){
    fetch("http://localhost:3000/users/1")
    .then(res => res.json())
    .then(user => addUserToBook(user, book))
}

function fetchAddUserToBook(book, newUserArray){
    fetch(`http://localhost:3000/books/${bookID}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            users: newUserArray
        })
    })
    .then(res => res.json())
    .then(showBookDetail(book))
}

/////////////////////// Slap Z to the DOM (Manipulate/Render DOM)
function renderBooks(books){
    books.forEach(book => renderOneBook(book))
}

function renderOneBook(book){
    const bookListUL = document.getElementById("list")
    const bookLI = document.createElement("li")
    
    bookLI.innerHTML = `<h2 data-id=${book.id} data-is-book-link="true">${book.title}</h2>`

    bookListUL.appendChild(bookLI)
}

function clickOnBook(event){
    if (event.target.dataset.isBookLink){
        bookID = event.target.dataset.id

        fetchOneBook(bookID)
    }
}

// This function is not used
function showBookUsers(book){
    const ul = document.createElement("ul")

    book.users.forEach(user => {
        const li = document.createElement("li")
        li.innerText = user.username
        ul.append(li)
    })
    return ul

}

function showBookDetail(book) {
    const showPanel = document.getElementById("show-panel")
    let usernames = "";

    console.log(book)
    console.log(book.users)

    book.users.forEach(user => {
        usernames += user.username + ", "
    })

    let bookDetail = `
    <h3>${book.title}</h3>
    <img src="${book.img_url}">
    <p>${book.description}</p>
    <p>Users who have read this book: ${usernames}</p>
    <button onclick="fetchReadBook(${bookID})">Read this book</button>
    `
    // bookDetail += showBookUsers(book)

    showPanel.innerHTML = bookDetail
}

function updateBookReaders(book) {
    fetchUser1(book)
}

function addUserToBook(user1, book){
    book.users.push(user1)
    const newUserArray = book.users

    // fetchAddUserToBook(book, newUserArray)

    fetch(`http://localhost:3000/books/${bookID}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            users: newUserArray
        })
    })
    .then(res => res.json())
    .then(showBookDetail(book))
}
