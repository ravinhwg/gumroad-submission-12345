import ReviewStarUnit from "./ReviewStarunit";

export default function ReviewUnit({ rating, ratingText }) {
  return (
    <div class="review-container">
      <div class="star-group">
        <ReviewStarUnit rating={rating} />
      </div>
      <p class="review-text-rating">{rating}</p>
      <p class="review-text-body">, {ratingText}</p>
    </div>
  );
}
