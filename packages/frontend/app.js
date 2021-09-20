const API_URL = "http://127.0.0.1:3000/api";
const USER_RATING = {};

const generateNewStarSnippet = (rating) => {
  const grayStarCount = Math.abs(5 - rating);
  const GRAY_STAR_TEMPLATE = `<img src="/assets/star_gray.svg" class="star" />`;
  const GOLD_STAR_TEMPLATE = `<img src="/assets/star_gold.svg" class="star" />`;
  const starsArray = [];
  for (let i = 0; i < rating; i++) {
    starsArray.push(GOLD_STAR_TEMPLATE);
  }
  for (let i = 0; i < grayStarCount; i++) {
    starsArray.push(GRAY_STAR_TEMPLATE);
  }
  const stars = starsArray.join("");
  return stars;
};

const generateNewRatingSnippet = (rating, ratingText) => {
  const stars = generateNewStarSnippet(rating);
  const RATING_SNIPET_TEMPLATE = `<div class="review-container"><div class="star-group">${stars}</div><p class="review-text-rating">${rating}</p><p class="review-text-body">, ${ratingText}</p></div>`;
  return RATING_SNIPET_TEMPLATE;
};

const injectRatingSnippet = (rating, ratingText) => {
  const ratingSnippet = generateNewRatingSnippet(rating, ratingText);
  // get rating container
  const ratingContainer = document.querySelector(".reviews-container-inner");
  // insert rating snippet
  ratingContainer.insertAdjacentHTML("beforeend", ratingSnippet);
};

const fetchRatings = () => {
  fetch(`${API_URL}/reviews`)
    .then((response) => response.json())
    .then((data) => {
      const ratings = data.reviews.map((review) => {
        return {
          rating: review.star_count,
          ratingText: review.review_text,
        };
      });
      ratings.forEach((rating) => {
        injectRatingSnippet(rating.rating, rating.ratingText);
      });
    });
};

const fetchAverageRating = () => {
  fetch(`${API_URL}/reviews/average`)
    .then((response) => response.json())
    .then((data) => {
      const averageRating = data.average;
      injectAverageRating(averageRating);
    })
    .catch((error) => {
      console.log(error);
    });
};

const injectAverageRating = (avgRating) => {
  const averageRatingNumber = avgRating.toFixed(1);
  const averageRatingElem = document.querySelector(".avg-rating");
  averageRatingElem.innerHTML = averageRatingNumber;

  // new star snippet
  const newStarSnippet = generateNewStarSnippet(Math.round(avgRating));
  const newStarSnippetElem = document.querySelector(".avg-rating-stars");
  newStarSnippetElem.innerHTML = newStarSnippet;
};

// generate overlay
const overlayBg = document.createElement("div");
overlayBg.classList.add("overlayBg");
overlayBg.onclick = closeOverlay;
document.body.appendChild(overlayBg);
const reviewOverlay = document.querySelector(".review-overlay");

function openOverlay() {
  overlayBg.classList.add("open");
  reviewOverlay.classList.add("open");
}
function closeOverlay() {
  overlayBg.classList.remove("open");
  reviewOverlay.classList.remove("open");
}

// show stars on hover
const showStarsOnSelect = (rating) => {
  const starSnippet = generateNewStarSnippet(rating, true);
  const starSnippetElem = document.querySelector(".stars-on-overlay");
  starSnippetElem.innerHTML = starSnippet;
  USER_RATING.rating = rating;
};

//validate and send the new rating to the server
const validateAndSendRating = () => {
  const reviewInput = document.querySelector(".rating-textarea");
  const ratingText = reviewInput.value;
  const rating = USER_RATING.rating;
  if (rating > 0 && rating < 6 && ratingText.length > 0) {
    fetch(`${API_URL}/reviews`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        starCount: rating,
        reviewText: ratingText,
      }),
    })
      .then((response) => response.json()) // parse the response as JSON
      .then((data) => {
        fetchRatings();
        closeOverlay();
        fetchAverageRating();
        // empty the rating
        reviewInput.value = "";
        // reset the rating
        USER_RATING.rating = 0;
        const RATING_TEMPLATE = `<img src="/assets/star_gray.svg" class="star" onclick="showStarsOnSelect(1)" />
        <img src="/assets/star_gray.svg" class="star" onclick="showStarsOnSelect(2)" />
        <img src="/assets/star_gray.svg" class="star" onclick="showStarsOnSelect(3)" />
        <img src="/assets/star_gray.svg" class="star" onclick="showStarsOnSelect(4)" />
        <img src="/assets/star_gray.svg" class="star" onclick="showStarsOnSelect(5)" />`;
        const starSnippetElem = document.querySelector(".stars-on-overlay");
        starSnippetElem.innerHTML = RATING_TEMPLATE;
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    alert("Invalid review");
  }
};

window.onload = () => {
  fetchRatings();
  fetchAverageRating();
};
