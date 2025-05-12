import React from "react"
import IngredientsList from "./Components/IngredientsList"
import ClaudeRecipe from "./Components/ClaudeReceipe";

export default function Main() {

    const [ingredients, setIngredients] = React.useState([]);
    const [recipeShown, setRecipeShown] = React.useState(false);

    function toPascalCase(str) {
        return str.replace(/\w+/g, 
            w => w[0].toUpperCase() + w.slice(1).toLowerCase());
    }
    
    function enterItems(formData) {
        const newIngredient = toPascalCase(formData.get("ingredient"))
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    
    function toggleRecipeShown() {
        setRecipeShown(prevShown => !prevShown)
    }

    return (
        <main>
            <form action={enterItems} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                    required
                />
                <button>Add ingredient</button>
            </form>
            
            {ingredients.length > 0 && 
                <IngredientsList
                ingredients={ingredients}
                toggleRecipeShown={toggleRecipeShown}
            />                
            }
            {recipeShown && <ClaudeRecipe ingredients={ingredients} />}
        </main>
    )
}