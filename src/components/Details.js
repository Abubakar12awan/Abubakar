import React from 'react';
import { useParams } from 'react-router-dom';

const Details = () => {
  const { title, isbn, quantity, image } = useParams();
  const originalImageUrl = image.replaceAll('---REPLACE---', '/');

  return (
    <div>
      <h1>Details</h1>
      <h1>Title: {title}</h1>
      <h1>ISBN: {isbn}</h1>
      <h1>Quantity: {quantity}</h1>
      <img style={{width:"400px",height:"258px"}} src={originalImageUrl} alt="Book" />
      <h1 >
        You can buy the book <span style={{ color: '#d608e1' }}>{title}</span>. Here is this book that is very popular in the world of Humans.
      </h1>
    </div>
  );
};

export default Details;
