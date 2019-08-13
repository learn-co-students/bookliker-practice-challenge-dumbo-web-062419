document.addEventListener("DOMContentLoaded", function() {

    const ul = document.getElementById('list')
    fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(listBooks)

    function listBooks(booksJson){
        booksJson.forEach(listSingleBook)
    }

    function listSingleBook(book){
        const li = document.createElement('li')
        li.innerText = `${book.title}`
        li.dataset.id = `${book.id}`
        li.className = 'js-click'
        ul.append(li)
    }

    ul.addEventListener('click', function(){
        if(event.target.classList.contains('js-click')){
            const bookId = event.target.dataset.id
            fetch(`http://localhost:3000/books/${bookId}`)
            .then(res => res.json())
            .then(addBookInfo)
        } 
        
    })

    function addBookInfo(bookinfo){
        console.log(bookinfo)
        const infoSection = document.getElementById('show-panel')
        infoSection.innerHTML = `
        <h1>${bookinfo.title}</h1>
        <img src="${bookinfo.img_url}">
        <h3>${bookinfo.description}</h3>
        <p>Likes:</p>
        <ul id="book-${bookinfo.id}">
        </ul>
        <button class="like-${bookinfo.id}">like book</button>
        `
        const likeSection = document.getElementById(`book-${bookinfo.id}`)
        const likes = bookinfo.users


        likes.forEach(postLike)

        function postLike(like){
            console.log(like)
            // const like = likeInfo.users[-1]
            // console.log(likeInfo)
            const user = document.createElement('li')
            user.innerText = `${like.username}`
            // console.log(user)
            likeSection.append(user)
        }

        infoSection.addEventListener('click', function(){
            if(event.target.classList.contains(`like-${bookinfo.id}`)){
                const bookId = bookinfo.id
                const currentUsers = bookinfo.users
                currentUsers.push({"id":1, "username":"pouros"})
                console.log(currentUsers)
                fetch(`http://localhost:3000/books/${bookId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type" : "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        users: currentUsers
                    })
                }).then(res => res.json())
                .then(data => addBookInfo(data))
            }
        })

        // console.log(event.target)
                // fetch(`http://localhost:3000/books/${bookId}/users`, {
                //     method: "Post",
                //     headers: {
                //         "Content-Type" : "application/json",
                //         "Accept": "application/json"
                //     },
                //     body: JSON.stringify({
                //         users: {"id":2, "username":"auer"}
                //     })
                // }).then(res => res.json)
                // .then(console.log)

    }
});
