document.addEventListener("DOMContentLoaded", function() {});
// Constant Variable Declaration
const URL = 'http://localhost:3000/books';
const list_Panel_Div = document.querySelector('#list-panel')
const list_UL = document.querySelector('#list-panel #list')
const show_Panel_Div = document.querySelector('#show-panel')
const checkout_Button = document.createElement('button')


// Get a list of books & render them http://localhost:3000/books
fetch(URL)
  .then(resp => resp.json())
  .then(books => {
    console.log(books)
    books.forEach(book => {
      list_UL.innerHTML +=
        `
        <li data-id = ${book.id}>${book.title}</li>
      `
    });
  })
  .catch(err => console.log(err.message))



// Be able to click on a book, you should see the book's title, thumbnail img,description and a list of users who have liked the book.

list_UL.addEventListener('click', event => {
  if (event.target.tagName === 'LI') {
    let li = event.target
    let id = li.dataset.id
    console.log(id)


    fetch(URL)
      .then(resp => resp.json())
      .then(books => {
        books.forEach(book => {
          if (book.id == id) {
            users_List = []
            console.log(book.users);
            book.users.forEach(user => {
              users_List.push(user.username)
            });
            show_Panel_Div.innerHTML = ""
            show_Panel_Div.innerHTML +=
              `
                <h3>${book.title}</h3>
                <img src="${book.img_url}" alt="${book.img_url}">
                <p>${book.description}</p>
                <h5>Users: ${users_List.join(", ")}</h5>
              `
// You can like a book by clicking on a button. You are user 1 {"id":1, "username":"pouros"}, so to like a book send a PATCH request to http://localhost:3000/books/:id with an array of users who like the book. This array should be equal to the existing array of users that like the book, plus your user. For example, if the previous array was "[{"id":2, "username":"auer"}, {"id":8, "username":"goodwin"}], you should send as the body of your PATCH request:

            const checkout_Button = document.createElement('button')
            checkout_Button.textContent = "let pouros borrow book"
            document.body.append(checkout_Button)

            checkout_Button.addEventListener('click', event => {
              event.preventDefault();
              fetch(`http://localhost:3000/books/${id}`, {
                method: "PATCH",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  "users": book.users.concat([{ "id": 1, "username": "pouros" }])
                })
              })
                .then(resp => resp.json())
                .then(data => {
                  console.log(data)

                  users_List.push("pouros")
                  show_Panel_Div.innerHTML = ""
                  show_Panel_Div.innerHTML +=
                    `
                      <h3>${book.title}</h3>
                      <img src="${book.img_url}" alt="${book.img_url}">
                      <p>${book.description}</p>
                      <h5>Users: ${users_List.join(", ")}</h5>
                     `

                })
                .catch(err => console.log(err.message))
            })



          }
        });
      })
      .catch(err => console.log(err.message))

  }
})




// {
// "users": [
//   { "id": 2, "username": "auer" },
//   { "id": 8, "username": "goodwin" },
//   { "id": 1, "username": "pouros" }
// ]
// }
// This route will respond with the updated book json including the list of users who have liked the book.








  // BONUS: Can you make it so a second patch request to the same book removes your user from the list of users ? Can you toggle likes on and off ?






















  // Generate random current user
// const rand_User_Id = Math.floor(Math.random() * 11 + 1);
// let users_List = []
// let current_User;
// fetch('http://localhost:3000/users')
//   .then(resp => resp.json())
//   .then(users => {
//     users.forEach(user => {
//       users_List.push(user)
//     })
//   })
//   .then(data => {
//     users_List.forEach(user => {
//       if (user.id == rand_User_Id) {
//         current_User = user
//       }
//     });
//     console.log(current_User)
//     checkout_Button.textContent = `Let ${current_User.username} borrow book`

//     document.body.append(checkout_Button)

//   })
//   .catch(err => console.log(err.message))
