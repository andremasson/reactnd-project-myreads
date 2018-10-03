import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from './bookshelf'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }

  shelves = () => (
    [
      { id: 'currentlyReading', title: 'Currently Reading'},
      { id: 'wantToRead', title: 'Want to Read'},
      { id: 'read', title: 'Read'}
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
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {this.shelves().map((shelf) => (
                  <BookShelf key={shelf.id}
                    title={shelf.title}
                    books={this.state.books[shelf.id]}
                    onMoveShelf={this.moveToShelf}
                  />
                ))}
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
