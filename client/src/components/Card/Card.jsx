import styles from "./Card.module.css";

const Card = (props) => {
  return (
    <div className={styles.content}>
      <img className={styles.contentImage} src={props.image} alt="img" />

      <div className={styles.contentDetails}>
        <div className={styles.title}>{props.type}</div>

        <div className={styles.p}>Country: {props.country}</div>
        <div className={styles.p}>Alcohol: {props.alcoholPercentage}</div>
      </div>
    </div>
  );
};

export default Card;
