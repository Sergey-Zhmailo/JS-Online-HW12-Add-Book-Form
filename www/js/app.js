// Class Book
class Book {
    constructor(title, autor, id) {
        this.title = title;
        this.autor = autor;
        this.id = id;
    }
}


let mainForm = document.forms['addBookForm'];

// Get book-list
const list = document.querySelector('.book-list tbody');

// Class UI
class  UI {
    addBookToList(book) {

        // Create markup
        const tr = `
        <tr>
            <td>${book.title}</td>
            <td>${book.autor}</td>
            <td>${book.id}</td>
            <td>
                <button class="waves-effect waves-primary btn right delete"><i class="small material-icons right delete">clear</i>Delete</button>
            </td>
        </tr>
        `;

        list.insertAdjacentHTML('beforeend', tr);
    }

    showAlert(message, type) {

        // Create markup
        const alert = `
    <div class="card alert ${type === 'error' ? 'red darken-4' : 'green darken-4'}">
        <div class="card-content white-text">
          <span class="card-title">${type === 'error' ? 'Error' : 'Success'}</span>
          <p>${message}</p>
        </div>
      </div>`;

        // Get title
        const cardTitle = document.querySelector('.card-title');
        // Get add book btn
        const btn = document.querySelector('form button');
        // Disabled btn
        btn.disabled = true;

        // Insert alert
        cardTitle.insertAdjacentHTML('afterend', alert);

        let timeout = setTimeout(function () {
           document.querySelector('.alert').remove();
           btn.disabled = false;
        }, 3000);
    };
}

// Class Local Storage
class Store {
    getBooks() {
        let books;
        if (!localStorage.getItem('books')) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    addBook(book) {
        // Get from local storage
        const books = this.getBooks();
        // Add new book
        books.unshift(book);
        // Save local storage
        localStorage.setItem('books', JSON.stringify(books));

    }

    deleteBook(bookId) {
        const books = this.getBooks();
        for (let i = 0; i < books.length; i++) {
            if (books[i].id == bookId) {
                books.splice(i, 1);
                localStorage.setItem('books', JSON.stringify(books));
            }
        }
    }
}
// Event DOM Content loaded
document.addEventListener('DOMContentLoaded', function (e) {
    // Создаем экземпляр класса Store
    const store = new Store();
    // Create UI
    const ui = new UI();
    // Получаем все книги из хранилища
    const books = store.getBooks();
    // Добавляем книги из храниллища в разметку
    books.forEach(book => ui.addBookToList(book));
});


// Event submit
document.forms['addBookForm'].addEventListener('submit', function (e) {
    e.preventDefault();
    // Get form values
    const title = this.elements['book_Title'].value,
          author = this.elements['book_Autor'].value,
          id = this.elements['book_id'].value;

    // Create book
    const book = new Book(title, author, id);

    // Create UI
    const ui = new UI();

    // Get store
    const store = new Store();

    // Validate
    if (title === "" || author === "" || id === "") {
        // Show error
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        // Add book to UI
        ui.addBookToList(book);
        // Show success
        ui.showAlert('Book added!', 'success');
        // Add book to local storage
        store.addBook(book);
        mainForm.reset();
    }
});

// Event delete
list.addEventListener('click', function (e) {
    const store = new Store();
    const ui = new UI();

    if (e.target.classList.contains('delete')) {
        const row = e.target.closest('tr');
        const id = e.target.closest('td').previousElementSibling.innerText;
        const autor = row.childNodes[3].innerText;
        const title = row.childNodes[1].innerText;
        result = confirm('Do you want to delete the book ' + title + ' by autor ' + autor + '?');
        if (result) {
            row.remove();
            store.deleteBook(id);
            ui.showAlert('Book deleted successfully', 'success');
        }
    }
});