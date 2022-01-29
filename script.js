//==============Toggle Form=================

const addBook= document.getElementById("add-book");
      formClose= document.getElementById("btn-close");
      bookForm=document.getElementById("book-form");

if(addBook){
    addBook.addEventListener("click",()=>{
        bookForm.classList.remove("d-none");
    })
};

if(formClose){
    formClose.addEventListener("click",()=>{
        bookForm.classList.add("d-none");
    })
}

//Book Class

class Book{
    constructor(title,author,isbn){
        this.title=title,
        this.author=author,
        this.isbn=isbn
    }
}

//UI Class

class UI{
    static displayBooks(){
        const storedBooks=Store.getBooks();

        const books= storedBooks;

        books.forEach((book)=> UI.addBookToList(book));
    }

    static addBookToList(book){
        const list= document.querySelector("#book-list");

        const row= document.createElement("tr");

        row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static clearFields(){
        document.querySelector("#title").value="";
        document.querySelector("#author").value="";
        document.querySelector("#isbn").value="";
    }

    static removeBook(el){
        if(el.classList.contains("delete")){
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className){
        const div= document.createElement("div");
        div.className =`alert alert-${className} mt-4`;
        div.appendChild(document.createTextNode(message));

        const container= document.querySelector(".container");
        const form= document.querySelector("#book-form");
        container.insertBefore(div,form);

        setTimeout(()=> document.querySelector(".alert").remove(),2000)
    }
}

// Store Class
class Store{
    static getBooks(){
        let books
        if(localStorage.getItem("books")===null){
            books=[];
        }else{
            books=JSON.parse(localStorage.getItem("books"));
        }
        return books
    }

    static addBook(book){
        let books= Store.getBooks();
        books.push(book);
        localStorage.setItem("books",JSON.stringify(books));
    }

    static removeBook(isbn){
        let books= Store.getBooks();

        books.forEach((book,index)=>{
            if(book.isbn===isbn){
                books.splice(index,1);
            }
        });

        localStorage.setItem("books",JSON.stringify(books));
    }
}
//Event: Display Book
document.addEventListener("DOMContentLoaded", UI.displayBooks);

//Event: Add a Book

document.querySelector("#book-form").addEventListener("submit",(e)=>{
    e.preventDefault()//Prevents submitting form
    const title= document.querySelector("#title").value;
    const author= document.querySelector("#author").value;
    const isbn= document.querySelector("#isbn").value;

    if(title===""||author===""||isbn===""){
        UI.showAlert("Please fill in all fields", "danger");
    }else{
        const book= new Book(title,author,isbn);

        UI.addBookToList(book);

        Store.addBook(book);

        UI.showAlert("Book added to list.", "success");

        UI.clearFields();
    };

    
})

//Event:Delete a Book
document.querySelector("#book-list").addEventListener("click",(e)=>{
    UI.removeBook(e.target);

    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    UI.showAlert("Book removed", "success")
})








