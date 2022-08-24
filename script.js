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

    //create container div for card
    cardDiv = document.createElement('div');
    cardDiv.classList.add('book');

    //create text elements
    cardTitle = document.createElement('h2');
    cardTitle.classList.add('cardAttribute');
    cardAuthor = document.createElement('h2');
    cardAuthor.classList.add('cardAttribute');
    cardPages = document.createElement('h2');
    cardPages.classList.add('cardAttribute');
    
    //create controls for the car under the following heirarchy (in emmet):
    //.cardControl>(button.readButton+(svg.trashSVG>svgPath))
    cardRead = document.createElement('button');
    cardRead.classList.add('readButton');
    cardRead.setAttribute('data_id', `${index}`);

    cardTrash = document.createElement('img');
    cardTrash.setAttribute('src', 'img/trash-can-outline.png')
    cardTrash.setAttribute('data_id', `${index}`);
    cardTrash.classList.add('trash');
    /*cardSVG = document.createElement('svg');
    cardSVG.setAttribute('style',"width:3rem;height:3rem")
    cardSVG.setAttribute('viewBox',"0 0 24 24")

    svgPath = document.createElement('path');
    svgPath.setAttribute('fill',"black");
    svgPath.setAttribute('d', "M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z");
    */

    cardControl = document.createElement('div');
    cardControl.classList.add('cardControl');

    //cardSVG.appendChild(svgPath);
    cardControl.appendChild(cardRead);
    cardControl.appendChild(cardTrash);
    //cardControl.appendChild(cardSVG);

    //write all pertinent text to elements
    cardTitle.textContent = `TITLE: ${this.title}`;
    cardAuthor.textContent = `AUTHOR: ${this.author}`;
    cardPages.textContent = `PAGES: ${this.pages}`;
    cardRead.textContent = `${this.read}`;

    //append text elements to card
    cardDiv.appendChild(cardTitle);
    cardDiv.appendChild(cardAuthor);
    cardDiv.appendChild(cardPages);
    cardDiv.appendChild(cardControl);

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

    //gather button and trash elements
    trashButtons = document.querySelectorAll('.trash');
    readToggleButtons = document.querySelectorAll('.readButton');

    //add event listener for trash buttons
    trashButtons.forEach(trashButton => {
        trashButton.addEventListener('click', ()=>{
            myLibrary.splice(Number(trashButton.getAttribute('data_id')), 1);
            drawMyLibrary();
        });
    });

    //add event listeners for Read buttons
    readToggleButtons.forEach(readToggleButton => {
        readToggleButton.addEventListener('click', (e)=>{
            e.preventDefault();
            let foo = Number(readToggleButton.getAttribute('data_id'));
            if(myLibrary[foo].read == 'UNREAD'){
                myLibrary[foo].read = 'READ';
                readToggleButton.textContent = 'READ';
            }
            else{
                myLibrary[foo].read = 'UNREAD';
                readToggleButton.textContent = 'UNREAD';
            }
            
        });
    });
}

//adds book to library
function addBookToLibrary() {    
    //check to make sure form is filled out first!

    /*************************/
    /* if form is filled out */
    /*************************/
    if(input_title.value != '' && input_author.value != '' && input_pages.value != ''){
    let newBook = new Book(input_title.value, input_author.value, input_pages.value, checkPlease());
    myLibrary.push(newBook); 
    drawMyLibrary();
    delete newBook; 
    }

    /*****************************/
    /* if form is not filled out */
    /*****************************/
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
         return 'READ';
    }
    else if (!input_read.checked){
        return 'UNREAD';
    }
    else{
        return 'fallback';
    }
}