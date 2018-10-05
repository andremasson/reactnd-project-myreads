import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BooksShelf from './BookShelf';
import BookSearch from './BookSearch';
import './App.css';

class BooksApp extends Component {
  state = {
    books: []
  };

  shelves = () => (
    [
      {id: 'currentlyReading', title: 'Currently Reading'},
      {id: 'wantToRead', title: 'Want to Read'},
      {id: 'read', title: 'Read'}
    ]
  );

  updateBookShelf() {
    BooksAPI.getAll().then((books) => {
      let sortedBooks = [];
      this.shelves().map((shelf) => sortedBooks[shelf.id] = books.filter((book) => book.shelf === shelf.id));
      this.setState({ books: sortedBooks });
    });
  }

  componentDidMount() {
    this.updateBookShelf();
  }

  moveToShelf(bookToMove, event) {
    let selectedShelf = event.target.value;
    BooksAPI.update(bookToMove, selectedShelf).then(() => this.updateBookShelf());
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
            onNavigationReturn={() => history.push('/')}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp;
