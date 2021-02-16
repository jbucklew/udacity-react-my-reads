/*
 * Menu to select on which shelf to put the book.
 *
 * Props:
 *  - shelfId: Default value for menu.  Represents the shelf
 *             on which the book currently sits.
 *  - onShelfMenuChange: Function called when menu values changes.
 *                       The menu value is passed to this function.
 */

import React from 'react';
import PropTypes from 'prop-types';

import ShelfNames from '../config/ShelfNames';

function MoveToMenu(props) {
  const { shelfId, onShelfMenuChange } = props;

  const onChange = (event) => {
    onShelfMenuChange(event.target.value);
  };

  return (
    <select value={shelfId} onChange={onChange}>
      <option value='move' disabled>Move To...</option>
      {ShelfNames.map((shelf) => (
        <option key={shelf.id}
          value={shelf.id}
        >{shelf.title}</option>
      ))}
      <option value='none'>None</option>
    </select>
  );
}

MoveToMenu.propTypes = {
  shelfId: PropTypes.string.isRequired,
  onShelfMenuChange: PropTypes.func.isRequired
}

export default MoveToMenu;