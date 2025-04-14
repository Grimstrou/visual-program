import React from "react";

const BookCard = ({ title, authors, cover }) => {
  return (
    <div className="book-card">
      <img src={cover} alt={title} className="book-image" />
      <h3>{title}</h3>
      <p>{authors}</p>
    </div>
  );
};

export default BookCard;
