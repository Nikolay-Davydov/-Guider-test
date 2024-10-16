import "./Card.css";
import Button from "../button/Button";

function Card({ title, number, author, illustrator, date, price, tags, onTagClick }) {
  return (
    <div className="card">
      <div className="card__content">
        <h2 className="card__title">{number} {title}</h2>
        <ul className="card__properties">
          <li className="card__author">
            by {author}
            {illustrator ? ", illustrations by " + illustrator : ""}
          </li>
          <li className="card__date">{date}</li>
          <li className="card__price">${price}</li>
        </ul>
      </div>
      <div className="button-container">
        {tags.map((tag) => (
          <Button label={tag} key={tag} onClick={() => onTagClick(tag)} />
        ))}
      </div>
    </div>
  );
}

export default Card;
