document.addEventListener("DOMContentLoaded", function() {


    fetch('http://localhost:3000/books')
        .then(res => res.json())
        .then(bookDistributor)

    function bookDistributor(books){
        books.forEach(bookTitles)
    }
    
    function bookTitles(book){
        const ul = document.getElementById('list')
        const li = document.createElement('li')
            li.innerText = book.title 
            li.className = `book`
            li.dataset.id = book.id

            ul.append(li)
    }

// to get access to the book i just did another fetch here and passed it another function that needed access the properties of the book object. 
    const ul = document.getElementById('list')
    ul.addEventListener('click', ()=>{
        if(event.target.classList.contains('book')) {
            fetch(`http://localhost:3000/books/${event.target.dataset.id}`)
                .then(res =>res.json())
                .then(showPanel)
        }
    })
    
    function showPanel(book){
        const showDiv = document.getElementById('show-panel')
            showDiv.innerHTML = `
                <h1><strong>${book.title}</strong></h1>
                <img src="${book.img_url}">
                <p>${book.description}</p>`
                
        const readBtn = document.createElement('button')
            readBtn.className = 'btn'
            readBtn.dataset.id = book.id
            readBtn.innerText = 'Read Book'

            showDiv.append(readBtn)

        readBtn.addEventListener('click', ()=>{
            console.log(book.users)

            let info = {"users": [ //exactly how it would appear in the api
                {"id": 6999, "username": "woooop"}, ...book.users] //spread operator here was key
            }

            fetch(`http://localhost:3000/books/${book.id}`, {
                method: "PATCH", 
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(info)
            }).then(res => res.json())
                .then(theBook => {
                    theBook.users.forEach(user => {
                        const userLi = document.createElement('li')
                        userLi.innerText = user.username
                        showDiv.append(userLi)
                    })
                })

        })    
    }

});
