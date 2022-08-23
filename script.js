//gather input elements
let input_title = document.getElementById("title");
let input_author = document.getElementById("author");
let input_pages = document.getElementById("pages");
let input_read = document.getElementById("readStatus");
let form = document.getElementById("masterForm");
let library_container = document.getElementById("libraryContainer");

//define library array
let myLibrary = [];

//constructor for Book
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//draws the card and saves id "indexAT_<NUMBER>" pointing to index of child object in array
Book.prototype.drawCard = function (index) {

    //create all pertinent elements for card
    cardDiv = document.createElement('div');
    cardDiv.classList.add('book');
    cardDiv.setAttribute('id', `indexAt_${index}`);
    cardTitle = document.createElement('h2');
    cardTitle.classList.add('cardAttribute');
    cardAuthor = document.createElement('h2');
    cardAuthor.classList.add('cardAttribute');
    cardPages = document.createElement('h2');
    cardPages.classList.add('cardAttribute');
    cardRead = document.createElement('h2');
    cardRead.classList.add('cardAttribute');

    //write all pertinent text to elements
    cardTitle.textContent = `TITLE: ${this.title}`;
    cardAuthor.textContent = `AUTHOR: ${this.author}`;
    cardPages.textContent = `PAGES: ${this.pages}`;
    cardRead.textContent = `READ: ${this.read}`;

    //append text elements to card
    cardDiv.appendChild(cardTitle);
    cardDiv.appendChild(cardAuthor);
    cardDiv.appendChild(cardPages);
    cardDiv.appendChild(cardRead);

    //append card to container
    library_container.appendChild(cardDiv);
}

//draws the library using the myLibrary array
let drawMyLibrary = function (){
    //clear existing DIVs in library
    while (library_container.firstChild) {
        library_container.removeChild(library_container.firstChild);
    }

    //draw the objects in the array as DIVs
    for(let i = 0; i < myLibrary.length; i++){
        myLibrary[i].drawCard(i);
    }
}

//adds book to library
function addBookToLibrary() {    
    if(input_title.value != '' && input_author.value != '' && input_pages.value != ''){
    //create new book object
    let newBook = new Book(input_title.value, input_author.value, input_pages.value, checkPlease());

    //add new book object to array
    myLibrary.push(newBook);

    //add book card to DOM
    //newBook.drawCard();
    drawMyLibrary();
    }
    else{
        alert('Please make sure to fill out all book information!')
    }
}

//run it on submit!
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    addBookToLibrary();
    clearForm();
});

//clears the form -- to be used on submit
function clearForm(){
    input_title.value = '';
    input_author.value = '';
    input_pages.value = '';
    input_read.value = 'off';
}

//processes checkbox output to usable string for Book constructor
function checkPlease(){
    if (input_read.checked){
         return 'yes';
    }
    else if (!input_read.checked){
        return 'no';
    }
    else{
        return 'fallback';
    }
}