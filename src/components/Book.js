/*
 * Display a book, including it's background image, title and authors if
 * available.  A menu is also provided to allow the book to be added or removed
 * from a shelf or changing shelves.
 *
 * Props:
 * - book: An object representing a book with at least an id and title
 *         properties.  The imageLinks and authors arrays are optional.
 * - onShelfChange: Function to pass new shelf if a book is moved.
 */

import React from 'react';
import PropTypes from 'prop-types';

import MoveToMenu from './MoveToMenu';

function Book(props) {
  const { book, onShelfChange } = props;

  const onShelfMenuChange = (shelf) => {
    if (shelf !== book.shelf) {
      onShelfChange(book, shelf);
    }
  }

  const getBackgroundImage = (book) => {
    if (book.imageLinks && book.imageLinks['smallThumbnail']) {
      return book.imageLinks['smallThumbnail'];
    }
    return '';
  }

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover"
             style={{ width: 128,
                      height: 193,
                      backgroundImage: `url("${getBackgroundImage(book)}")`
                    }}>
        </div>
        <div className="book-shelf-changer">
          <MoveToMenu shelfId={book.shelf || 'none'}
                      onShelfMenuChange={onShelfMenuChange} />
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      {book.authors !== undefined && book.authors.map((author, idx) => (
        <div key={idx} className="book-authors">{author}</div>
      ))}
    </div>
  );
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onShelfChange: PropTypes.func.isRequired
}

export default Book;