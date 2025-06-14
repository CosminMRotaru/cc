import { useState, useEffect } from "react";
import Header from "./Header";
import IngredientsList from "./components/IngredientsList.jsx";
import ClaudeRecipe from "./components/ClaudeRecipe.jsx";
import FryingPanLoader from "./components/FryingPanLoader.jsx";
import SuggestionList from "./components/SuggestionList.jsx";
import { getRecipeWithAI as getClaudeRecipe } from "./ai";

const POPULAR_INGREDIENTS = [
  "egg", "milk", "flour", "butter", "sugar",
  "chicken", "tomato", "cheese", "garlic", "onion",
  "potato", "basil", "rice", "carrot", "mushroom",
  "pepper", "beef", "pasta", "lemon", "spinach"
];

export default function App() {
  const [ingredients, setIngredients] = useState(() => {
    const stored = localStorage.getItem("ingredients");
    return stored ? JSON.parse(stored) : [];
  });
  const [recipe, setRecipe] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = POPULAR_INGREDIENTS.filter(
    (ing) =>
      ing.toLowerCase().startsWith(inputValue.toLowerCase()) &&
      !ingredients.includes(ing.toLowerCase()) &&
      inputValue.length > 0
  ).slice(0, 5);

  function addIngredient(ingredient) {
    const cleaned = ingredient.trim().toLowerCase();
    if (!cleaned || ingredients.includes(cleaned)) return;
    setIngredients((prev) => [...prev, cleaned]);
  }

  function removeIngredient(ingredient) {
    setIngredients((prev) => prev.filter((i) => i !== ingredient));
  }

  function clearAllIngredients() {
    setIngredients([]);
    setRecipe("");
    localStorage.removeItem("ingredients");
    setInputValue("");
    setShowSuggestions(false);
  }

  async function getRecipe() {
    setIsLoading(true);
    const result = await getClaudeRecipe(ingredients);
    setRecipe(result);
    setIsLoading(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!inputValue.trim()) return;
    addIngredient(inputValue);
    setInputValue("");
    setShowSuggestions(false);
  }

  useEffect(() => {
    localStorage.setItem("ingredients", JSON.stringify(ingredients));
  }, [ingredients]);

  return (
    <>
      <Header />
      <main>
        <div className="intro-message">
          Enter your available ingredients below and get an instant recipe suggestion!
        </div>
        <section className="suggestions-section">
          <form
            onSubmit={handleSubmit}
            className="add-ingredient-form"
            autoComplete="off"
          >
            <div className="input-centered-container">
              <input
                type="text"
                placeholder="e.g. egg"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                className="ingredient-input"
                aria-label="Add ingredient"
                autoComplete="off"
              />
              {ingredients.length > 0 && (
                <button
                  type="button"
                  className="reset-inline-btn"
                  onClick={clearAllIngredients}
                  title="Clear all ingredients"
                >
                  🗑️
                </button>
              )}
            </div>

            {showSuggestions && filteredSuggestions.length > 0 && (
              <SuggestionList
                suggestions={filteredSuggestions}
                onClick={addIngredient}
                setInputValue={setInputValue}
              />
            )}

            <button type="submit" className="add-btn">
              Add ingredient
            </button>
          </form>
        </section>

        <IngredientsList
          ingredients={ingredients}
          getRecipe={getRecipe}
          onRemove={removeIngredient}
        />

        {isLoading ? (
          <FryingPanLoader />
        ) : (
          <ClaudeRecipe recipe={recipe} onClear={clearAllIngredients} />
        )}
      </main>
    </>
  );
}
