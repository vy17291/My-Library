const addBtn = document.querySelector("#addButton");
const modal = document.querySelector("#myModal");
const addNewBook = document.querySelector("#addNewBook");
const closeBtn = document.querySelector("#closeBtn");

addBtn.addEventListener("click", () => modal.style.display = "block");
closeBtn.addEventListener("click", () => modal.style.display = "none");


const  formName = document.querySelector("#formBookName");
const  formAuthor = document.querySelector("#formBookAuthor");
const  formPages = document.querySelector("#formBookPages");
const  formRead = document.querySelector("#formBookRead");

let library = [];
let newBook;

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

addNewBook.addEventListener("click", () => {
  modal.style.display = "none";
  let formValue = event.target.elements

  newBook = new Book(
    formName.value,
    formAuthor.value,
    formPages.value,
    formRead.value.checked
  )
 
  library.push(newBook);

  console.log(newBook);
  console.log(library);

  renderBook(newBook);
  resetModal();
})

const divContainer = document.querySelector('.container');

function resetModal(){
  formName.value = '';
  formAuthor.value = '';
  formPages.value = '';
  formRead.value.checked = false;
}

function renderBook(book){
  let bookContainerDiv = document.createElement('div');
  bookContainerDiv.classList.add('bookContainer');

  divContainer.appendChild(bookContainerDiv);
  for (const [key, value] of Object.entries(book)){
    let pNode = document.createElement('p')
    if (key === 'title') {
      pNode.innerHTML = value;
      bookContainerDiv.appendChild(pNode);
    }
    if (key === 'author') {
      pNode.innerHTML = 'Author: ' + value;
      bookContainerDiv.appendChild(pNode);
    }
    if (key === 'pages') {
      pNode.innerHTML = 'Page number: ' + value;
      bookContainerDiv.appendChild(pNode);
    }
    if (key === 'read') {
      if (value) {
        pNode.innerHTML = 'Read: Yes'
        bookContainerDiv.appendChild(pNode);
      } else {
        pNode.innerHTML = 'Read: No'
        bookContainerDiv.appendChild(pNode);
      }
     
    }
  }

  let removeBookBtn = document.createElement('button');
  removeBookBtn.innerText = "Remove";
  removeBookBtn.setAttribute('id', 'removeBtn');
  bookContainerDiv.appendChild(removeBookBtn);

  let localDB = JSON.parse(localStorage.getItem("library"))

  removeBookBtn.addEventListener('click', () =>{
    
    bookContainerDiv.remove()
    library.slice(1);
    console.log(library);
    // library.map((value, index) => {
    //       let authorElement = bookContainerDiv.childNodes[1].innerHTML.clide(3);
    //       if(library[index].author === authorElement) {
    //         library.splice(index, 1)
    //         localDB.splice(index, 1)
    //         bookContainerDiv.remove()
    //         // Stringify the localstorage before readding it.
    //         tempLibrary = JSON.stringify(localDB)
    //         localStorage.setItem("library", tempLibrary)
    //     }
    // })
  })
}
  
 
  // Parse the LocalStorage in preparations to remove any books.
  

  // Render Library through Localstorage when page is refreshed.
  function renderLibraryStorage() {
    if(localStorage.library) {
        let getBooks = JSON.parse(localStorage.getItem("library"))
        library = getBooks
        library.map((value) => {
            renderBook(value)
        })
    }
  }

  renderLibraryStorage()





