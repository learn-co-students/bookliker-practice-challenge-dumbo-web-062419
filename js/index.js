document.addEventListener("DOMContentLoaded", function() {

  const ul = document.getElementById('list');
  const showDiv = document.getElementById('show-panel');

  fetch('http://localhost:3000/books')
  .then(res => res.json())
  .then(renderBookList)

  function rendeBook(book){
    let li = document.createElement('li')
    li.dataset.id = book.id
    li.className = 'book-li'
    li.innerText = book.title
    ul.append(li);
  }

  function renderBookList(bookList){
    bookList.forEach(rendeBook)
  }

  function listUsers(book){
    result = book.users.map(function(user){
      return user.username;
    })
    return result.join(', ');
  }

  function showBook(book){
    showDiv.innerHTML = `
      <h3>${book.title}</h3>
      <img src='${book.img_url}'>
      <p>${book.description}</p>
      <button id='like-btn' data-id='${book.id}' class='like-btn'>Like</button>
      <ul>${listUsers(book)}</ul>
    `;

    const likeBtn = showDiv.querySelector("button");
    likeBtn.addEventListener('click', function(){
      let usersLiked = {
              "users": [
                {"id":1, "username":"LGM"},
                ...book.users
              ]
            }
      console.log(usersLiked);
      console.log(event.target.dataset.id);
      fetch(`http://localhost:3000/books/${likeBtn.dataset.id}`,{
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usersLiked)
      })
      .then(res => res.json())
      .then(showBook)
    })
  }

  ul.addEventListener('click', function(){
    if (event.target.classList.contains('book-li')){
      fetch(`http://localhost:3000/books/${event.target.dataset.id}`)
      .then(res => res.json())
      .then(showBook)
    }
  })






















  // end of DOMContentLoaded
});
