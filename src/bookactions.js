import React, { Component } from 'react';
import PropTypes from 'prop-types'

class BookActions extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onMoveShelf: PropTypes.func.isRequired
  };

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
        <select value={book.shelf} onChange={(e) => onMoveShelf(book, e)}>
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