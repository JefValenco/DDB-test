import Card from "../Card/Card";

const CardsContainer = ({ currentBeers }) => {
  return (
    <div className="cardContainer_container">
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
