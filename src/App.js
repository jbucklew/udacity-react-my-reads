/*
 * Display the list of shelves with books assigned to each shelf.
 * Link provided so users can search for new books.
 *
 */

import React from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';

import * as BooksAPI from './BooksAPI';

import ShelfNames from './config/ShelfNames';
import BookShelves from './components/BookShelves';
import SearchBooks from './components/SearchBooks';

class BooksApp extends React.Component {
  // Books is the list of books with information about each book.
  // Shelves is a list of shelves with an array of book ids on each
  // shelf.
  state = {
    books: [],
    shelves: {}
  }

  onShelfChange = (book, shelfId) => {
    // update book shelf on server
    BooksAPI.update(book, shelfId)
      .then((response) => {
        const idx = this.state.books.findIndex(currBook => currBook.id === book.id);
        if (idx > -1) {
          // If book already on shelf, update
          this.updateBookShelf(response, idx, shelfId);
        } else {
          // Book not on shelf.  Add it.
          this.addBookToShelf(response, book, shelfId);
        }
      });
  }

  updateBookShelf(response, idx, shelfId) {
    // make copy of state array to update before setting state
    const books = this.state.books.slice();

    if (shelfId in response && response[shelfId].includes(this.state.books[idx].id)) {
      // book was added to shelf or changed shelfs
      books[idx].shelf = shelfId;
      this.setState({ books: books });

    } else if (shelfId.toLowerCase() === 'none') {
      // book was removed from shelf
      books.splice(idx, 1);
      this.setState({ books: books });
    }

    // response contains all shelf names each with an array of book ids that
    // are on that shelf.  Can update our shelves state with response.
    this.setState({
      shelves: response
    });
  }

  addBookToShelf(response, book, shelfId) {
    // book not on any shelf, add new book
    if (shelfId in response && response[shelfId].includes(book.id)) {
      this.setState((currState) => ({
        books: currState.books.concat([book])
      }));
    }

    // response contains all shelf names each with an array of book ids that
    // are on that shelf.  Can update our shelves state with this response.
    this.setState({
      shelves: response
    });
  }

  // build and set our initial shelves state from the books on our
  // initial page load.
  setShelvesState(books) {
    let shelves = {};
    ShelfNames.forEach((shelf) => shelves[shelf.id] = []);

    books.forEach((book) => shelves[book.shelf].push(book.id));
    this.setState({shelves: shelves});
  }

  // load books to display on our shelves
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setShelvesState(books);
        this.setState({books: books});
      });
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchBooks currShelvesStatus={this.state.shelves}
                       onShelfChange={this.onShelfChange} />
        )} />

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <BookShelves books={this.state.books}
              onShelfChange={this.onShelfChange} />

            <div className="open-search">
              <Link
                className='open-search'
                to='/search'>
                Add a Book
              </Link>
            </div>
          </div>
        )} />

      </div>
    );
  }
}

export default BooksApp;
