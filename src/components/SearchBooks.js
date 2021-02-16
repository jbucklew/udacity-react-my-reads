/*
 * Search books using a text input.  Shows list of books available
 * as search terms are entered.
 *
 * Props:
 *  - currShelvesStatus: Object containing a property for each shelf
 *                       that is an array of books ids currently on
 *                       the shelf.  ex {read: [id1, id2]}
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as BooksAPI from '../BooksAPI';

import ShelfNames from '../config/ShelfNames';
import SearchInput from './SearchInput';
import BookShelf from './BookShelf';

class SearchBooks extends Component {
  static propTypes = {
    currShelvesStatus: PropTypes.object.isRequired,
    onShelfChange: PropTypes.func.isRequired
  }

  // books represents books found using search term.
  state = {
    books: [],
  }

  // Used this blog post to implement the debounce function
  // https://chrisboakes.com/how-a-javascript-debounce-function-works/
  debounce(callback, wait) {
    let timeout;
    return (...args) => {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => callback.apply(context, args), wait);
    };
  }

  // wait for 500 ms before searching
  handleSearchValue = this.debounce(function(event) {
    const value = event.target.value;
    value ? this.searchBooks(value) : this.setState({ books: [] });
  }, 500);

  searchBooks = (value) => {
    BooksAPI.search(value)
      .then((books) => {
        if (books && books.error) {
          this.setState({ books: [] });
        } else {
          books = this.updateShelf(books);
          this.setState({ books: books });
        }
      });
  }

  updateShelf(books) {
    books.forEach(book => {
      // using every to break from loop once book is found
      ShelfNames.every(shelf => {
        if (this.props.currShelvesStatus[shelf.id].includes(book.id)) {
          book.shelf = shelf.id;
          return false;
        }
        return true;
      });
    });
    return books;
  }

  // update our searched copy of the book with the new shelf, then
  // pass the changes on to onShelfChange so our bookshelf can be
  // updated.
  handleOnShelfChange = (book, shelfId) => {
    const idx = this.state.books.findIndex(currBook => currBook.id === book.id);
    if (idx > -1) {
      // make copy of state array so we can change it and use
      // this new array to set the state
      const books = this.state.books.slice();
      books[idx].shelf = shelfId;
      this.setState({ books: books });

      this.props.onShelfChange(book, shelfId);
    }
  }

  render() {
    // Re-using Bookshelf which requires a shelf id and shelf title,
    // but since we are searching, there will only be one empty shelf
    // with no title
    const shelf = { id: 'all', title: '' };

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to='/'>Close</Link>

          <SearchInput
            handleSearchValue={(e) => {e.persist(); this.handleSearchValue(e)}} />
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <BookShelf
              shelf={shelf}
              books={this.state.books}
              onShelfChange={this.handleOnShelfChange} />
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;