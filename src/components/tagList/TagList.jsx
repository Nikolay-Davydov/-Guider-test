import "./TagList.css";
import Button from "../button/Button";

function TagList({ tags, selectedTags, onTagClick }) {
    return (
        <div className="tag-list">
            {tags.map((tag) => (
                <Button
                    label={tag}
                    key={tag}
                    selected={selectedTags.has(tag)}
                    onClick={() => onTagClick(tag)}
                />
            ))}
        </div>
    );
}

export default TagList;
