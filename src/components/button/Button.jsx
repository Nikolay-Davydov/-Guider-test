import "./Button.css";

function Button({ label, selected, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`button ${selected ? "button_selected" : ""}`}
        >
            {label}
        </button>
    );
}

export default Button;