import React from "react";
import axios from "axios";

export default function ClaudeRecipe({ ingredients }) {
  const [recipe, setRecipe] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchRecipe() {
      setLoading(true);
      try {
        const response = await axios.post("http://localhost:5000/get-recipe", {
          ingredients: ingredients.join(", "),
        });
        setRecipe(response.data.recipe);
      } catch (error) {
        console.error("Fetch error:", error.message);
        setRecipe("Failed to fetch recipe.");
      } finally {
        setLoading(false);
      }
    }

    fetchRecipe();
  }, [ingredients]);

  return (
    <section>
      <h2>Chef Claude Recommends:</h2>
      <article className="suggested-recipe-container" aria-live="polite">
        {loading ? <p>Loading recipe...</p> : <pre>{recipe}</pre>}
      </article>
    </section>
  );
}
