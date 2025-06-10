import React, { useState } from 'react';

const RatingComponent = () => {
  const [rating, setRating] = useState(3);       // user-selected rating
  const [submitted, setSubmitted] = useState(false); // if submitted

  const handleClick = (value) => {
    setRating(value);
  };

  const handleSubmit = () => {
    if (rating > 0) {
      console.log('Rating submitted:', rating);
      setSubmitted(true);
      // You can send it to backend or store it here
    } else {
      alert('Please select a rating before submitting.');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Rate this Book</h3>
      <div>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            onClick={() => handleClick(value)}
            style={{
              cursor: 'pointer',
              fontSize: '2rem',
              color: value <= rating ? 'gold' : 'gray',
            }}
          >
            ★
          </span>
        ))}
      </div>
      <button onClick={handleSubmit} style={{ marginTop: '10px' }}>
        Submit Rating
      </button>
      {submitted && <p>Thank you for rating: {rating} stars!</p>}
    </div>
  );
};

export default RatingComponent;
