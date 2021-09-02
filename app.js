const searchResultMessage = document.getElementById("results"); //search result message
const errorMessage = document.getElementById("error message"); //error message
const bookContainer = document.getElementById("container"); //book container

//adding event listener to search button
document.getElementById("search-btn").addEventListener("click", () => {
  const searchField = document.getElementById("input-field");
  const search = searchField.value;
  if (search) {
    //if the search field is not empty ,then load data
    searchField.value = "";

    loadBooks(search);
  } else {
    //if the search field is empty display error message
    bookContainer.textContent = "";
    errorMessage.classList.remove("d-none");
    errorMessage.innerText = "Please enter a book name";

    searchResultMessage.classList.add("d-none");
  }
});

//function to load data
const loadBooks = (book) => {
  fetch(`https://openlibrary.org/search.json?q=${book}`)
    .then((res) => res.json())
    .then((data) => displayBook(data));
};

//function to display the books in the UI
const displayBook = (books) => {
  //displays error message if the user types invalid book name
  if (books.numFound === 0) {
    bookContainer.textContent = "";

    errorMessage.classList.remove("d-none");
    errorMessage.innerText = "Please enter the valid name of Book";

    searchResultMessage.classList.remove("d-none");
    searchResultMessage.innerText = `${books.numFound} results found `;
  } else {
    const bookList = books.docs.slice(0, 30);
    errorMessage.classList.add("d-none");
    bookContainer.textContent = "";
    searchResultMessage.classList.remove("d-none");
    searchResultMessage.innerText = `${books.numFound} results found,
    Displaying ${bookList.length} results `;

    //looping through each book and displaying it on the UI
    bookList.forEach((book) => {
      const div = document.createElement("div");
      div.innerHTML = `
      <div class="card h-100">
      <img
        src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg"
        class="card-img-top"
        alt="Image of book"
      />
      <div class="card-body">
        <h5 class="card-title">${book.title}</h5>
        <div class="card-text">
          <p>Name of Author : <span class="fw-bold">${book.author_name}</span></p>
          <p>
            Publisher : <span class="fw-bold">${book.publisher}</span>
          </p>
          <p>First published : <span class="fw-bold">${book.first_publish_year}</span></p>
        </div>
      </div>
    </div>
      
      `;
      bookContainer.appendChild(div);
    });
  }
};
