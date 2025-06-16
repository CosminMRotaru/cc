const API_URL =
  import.meta.env.PROD
    ? "/.netlify/functions/claude"
    : "http://localhost:3001/api/claude";

export async function getRecipeWithAI(ingredients) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients }),
  });
  const data = await response.json();
  return data.recipe || "No recipe found!";
}