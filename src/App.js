import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BooksShelf from './bookshelf'
import BookSearch from './booksearch'
import './App.css'

class BooksApp extends Component {
  state = {
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

    (bookToMove.shelf && (sortedBooks[bookToMove.shelf] = sortedBooks[bookToMove.shelf].filter((book) => book.id !== bookToMove.id)));
    (selectedShelf !== 'none' && (sortedBooks[selectedShelf] = sortedBooks[selectedShelf].concat(bookToMove)));
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
