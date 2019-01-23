import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Debounce } from 'react-throttle';

/**
 * @class
 * @classdesc Componente de barra de busca
 * @prop {func} onNavigationReturn  - Ação executada ao clicar botão de voltar
 * @prop {func} onUpdateQuery       - Ação executada ao mudar query de busca
 */
class SearchBar extends PureComponent {
  static propTypes = {
    onNavigationReturn: PropTypes.func.isRequired,
    onUpdateQuery: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className="search-books-bar">
        <a className="close-search" onClick={this.props.onNavigationReturn}>Close</a>
        <div className="search-books-input-wrapper">
          <Debounce time="400" handler="onChange">
            <input
              autoFocus
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.props.onUpdateQuery(event.target.value)}
            />
          </Debounce>
        </div>
      </div>
    );
  }
}

export default SearchBar;
