import { useEffect, useState } from "react";
import starHalfGray from "./assets/star_half_gray.svg";
import starHalfGrayFlipped from "./assets/star_half_gray_flipped.svg";
import ReviewUnit from "./components/ReviewUnit";
import "./App.css";
import ReviewStarUnit from "./components/ReviewStarunit";
import Modal from "react-modal";
const API_URL = `http://127.0.0.1:3000/api`;

Modal.setAppElement("#root");
function App() {
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [addNewReviewTouched, setAddNewReviewTouched] = useState(false);
  const [userSelectedRating, setUserSelectedRating] = useState(0);
  const [newUserReview, setNewUserReview] = useState("");
  const [newUserReviewRating, setNewUserReviewRating] = useState(0);

  useEffect(() => {
    fetch(`${API_URL}/reviews`)
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
    document.title = `Gummy Reviews`;
  }, []);

  useEffect(() => {
    let interval = setInterval(
      () => setNewUserReviewRating(Math.round(Math.random() * 100000)),
      1000 * 2
    );
    //destroy interval on unmount
    return () => clearInterval(interval);
  });
  useEffect(() => {
    fetch(`${API_URL}/reviews/average`)
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
      fetch(`${API_URL}/reviews`, {
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
    <div className="container">
      <div>
        <h1 className="product-name">The Minimalist Entrepreneur</h1>
      </div>
      <div>
        <div className="overviewContainer">
          <div className="innerOverviewContainer">
            <p className="avg-rating">{averageRating.toFixed(1)}</p>
            <div className="star-group avg-rating-stars">
              <ReviewStarUnit rating={averageRating.toFixed(1)} />
            </div>
          </div>
          <button
            className="add-review-button add-review-button-text"
            onClick={() => {
              setModalIsOpen(true);
            }}
          >
            Add review
          </button>
        </div>
        <hr />
      </div>
      <div className="reviews-container">
        <h2 className="reviews">Reviews</h2>
        <div className="reviews-container-inner">
          {ratings.map(({ rating, ratingText }, key) => {
            return (
              <ReviewUnit rating={rating} ratingText={ratingText} key={key} />
            );
          })}
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            maxWidth: "40%",
            width: "40%",
            maxHeight: "60%",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
          },
        }}
        contentLabel="Example Modal"
      >
        <div overlay="overlay_one" className="review-overlay">
          <h2 className="product-name">What's your rating?</h2>
          <p className="rating-text">Rating</p>
          <div className="star-group stars-on-overlay">
            {!addNewReviewTouched ? (
              <>
                <img
                  src={starHalfGray}
                  className="star"
                  style={{
                    marginRight: -0.6 * starHalfGray.width,
                  }}
                  onClick={() => showStarsOnSelect(0.5)}
                  alt="star"
                />
                <img
                  src={starHalfGrayFlipped}
                  className="star"
                  onClick={() => showStarsOnSelect(1)}
                  alt="star"
                />
                <img
                  src={starHalfGray}
                  className="star"
                  onClick={() => showStarsOnSelect(1.5)}
                  alt="star"
                />
                <img
                  src={starHalfGrayFlipped}
                  className="star"
                  onClick={() => showStarsOnSelect(2)}
                  alt="star"
                />
                <img
                  src={starHalfGray}
                  className="star"
                  onClick={() => showStarsOnSelect(2.5)}
                  alt="star"
                />
                <img
                  src={starHalfGrayFlipped}
                  className="star"
                  onClick={() => showStarsOnSelect(3)}
                  alt="star"
                />
                <img
                  src={starHalfGray}
                  className="star"
                  onClick={() => showStarsOnSelect(3.5)}
                  alt="star"
                />
                <img
                  src={starHalfGrayFlipped}
                  className="star"
                  onClick={() => showStarsOnSelect(4)}
                  alt="star"
                />
                <img
                  src={starHalfGray}
                  className="star"
                  onClick={() => showStarsOnSelect(4.5)}
                  alt="star"
                />
                <img
                  src={starHalfGrayFlipped}
                  className="star"
                  onClick={() => showStarsOnSelect(2)}
                  alt="star"
                />
              </>
            ) : (
              <ReviewStarUnit rating={userSelectedRating} />
            )}
          </div>
          <p className="rating-text">Review</p>
          <textarea
            className="rating-textarea"
            placeholder="Start Typing..."
            onChange={(e) => setNewUserReview(e.target.value)}
          ></textarea>
          <button
            className="add-review-button add-review-button-text overlay-submit"
            onClick={addNewReview}
          >
            Submit review
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default App;
