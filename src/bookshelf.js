import React, { Component } from 'react';
import PropTypes from 'prop-types'

class BookShelf extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array,
    onMoveShelf: PropTypes.func.isRequired
  };

  render() {
    const { title, books, onMoveShelf } = this.props;
    const actions = [
      { value: 'move', label: 'Move to...', prop: 'disabled'},
      { value: 'currentlyReading', label: 'Currently Reading', prop: ''},
      { value: 'wantToRead', label: 'Want to Read', prop: ''},
      { value: 'read', label: 'Read', prop: ''},
      { value: 'none', label: 'None', prop: ''}
    ];

    return (
      <div className='bookshelf'>
        <h2 className='bookshelf-title'>{title}</h2>
        <div className='bookshelf-books'>
          <ol className='books-grid'>
            {books && books.map((book) => (
              <li key={book.id}>
                <div className='book'>
                  <div className='book-top'>                    
                    <div className='book-cover' style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})` }} />
                    <div className='book-shelf-changer'>
                      <select value={book.shelf} onChange={(e) => onMoveShelf(book, e)}>
                        {actions.map((action) => (
                          <option 
                            key={action.value}
                            value={action.value}
                          >{action.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className='book-title'>{book.title}</div>
                  <div className='book-authors'>
                    {book.authors.map((author, index) => (
                      <span key={index}>{author}<br/></span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;