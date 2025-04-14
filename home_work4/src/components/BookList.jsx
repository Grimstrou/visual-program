import React, { useState, useEffect } from "react";
import BookCard from "./BookCard";

const BookList = ({ books }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [sortField, setSortField] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  // Фильтрация и сортировка при изменении запроса или параметров сортировки
  useEffect(() => {
    let result = books.filter((book) =>
      `${book.title} ${book.author}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    result.sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredBooks(result);
  }, [searchQuery, sortField, sortOrder, books]);

  return (
    <div>
      {/* Поле поиска */}
      <input
        type="text"
        placeholder="Поиск по названию или автору..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />

      {/* Выбор сортировки */}
      <div className="sorting">
        <label>
          Сортировать по:
          <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
            <option value="title">Названию</option>
            <option value="author">Автору</option>
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

      {/* Отображение книг */}
      <div className="book-list">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => <BookCard key={index} book={book} />)
        ) : (
          <p>Ничего не найдено</p>
        )}
      </div>
    </div>
  );
};

export default BookList;
