import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import "../styles.css";

const API_BOOKS = "https://fakeapi.extendsclass.com/books";
const API_COVER = "https://www.googleapis.com/books/v1/volumes?q=isbn:";

const App = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetch(API_BOOKS)
      .then((res) => res.json())
      .then(async (data) => {
        const booksWithCovers = await Promise.all(
          data.map(async (book) => {
            const cover = await fetchCover(book.isbn);
            return { ...book, cover };
          })
        );
        setBooks(booksWithCovers);
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  const fetchCover = async (isbn) => {
    try {
      const res = await fetch(`${API_COVER}${isbn}`);
      const data = await res.json();
      return data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail || "no-cover.png";
    } catch {
      return "no-cover.png";
    }
  };

  // Фильтрация и сортировка
  const filteredBooks = books
    .filter((book) =>
      `${book.title} ${book.authors}`.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  return (
    <div className="app">
      <h1>Библиотека</h1>

      {/* Поле поиска */}
      <input
        type="text"
        placeholder="Поиск по названию или автору..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />

      {/* Сортировка */}
      <div className="sorting">
        <label>
          Сортировать по:
          <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
            <option value="title">Названию</option>
            <option value="authors">Автору</option>
          </select>
        </label>

        <label>
          Порядок:
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">По возрастанию</option>
            <option value="desc">По убыванию</option>
          </select>
        </label>
      </div>

      {/* Вывод книг */}
      <div className="book-list">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard key={book.id} title={book.title} authors={book.authors} cover={book.cover} />
          ))
        ) : (
          <p>Ничего не найдено</p>
        )}
      </div>
    </div>
  );
};

export default App;
