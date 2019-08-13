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

function fetchOneBook(bookID){
    fetch(`http://localhost:3000/books/${bookID}`)
    .then(res => res.json())
    .then(book => showBookDetail(book))
}

function fetchReadBook(bookID){
    fetch(`http://localhost:3000/books/${bookID}`)
    .then(res => res.json())
    .then(book => fetchUser1AndReadBook(book))
}

function fetchUser1AndReadBook(book){
    fetch("http://localhost:3000/users/1")
    .then(res => res.json())
    .then(user1 => addUserToBook(user1, book))
}

function fetchToggleUserReadBook(book, newUserArray){
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

let bookID

function clickOnBook(event){
    if (event.target.dataset.isBookLink){
        bookID = event.target.dataset.id

        fetchOneBook(bookID)
    }
}

function showBookDetail(book) {
    const showPanel = document.getElementById("show-panel")
    let usernames = ""

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

    showPanel.innerHTML = bookDetail
}

function addUserToBook(user1, book){
    let newUserArray = book.users
    const bookUsernames = []

    newUserArray.forEach(user => {
        bookUsernames.push(user.username)
    })

    if (bookUsernames.includes(user1.username) === true){
        book.users.pop()
        newUserArray = book.users

        fetchToggleUserReadBook(book, newUserArray)
    } else {
        book.users.push(user1)
        newUserArray = book.users

        fetchToggleUserReadBook(book, newUserArray)
    }

}
