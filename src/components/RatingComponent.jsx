import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const RatingComponent = ({ onChaneHandel, userRating, }) => {
  const [rating, setRating] = useState(0);


  const handleRatingChange = (value) => {
    setRating(value);
    onChaneHandel(value);
    toast.success(`You rated this book ${value} stars!`);
  }

  useEffect(() => {
    if (userRating) {
      setRating(userRating);
    }
  }
    ,);





  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Rate this Book</h3>
      <div>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            onClick={() => handleRatingChange(value)}
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

    </div>
  );
};

export default RatingComponent;
