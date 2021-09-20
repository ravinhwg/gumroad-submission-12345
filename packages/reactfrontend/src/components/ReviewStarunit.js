import starGray from "../assets/star_gray.svg";
import starGold from "../assets/star_gold.svg";
import starHalf from "../assets/star_half.svg";

export default function ReviewStarUnit({ rating }) {
  // check if a half star is needed
  let isHalfStarneeded = false;
  if (Math.round((rating - Math.floor(rating)) * 2) / 2 === 0.5) {
    isHalfStarneeded = true;
  }
  let grayStarCount = Math.abs(5 - Math.floor(rating));
  const GRAY_STAR_TEMPLATE = <img src={starGray} class="star" alt="star" />;
  const GOLD_STAR_TEMPLATE = <img src={starGold} class="star" alt="star" />;
  const HALF_STAR_TEMPLATE = <img src={starHalf} class="star" alt="star" />;
  const starsArray = [];
  for (let i = 0; i < Math.floor(rating); i++) {
    starsArray.push(GOLD_STAR_TEMPLATE);
  }

  if (isHalfStarneeded) {
    starsArray.push(HALF_STAR_TEMPLATE);
  }
  for (let i = 0; i < grayStarCount; i++) {
    starsArray.push(GRAY_STAR_TEMPLATE);
  }
  // remove one gray if half star is needed
  if (isHalfStarneeded) {
    starsArray.pop();
  }
  return <div class="star-group">{starsArray}</div>;
}
