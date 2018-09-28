import React from 'react';

const Book = props => (
  <div className="book animated zoomIn">
    <div className="book-top">
      <div className="book-cover"
        style={{ backgroundImage: `url(${props.cover})` }}
        onClick={() => window.open(props.details, '_blank')}
      />
      <div className="book-shelf-changer">
        <select onClick={e => props.shelfChanger(e, props.id)} defaultValue={props.shelf}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Continue</option>
          <option value="wantToRead">Wishlist</option>
          <option value="read">Finished</option>
          <option value="none">None</option>
        </select>
      </div>
    </div>
    <div className="book-title">{props.title}</div>
    <div className="book-authors">{props.authors}</div>
  </div>
);

export default Book;