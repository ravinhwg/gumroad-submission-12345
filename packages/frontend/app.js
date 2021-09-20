const generateNewRatingSnippet = (rating, ratingText) => {
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
