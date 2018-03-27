// --- Constructor
// ---------------------

// Book
function Book (title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
};

// UI
function UI () {};

// --- Methods
// ---------------------

// Add book to list
UI.prototype.handleAddBook = function (book) {
  // Get #book-list
  var list = document.getElementById('book-list');
  // Create new <tr>
  var row = document.createElement('tr');
  // Insert data
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;
  // Append list to row
  list.appendChild(row);
};

// Clear fields
UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};

// Show alert
UI.prototype.showAlert = function (message, className) {
  // Create new <div>
  var div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get parent
  var container = document.querySelector('.container');
  // Get form
  var form = document.querySelector('#book-form');
  // Insert alert
  container.insertBefore(div, form);
  // Timeout after 3 seconds
  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 3000);
};

// Delete book
UI.prototype.deleteBook = function (target) {
  // Check for class name
  if (target.className === 'delete') {
    // Remove book
    target.parentElement.parentElement.remove();
  }
};

// --- Events
// ---------------------

// On submit
document.getElementById('book-form').addEventListener('submit', function (e) {
  // Prevent default behaviour
  e.preventDefault();
  // Get form values
  var title = document.getElementById('title').value,
      author = document.getElementById('author').value,
      isbn = document.getElementById('isbn').value;
  // Instantiate book
  var book = new Book(title, author, isbn);
  // Instantiate UI
  var ui = new UI();
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
document.getElementById('book-list').addEventListener('click', function (e) {
  e.preventDefault();

  var ui = new UI();
  //Delete book
  ui.deleteBook(e.target);
  ui.showAlert('Book removed.', 'success')
});
