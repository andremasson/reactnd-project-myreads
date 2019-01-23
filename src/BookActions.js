import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * @class
 * @classdesc Componente que muda estante de um livro
 * @prop {object} book       - Livro ao qual esse componente pertence
 * @prop {func} onMoveShelf  - Ação executada ao mover de prateleira
 */
class BookActions extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onMoveShelf: PropTypes.func.isRequired
  };

  render() {
    const { book, onMoveShelf } = this.props;

    /**
     * @description Ações disponíveis para seleção.
     * @member {string} value - Valor da prateleira como armazenada no BD
     * @member {string} label - Nome de exibição
     * @member {bool} enabled - Habilitado para seleção
     */
    const actions = [
      {value: 'move', label: 'Move to...', enabled: false},
      {value: 'currentlyReading', label: 'Currently Reading', enabled: true},
      {value: 'wantToRead', label: 'Want to Read', enabled: true},
      {value: 'read', label: 'Read', enabled: true},
      {value: 'none', label: 'None', enabled: true}
    ];

    /**
     * Componente será visivel somente quando tiver a informação da prateleira.
     */
    return (
      <div className='book-shelf-changer'>
        <select
          value={book.shelf || 'none'}
          onChange={(e) => onMoveShelf(book, e.target.value)}
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