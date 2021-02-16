/*
 * Display the shelves found in ShelfNames
 *
 * Props:
 * - books: Array of books to be dislayed on each shelf.
 * - onShelfChange: Function to pass new shelf if a book is moved.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ShelfNames from '../config/ShelfNames';
import BookShelf from './BookShelf';

class BookShelves extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired
  }

  render() {
    const { books, onShelfChange } = this.props;

    return (
      <div className="list-books-content">
        <div>
          {ShelfNames.map((shelf) => (
            <div key={shelf.id}>
              <BookShelf
                shelf={shelf}
                books={books.filter((book) => book.shelf === shelf.id)}
                onShelfChange={onShelfChange}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default BookShelves;