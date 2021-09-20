import starGray from "../assets/star_gray.svg";
import starGold from "../assets/star_gold.svg";

export default function ReviewStarUnit({ rating }) {
  const grayStarCount = Math.abs(5 - rating);
  const GRAY_STAR_TEMPLATE = <img src={starGray} class="star" alt="star" />;
  const GOLD_STAR_TEMPLATE = <img src={starGold} class="star" alt="star" />;
  const starsArray = [];
  for (let i = 0; i < rating; i++) {
    starsArray.push(GOLD_STAR_TEMPLATE);
  }
  for (let i = 0; i < grayStarCount; i++) {
    starsArray.push(GRAY_STAR_TEMPLATE);
  }
  return <div class="star-group">{starsArray}</div>;
}
