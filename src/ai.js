export async function getRecipeWithAI(ingredients) {
  const response = await fetch("http://localhost:3001/api/claude", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients }),
  });
  const data = await response.json();
  return data.recipe || "No recipe found!";
}
