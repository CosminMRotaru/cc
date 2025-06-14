export async function getRecipeWithAI(ingredients) {
  try {
    const response = await fetch("http://localhost:3001/api/claude", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients }),
    });
    const data = await response.json();
    if (data?.error) throw data;
    return typeof data === "string" ? data : data.recipe || JSON.stringify(data);
  } catch (e) {
    // Afișează detaliile reale ale erorii
    if (typeof e === "object") {
      return "Error: " + (e.error || e.details || JSON.stringify(e));
    }
    return "Error: " + e;
  }
}