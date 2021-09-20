import { useEffect, useState } from "react";
import starGray from "./assets/star_gray.svg";
import starHalfGray from "./assets/star_half_gray.svg";
import starHalfGrayFlipped from "./assets/star_half_gray_flipped.svg";
import ReviewUnit from "./components/ReviewUnit";
import "./App.css";
import ReviewStarUnit from "./components/ReviewStarunit";
import Modal from "react-modal";

function App() {
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [addNewReviewTouched, setAddNewReviewTouched] = useState(false);
  const [userSelectedRating, setUserSelectedRating] = useState(0);
  const [newUserReview, setNewUserReview] = useState("");
  const [newUserReviewRating, setNewUserReviewRating] = useState(0);

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
  }, [newUserReviewRating]);

  useEffect(() => {
    fetch(`http://127.0.0.1:3000/api/reviews/average`)
      .then((response) => response.json())
      .then((data) => {
        setAverageRating(data.average);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [newUserReviewRating]);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const showStarsOnSelect = (rating) => {
    setAddNewReviewTouched(true);
    setUserSelectedRating(rating);
  };

  const addNewReview = () => {
    if (
      userSelectedRating > 0 &&
      userSelectedRating < 6 &&
      newUserReview.length > 0
    ) {
      fetch(`http://127.0.0.1:3000/api/reviews`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          starCount: userSelectedRating,
          reviewText: newUserReview,
        }),
      })
        .then((response) => response.json()) // parse the response as JSON
        .then((data) => {
          // empty ratings array and make the form ready for another review
          setRatings([]);
          setAddNewReviewTouched(false);
          setUserSelectedRating(0);
          setNewUserReview("");
          setNewUserReviewRating(Math.round(Math.random() * 100000));

          // close the modal
          setModalIsOpen(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Invalid review");
    }
  };

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
                  <ReviewStarUnit rating={averageRating.toFixed(1)} />
                </div>
              </div>
              <button
                class="add-review-button add-review-button-text"
                onClick={() => {
                  setModalIsOpen(true);
                }}
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
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={{
              content: {
                maxWidth: "40%",
                maxHeight: "60%",
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
              },
            }}
            contentLabel="Example Modal"
          >
            <div overlay="overlay_one" class="review-overlay">
              <h2 class="product-name">What's your rating?</h2>
              <p class="rating-text">Rating</p>
              <div class="star-group stars-on-overlay">
                {!addNewReviewTouched ? (
                  <>
                    <img
                      src={starHalfGray}
                      class="star"
                      onClick={() => showStarsOnSelect(0.5)}
                      alt="star"
                    />
                    <img
                      src={starHalfGrayFlipped}
                      class="star"
                      onClick={() => showStarsOnSelect(1)}
                      alt="star"
                    />
                    <img
                      src={starHalfGray}
                      class="star"
                      onClick={() => showStarsOnSelect(1.5)}
                      alt="star"
                    />
                    <img
                      src={starHalfGrayFlipped}
                      class="star"
                      onClick={() => showStarsOnSelect(2)}
                      alt="star"
                    />{" "}
                    <img
                      src={starHalfGray}
                      class="star"
                      onClick={() => showStarsOnSelect(2.5)}
                      alt="star"
                    />
                    <img
                      src={starHalfGrayFlipped}
                      class="star"
                      onClick={() => showStarsOnSelect(3)}
                      alt="star"
                    />{" "}
                    <img
                      src={starHalfGray}
                      class="star"
                      onClick={() => showStarsOnSelect(3.5)}
                      alt="star"
                    />
                    <img
                      src={starHalfGrayFlipped}
                      class="star"
                      onClick={() => showStarsOnSelect(4)}
                      alt="star"
                    />{" "}
                    <img
                      src={starHalfGray}
                      class="star"
                      onClick={() => showStarsOnSelect(4.5)}
                      alt="star"
                    />
                    <img
                      src={starHalfGrayFlipped}
                      class="star"
                      onClick={() => showStarsOnSelect(2)}
                      alt="star"
                    />
                  </>
                ) : (
                  <ReviewStarUnit rating={userSelectedRating} />
                )}
              </div>
              <p class="rating-text">Review</p>
              <textarea
                class="rating-textarea"
                placeholder="Start Typing..."
                onChange={(e) => setNewUserReview(e.target.value)}
              ></textarea>
              <button
                class="add-review-button add-review-button-text overlay-submit"
                onClick={addNewReview}
              >
                Submit review
              </button>
            </div>
          </Modal>
        </div>
      </body>
    </>
  );
}

export default App;
