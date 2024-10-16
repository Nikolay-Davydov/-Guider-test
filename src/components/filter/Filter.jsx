import "./Filter.css";
import { useState } from "react";
import SortingButton from "../sorting/SortingButton";
import TagList from "../tagList/TagList";

function Filter({
  tags,
  selectedTags,
  sortOption,
  sortOptionDirection,
  onSort,
  onTagClick,
  onResetFilter,
}) {
  const [tagListOpen, setTagListOpen] = useState(false);
  return (
    <div className="filter">
      <ul className="sort-options">
        <li className="sort-option">
          <SortingButton
            onClick={() => onSort("price")}
            isActive={sortOption === "price"}
            up={sortOption === "price" && sortOptionDirection === "desc"}
            label="price"
          />
        </li>
        <li className="sort-option">
          <SortingButton
            onClick={() => onSort("author")}
            isActive={sortOption === "author"}
            up={sortOption === "author" && sortOptionDirection === "desc"}
            label="author"
          />
        </li>
        <li className="sort-option">
          <SortingButton
            onClick={() => onSort("date")}
            isActive={sortOption === "date"}
            up={sortOption === "date" && sortOptionDirection === "desc"}
            label="date"
          />
        </li>
      </ul>
      <div className="tags">
        <button
          className={`tags__button
          ${tagListOpen ? "tags__button_up" : ""}`}
          onClick={() => setTagListOpen(!tagListOpen)}
        >
          Tags
        </button>
        <button className="tags__reset" onClick={onResetFilter}>
          reset rules
        </button>
        {tagListOpen && (
          <TagList
            tags={[...tags]}
            selectedTags={selectedTags}
            onTagClick={onTagClick}
          />
        )}
      </div>
    </div>
  );
}

export default Filter;
