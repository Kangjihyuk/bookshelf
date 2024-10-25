document.addEventListener("DOMContentLoaded", () => {

  getlocalStorage();

  document.dispatchEvent(new Event(RENDER_EVENT));

  const bookFormSubmit = document.querySelector("#bookForm");

  bookFormSubmit.addEventListener("submit", (event) => {

    event.preventDefault();

    addBook();

  });

});

let book = [];

const RENDER_EVENT = "render-book";

console.log(book);

const addBook = () => {

  const title = document.querySelector("#bookFormTitle").value;

  const author = document.querySelector("#bookFormAuthor").value;

  const year = parseInt(document.querySelector("#bookFormYear").value);

  const GeneratedID = GeneratedId();

  const bookObject = generateBookObject(

    GeneratedID,

    title,

    author,

    year,

    false

  );

  book.push(bookObject);

  setlocalStorage();

  document.dispatchEvent(new Event(RENDER_EVENT));

};

const GeneratedId = () => {

  return +new Date();

};

const generateBookObject = (id, title, author, year, isComplete) => {

  return {

    id,

    title,

    author,

    year,

    isComplete,

  };

};

const makeBook = (bookObject) => {

  const textTitle = document.createElement("h3");

  textTitle.innerText = bookObject.title;

  textTitle.setAttribute("data-testid", "bookItemTitle");

  const textAuthor = document.createElement("p");

  textAuthor.innerText = `Penulis: ${bookObject.author}`;

  textAuthor.setAttribute("data-testid", "bookItemAuthor");

  const textYear = document.createElement("p");

  textYear.innerText = `Tahun: ${bookObject.year}`;

  textYear.setAttribute("data-testid", "bookItemYear");

  const buttonContainer = document.createElement("div");

  const finishButton = document.createElement("button");

  finishButton.innerText = "Selesai dibaca";

  finishButton.setAttribute("data-testid", "bookItemIsCompleteButton");

  finishButton.addEventListener("click", () => {

    toggleBookCompleted(bookObject.id);

  });

  const deleteButton = document.createElement("button");

  deleteButton.innerText = "Hapus Buku";

  deleteButton.setAttribute("data-testid", "bookItemDeleteButton");

  deleteButton.addEventListener("click", () => {

    deleteBook(bookObject.id);

  });

  const editButton = document.createElement("button");

  editButton.innerText = "Edit Buku";
  editButton.setAttribute("data-testid","bookItemEditButton")
  buttonContainer.append(finishButton, deleteButton, editButton);

  const container = document.createElement("div");

  container.classList.add("book-item");

  container.setAttribute("data-testid", "bookItem");

  container.setAttribute("databookid", bookObject.id);

  container.append(textTitle, textAuthor, textYear, buttonContainer);

  return container;

};

document.addEventListener(RENDER_EVENT, () => {

  const incomplete = document.querySelector("#incompleteBookList");

  incomplete.innerHTML = "";

  const complete = document.querySelector("#completeBookList");

  complete.innerHTML = "";

  for (const bookItem of book) {

    const bookElement = makeBook(bookItem);

    if (!bookItem.isCompleted) {

      incomplete.append(bookElement);

      setlocalStorage();

    } else {

      complete.append(bookElement);

      setlocalStorage();

    }

  }

});

const deleteBook = (bookId) => {

  const bookIndex = book.findIndex((item) => item.id == bookId);

  if (bookIndex !== -1) {

    book.splice(bookIndex, 1);

    setlocalStorage();

    document.dispatchEvent(new Event(RENDER_EVENT));

  }

};

const toggleBookCompleted = (bookId) => {

  const bookTarget = findBook(bookId);

  if (bookTarget) {

    bookTarget.isCompleted = !bookTarget.isCompleted;

    setlocalStorage();

    document.dispatchEvent(new Event(RENDER_EVENT));

  }

};

const findBook = (bookId) => {

  return book.find((item) => item.id == bookId);

};

const setlocalStorage = () => {

  localStorage.setItem("book", JSON.stringify(book));

};

const getlocalStorage = () => {

  let data = JSON.parse(localStorage.getItem("book"));

  book = data || [];

};

