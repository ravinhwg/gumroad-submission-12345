import { useEffect, useState } from "react";
import starGray from "./assets/star_gray.svg";
import ReviewUnit from "./components/ReviewUnit";
import "./App.css";
import ReviewStarUnit from "./components/ReviewStarunit";

function App() {
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    fetch(`http://127.0.0.1:3000/api/reviews`)
      .then((response) => response.json())
      .then((data) => {
        const ratings = data.reviews.map((review) => {
          return {
            rating: review.star_count,
            ratingText: review.review_text,
          };
        });
        setRatings(ratings);
      });
  }, []);

  useEffect(() => {
    fetch(`http://127.0.0.1:3000/api/reviews/average`)
      .then((response) => response.json())
      .then((data) => {
        setAverageRating(data.average);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <head>
        <title>gummy-reviews</title>
      </head>
      <body>
        <div class="container">
          <div>
            <h1 class="product-name">The Minimalist Entrepreneur</h1>
          </div>
          <div>
            <div class="overviewContainer">
              <div class="innerOverviewContainer">
                <p class="avg-rating">{averageRating.toFixed(1)}</p>
                <div class="star-group avg-rating-stars">
                  <ReviewStarUnit rating={averageRating} />
                </div>
              </div>
              <button
                class="add-review-button add-review-button-text"
                onclick="openOverlay()"
              >
                Add review
              </button>
            </div>
            <hr />
          </div>
          <div class="reviews-container">
            <h2 class="reviews">Reviews</h2>
            <div class="reviews-container-inner">
              {ratings.map(({ rating, ratingText }) => {
                return <ReviewUnit rating={rating} ratingText={ratingText} />;
              })}
            </div>
          </div>
          <div overlay="overlay_one" class="review-overlay">
            <h2 class="product-name">What's your rating?</h2>
            <p class="rating-text">Rating</p>
            <div class="star-group stars-on-overlay">
              <img
                src={starGray}
                class="star"
                onclick="showStarsOnSelect(1)"
                alt="star"
              />
              <img
                src={starGray}
                class="star"
                onclick="showStarsOnSelect(2)"
                alt="star"
              />
              <img
                src={starGray}
                class="star"
                onclick="showStarsOnSelect(3)"
                alt="star"
              />
              <img
                src={starGray}
                class="star"
                onclick="showStarsOnSelect(4)"
                alt="star"
              />
              <img
                src={starGray}
                class="star"
                onclick="showStarsOnSelect(5)"
                alt="star"
              />
            </div>
            <p class="rating-text">Review</p>
            <textarea
              class="rating-textarea"
              placeholder="Start Typing..."
            ></textarea>
            <button
              class="add-review-button add-review-button-text overlay-submit"
              onclick="validateAndSendRating()"
            >
              Submit review
            </button>
          </div>
        </div>
        <script src="/app.js"></script>
      </body>
    </>
  );
}

export default App;
