import React from 'react';

import { Card, CardActions, CardMedia, RaisedButton } from 'material-ui';

function Book({ book, owner, request, remove }) {
  return (
    <Card
      key={book.id}
      style={{
        display: 'inline-block',
        margin: '5px',
        width: '200px',
      }}
    >
      <CardMedia>
        <img src={book.imgUrl} alt={`${book.title} book cover`} />
      </CardMedia>
      <CardActions>
        <RaisedButton
          onTouchTap={request}
          label="Request Trade"
          primary
          disabled={!!book.requestedForTradeBy || owner}
        />

        {owner && <RaisedButton
          style={{ marginTop: '5px' }}
          onTouchTap={remove}
          label="Remove Book"
          secondary
        />}
      </CardActions>
    </Card>
  );
}

export default Book;