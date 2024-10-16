import "./List.css";
import Card from "../card/Card.jsx";

function List({ items, onTagClick }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <main className="list">
      {items.map((item, index) => (
        <Card {...item} key={item.title} onTagClick={onTagClick} number={index + 1}/>
      ))}
      <div className="list__total">
        <span className="list__total-label">Total</span>: {total}$
      </div>
    </main>
  );
}

export default List;
