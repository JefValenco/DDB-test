import Card from "../Card/Card";
import styles from "./CardsContainer.module.css";

const CardsContainer = ({ currentBeers }) => {
  return (
    <div className={styles.container}>
      {currentBeers.map((beer) => {
        return (
          <div>
            <Card
              type={beer.type}
              image={beer.image}
              country={beer.country}
              alcoholPercentage={beer.alcoholPercentage}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CardsContainer;
