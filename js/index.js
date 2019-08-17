document.addEventListener("DOMContentLoaded", function() {
    const ul = document.getElementById("list")
    const showPanel = document.getElementById("show-panel")
    
// ------------------ReadBooks _____________

    fetch("http://localhost:3000/books")
    .then(res => res.json())
    .then(books => renderBooks(books))

    function renderBooks(books) {
        
        books.forEach(function(book) {
            ul.innerHTML += `
            <li data-id = ${book.id}>${book.title}</li>`
        })
    }

// ------------------EndOfReadBooks------------------

//-----------------ShowPageForBook-------------------

ul.addEventListener('click', fetchBook)

function fetchBook(event){
    const id = event.target.dataset.id

    fetch(`http://localhost:3000/books/${id}`)
    .then(res => res.json())
    .then(showBookInfo)
}

function showBookInfo(book){
    console.log(book);
    showPanel.innerHTML = 
    `
    <img src="${book.img_url}">
    <p>${book.description}</p>
    <button data-id = ${book.id} class="like-btn">Like</button>
    <ul id="users"></ul>`
        
    const ulUsers = document.getElementById("users")
    book.users.forEach(user => {
        
        ulUsers.innerHTML += `
        <li data-id = ${user.id}>${user.username}</li>`
        console.log(ulUsers)
    })
}

//     fetch("http://localhost:3000/books")
//     .then(res => res.json())
//     .then(books => booksShow(books))

//     function booksShow(books) {

//     ul.addEventListener("click", function() {
//         let targetId = event.target.dataset.id 
//         const showPanel = document.getElementById("show-panel")
//         books.forEach(function(book) { 
//         if (targetId == book.id) {
//             showPanel.innerHTML = `
//             <p>${book.description}</p>`
//         }
// })
        
//     })
//     }
//--------------------EndOfShowPageOfBook________________________

//--------------------LikeABook__________________________________

showPanel.addEventListener("click", function() { 
    const likebtn = event.target
    const id = likebtn.dataset.id
    console.log(likebtn.dataset.id)
    
    if (event.target == likebtn) {
        const userInfo = {"id":1, "username":"pouros"}
        fetch(`http://localhost:3000/books/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            users:[
                userInfo
            ]
        })
    })
        .then(res => res.json())
        .then(showBookInfo)

    
    }

})



});
