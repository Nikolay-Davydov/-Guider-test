import "./SortingButton.css";

function SortingButton({ label, isActive, up, onClick }) {
  return (
    <button
      className={`sort-button
        ${isActive ? "sort-button_active" : ""}
        ${up ? "sort-button_up" : ""}
      `}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default SortingButton;
