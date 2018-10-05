import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';

class BookActions extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onMoveShelf: PropTypes.func.isRequired
  };

  state = {
    shelf: ''
  };

  moveShelf(book, event) {
    this.props.onMoveShelf(book, event);
    this.setState({shelf: event.target.value});
  }
  
  componentDidMount() {
    (!this.props.book.shelf && BooksAPI.get(this.props.book.id).then((fetchedBook) => {
      this.setState({shelf: fetchedBook.shelf});
    }));
  }

  render() {
    const { book } = this.props;
    const actions = [
      {value: 'move', label: 'Move to...', enabled: false},
      {value: 'currentlyReading', label: 'Currently Reading', enabled: true},
      {value: 'wantToRead', label: 'Want to Read', enabled: true},
      {value: 'read', label: 'Read', enabled: true},
      {value: 'none', label: 'None', enabled: true}
    ];

    return (
      <div className='book-shelf-changer' style={{visibility: (!this.state.shelf && !book.shelf) ? 'hidden' : ''}} >
        <select
          value={this.state.shelf || book.shelf || ('none')}
          onChange={(e) => this.moveShelf(book, e)}
          >
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