export default function IngredientsList({ ingredients, getRecipe, onRemove }) {
  return (
    <>
      <ul className="ingredients-list">
        {ingredients.map((ing) => (
          <li key={ing} className="ingredient-card">
            <span>{ing}</span>
            <button
              className="remove-x-btn"
              aria-label={`Remove ${ing}`}
              onClick={() => onRemove(ing)}
              type="button"
              tabIndex={0}
            >
              ×
            </button>
          </li>
        ))}
      </ul>

      {ingredients.length > 1 && (
        <div className="get-recipe-container">
          <button className="gen-btn" onClick={getRecipe}>
            Generate recipe
          </button>
        </div>
      )}
    </>
  );
}
