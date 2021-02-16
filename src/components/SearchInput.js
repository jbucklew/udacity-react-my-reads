/*
 * Text input that provides search value
 *
 * Props:
 *  - handleSearchValue: Function that is called as input
 *                       receives text.
 */

import React from 'react';
import PropTypes from 'prop-types';

function SearchInput(props) {
  const { handleSearchValue } = props;

  return (
    <div className="search-books-input-wrapper">
      <input autoFocus
        type="text"
        placeholder="Search by title or author"
        onChange={handleSearchValue} />
    </div>
  );
}

SearchInput.propTypes = {
  handleSearchValue: PropTypes.func.isRequired
}

export default SearchInput;