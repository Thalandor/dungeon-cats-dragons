import styles from "./Stats.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faStar as faEmptyStar } from "@fortawesome/free-regular-svg-icons";
import { IStats } from "../character/Character";

interface Props {
  stats: IStats;
}

const star = <FontAwesomeIcon icon={faStar} />;
const halfStar = <FontAwesomeIcon icon={faStarHalfStroke} />;
const emptyStar = <FontAwesomeIcon icon={faEmptyStar} />;

const Stats: React.FC<Props> = ({ stats }: Props) => {
  const renderStars = (value: number) => {
    const filledStars = Math.floor(value);
    const hasHalfStar = value - filledStars >= 0.5;

    const stars = [];
    for (let i = 0; i < filledStars; i++) {
      stars.push(star);
    }

    if (hasHalfStar) {
      stars.push(halfStar);
    }

    const remainingStars = 5 - filledStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(emptyStar);
    }

    return stars;
  };

  return (
    <div className={styles.parent}>
      <div>
        <span>Strength </span>
        {renderStars(stats.strength)}
      </div>
      <div>
        <span>Dexterity </span>
        {renderStars(stats.dexterity)}
      </div>
      <div>
        <span>Constitution </span>
        {renderStars(stats.constitution)}
      </div>
      <div>
        <span>Intelligence </span>
        {renderStars(stats.intelligence)}
      </div>
      <div>
        <span>Wisdom </span>
        {renderStars(stats.wisdom)}
      </div>
      <div>
        <span>Charisma </span>
        {renderStars(stats.charisma)}
      </div>
    </div>
  );
};

export default Stats;
