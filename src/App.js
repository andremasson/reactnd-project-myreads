import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BooksShelf from './bookshelf'
import BookSearch from './booksearch'
import './App.css'

class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  }

  shelves = () => (
    [
      { id: 'currentlyReading', title: 'Currently Reading', mainPage: true },
      { id: 'wantToRead', title: 'Want to Read', mainPage: true },
      { id: 'read', title: 'Read', mainPage: true },
      { id: 'none', title: '', mainPage: false }
    ]
  )

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      let sortedBooks = [];
      this.shelves().map((shelf) => (
        sortedBooks[shelf.id] = books.filter((book) => book.shelf === shelf.id)
      ));
      this.setState({ books: sortedBooks });
    });
  }

  moveToShelf = (bookToMove, event) => {
    let selectedShelf = event.target.value;
    let sortedBooks = this.state.books;

    sortedBooks[bookToMove.shelf] = sortedBooks[bookToMove.shelf].filter((book) => book.id !== bookToMove.id);
    sortedBooks[selectedShelf] = sortedBooks[selectedShelf].concat(bookToMove);
    bookToMove.shelf = selectedShelf;
    this.setState((state) => ({
      books: sortedBooks
    }));
    BooksAPI.update(bookToMove, selectedShelf);
  }

  render() {
    return (
      <div className="app">
        <Route path="/" exact render={() => (
          <BooksShelf
            books={this.state.books}
            onMoveShelf={this.moveToShelf}
            shelves={this.shelves}
          />
        )}/>
        <Route path="/search" render={({ history }) => (
          <BookSearch
            onMoveShelf={this.moveToShelf}
            onNavigationReturn={() => history.push('/') }
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
