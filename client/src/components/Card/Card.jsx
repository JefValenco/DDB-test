const Card = (props) => {
  return (
    <div className="card_content">
      <img className="card_contentImage" src={props.image} alt="img" />

      <div className="card_contentDetails">
        <div className="card_title">{props.type}</div>

        <div className="card_p">Country: {props.country}</div>
        <div className="card_p">Alcohol: {props.alcoholPercentage}</div>
      </div>
    </div>
  );
};

export default Card;
