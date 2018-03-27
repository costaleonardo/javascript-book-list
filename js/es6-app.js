// --- Constructor
// ---------------------

// Book
class Book {
  constructor (title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
};

// UI
class UI {
  // Add book to list
  handleAddBook (book) {
    // Get #book-list
    const list = document.getElementById('book-list');
    // Create new <tr>
    const row = document.createElement('tr');
    // Insert data
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>
    `;
    // Append list to row
    list.appendChild(row);
  }
  // Clear fields
  clearFields () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
  // Show alert
  showAlert (msg, className) {
    // Create new <div>
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(msg));
    // Get parent
    const container = document.querySelector('.container');
    // Get form
    const form = document.querySelector('#book-form');
    // Insert alert
    container.insertBefore(div, form);
    // Timeout after 3 seconds
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);
  }
  // Delte book
  deleteBook (target) {
    // Check for class name
    if (target.className === 'delete') {
      // Remove book
      target.parentElement.parentElement.remove();
    }
  }
};

// --- Events
// ---------------------

// On submit
document.getElementById('book-form').addEventListener('submit', e => {
  // Prevent default behaviour
  e.preventDefault();
  // Get form values
  const title = document.getElementById('title').value,
      author = document.getElementById('author').value,
      isbn = document.getElementById('isbn').value;
  // Instantiate book
  const book = new Book(title, author, isbn);
  // Instantiate UI
  const ui = new UI();
  // Validate
  if (title === '' || author === '' || isbn === '') {
    // Render show alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add book to list
    ui.handleAddBook(book);
    // Render success message
    ui.showAlert('Book added.', 'success');
    // Clear fields
    ui.clearFields();
  }
});

// On click
document.getElementById('book-list').addEventListener('click', e => {
  e.preventDefault();

  const ui = new UI();
  //Delete book
  ui.deleteBook(e.target);
  ui.showAlert('Book removed.', 'success')
});
