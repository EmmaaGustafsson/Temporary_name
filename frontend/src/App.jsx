import { useEffect, useState } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    fetch("http://127.0.0.1:8000/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  };

  const addBook = () => {
    fetch("http://127.0.0.1:8000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        author: author,
      }),
    }).then(() => {
      fetchBooks(); 
      setTitle("");
      setAuthor("");
    });
  };

  const deleteBook = (id) => {
    fetch(`http://127.0.0.1:8000/books/${id}`, {
      method: "DELETE",
   }).then(() => {
      fetchBooks();
    });
  };

  const [selectedId, setSelectedId] = useState(null);

  const updateBook = () => {
  fetch(`http://127.0.0.1:8000/books/${selectedId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      author: author,
    }),
  }).then(() => {
    fetchBooks();
    setSelectedId(null);
    setTitle("");
    setAuthor("");
  });
};

  return (
    <div>
      <h1>My Books</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <button onClick={selectedId ? updateBook : addBook}>
        {selectedId ? "Update Book" : "Add Book"}
      </button>

      {books.map((book, index) => (
        <div key={index}>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <button onClick={() => deleteBook(book.id)}>
            Delete
          </button>

          <button onClick={() => {
            setSelectedId(book.id);
            setTitle(book.title);
            setAuthor(book.author);
          }}>
           Edit
          </button>

        </div>
      ))}
    </div>
  );
}

export default App;