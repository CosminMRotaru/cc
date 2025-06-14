export default function SuggestionList({ suggestions, onClick, setInputValue }) {
  if (!suggestions.length) return null;

  function handleSuggestionClick(suggestion) {
    onClick(suggestion);
    if (setInputValue) setInputValue("");
  }

  return (
    <div className="custom-suggestion-box">
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          className="custom-suggestion-item"
          onClick={() => handleSuggestionClick(suggestion)}
        >
          {suggestion}
        </div>
      ))}
    </div>
  );
}
