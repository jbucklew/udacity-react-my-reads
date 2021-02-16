/*
 * Display books assigned to a single shelf.  For example the 'Read' shelf
 * will show only books that have a shelf of read.
 *
 * Props:
 * - shelf: Object containing the shelf.title
 * - books: Array of books for this shelf only
 * - onShelfChange: Function to pass new shelf if a book is moved.
 */

import React from 'react';
import PropTypes from 'prop-types';

import Book from './Book';

function BookShelf(props) {
  const { shelf, books, onShelfChange } = props;

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books && books.map((book) => (
            <li key={book.id}>
             <Book book={book}
                   onShelfChange={onShelfChange} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

BookShelf.propTypes = {
  shelf: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired
};

export default BookShelf;