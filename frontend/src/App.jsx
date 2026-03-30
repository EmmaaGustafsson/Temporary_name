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
    <div style={styles.container}>
      <h1 style={styles.title}>My Books</h1>

      <div style={styles.form}>
        <input
          style={styles.input}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <button style={styles.addButton} onClick={selectedId ? updateBook : addBook}>
          {selectedId ? "Update Book" : "Add Book"}
        </button>
      </div>

      <div style={styles.list}>
        {books.map((book) => (
          <div key={book.id} style={styles.card}>
            <h3>{book.title}</h3>
            <p>{book.author}</p>

            <div style={styles.buttonGroup}>
              <button
                style={styles.editButton}
                onClick={() => {
                  setSelectedId(book.id);
                  setTitle(book.title);
                  setAuthor(book.author);
                }}
              >
                Edit
              </button>

              <button
                style={styles.deleteButton}
                onClick={() => deleteBook(book.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  },

  title: {
    marginBottom: "20px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "30px",
  },

  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  addButton: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  card: {
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    textAlign: "left",
  },

  buttonGroup: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },

  editButton: {
    padding: "6px 10px",
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },

  deleteButton: {
    padding: "6px 10px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};