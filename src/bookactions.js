import React, { Component } from 'react';
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class BookActions extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onMoveShelf: PropTypes.func.isRequired
  };

  state = {
    shelf: ''
  }

  componentDidMount() {
    (!this.props.book.shelf && BooksAPI.get(this.props.book.id).then((fetchedBook) => {
      (this.mounted && this.setState({ shelf: fetchedBook.shelf }));
    }));
  }

  render() {
    const { book, onMoveShelf } = this.props;
    const actions = [
      { value: 'move', label: 'Move to...', enabled: false},
      { value: 'currentlyReading', label: 'Currently Reading', enabled: true},
      { value: 'wantToRead', label: 'Want to Read', enabled: true},
      { value: 'read', label: 'Read', enabled: true},
      { value: 'none', label: 'None', enabled: true}
    ];

    return (
      <div className='book-shelf-changer'>
        <select value={this.state.shelf || book.shelf || ('none')} onChange={(e) => {
            onMoveShelf(book, e);
            this.setState({ shelf: e.target.value });
          }}>
          {actions.map((action) => (
            <option
              key={action.value}
              value={action.value}
              disabled={!action.enabled}
            >{action.label}</option>
          ))}
        </select>
      </div>
    );
  }
}

export default BookActions;