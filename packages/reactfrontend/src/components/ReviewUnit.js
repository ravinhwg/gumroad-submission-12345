import ReviewStarUnit from "./ReviewStarunit";

export default function ReviewUnit({ rating, ratingText }) {
  return (
    <div className="review-container">
      <div className="star-group">
        <ReviewStarUnit rating={rating} />
      </div>
      <p className="review-text-rating">{rating}</p>
      <p className="review-text-body">, {ratingText}</p>
    </div>
  );
}
