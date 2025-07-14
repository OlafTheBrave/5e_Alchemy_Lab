// Helper function to fetch JSON files
async function loadJSON(file) {
    const response = await fetch(file);
    return await response.json();
}

// Global state
let ingredients = [];
let selectedIngredients = [];
let catalysts = [];
let recipes = [];

// Load ingredients and recipes on page load
window.onload = async function() {
    ingredients = await loadJSON('ingredients.json');
    recipes = await loadJSON('recipes.json');
    catalysts = ingredients.filter(i => i.type == 'catalyst'); // Example: any non-herb can be a catalyst

    renderIngredients();
    renderCatalystOptions();
    renderRecipes();
};

// Render ingredient buttons
function renderIngredients() {
    const ingredientList = document.getElementById('ingredient-list');
    ingredientList.innerHTML = '';
    ingredients.forEach(ing => {
        const btn = document.createElement('button');
        btn.className = 'ingredient-btn';
        btn.textContent = ing.name;
        btn.onclick = () => toggleIngredient(ing.name, btn);
        ingredientList.appendChild(btn);
    });
}

function toggleIngredient(ingredient, btn) {
    if (selectedIngredients.includes(ingredient)) {
        selectedIngredients = selectedIngredients.filter(i => i !== ingredient);
        btn.classList.remove('selected');
    } else {
        selectedIngredients.push(ingredient);
        btn.classList.add('selected');
    }
}

// Render catalyst options
function renderCatalystOptions() {
    const catalystSelect = document.getElementById('brew-catalyst');
    catalystSelect.innerHTML = '';
    catalysts.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.name;
        option.textContent = cat.name;
        catalystSelect.appendChild(option);
    });
}

// Render recipes in the book
function renderRecipes() {
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = '';
    recipes.forEach((rec, idx) => {
        const li = document.createElement('li');
        li.textContent = `${rec.name}: [${rec.ingredients.join(', ')}] using ${rec.catalyst} (Time: ${rec.time}, Temp: ${rec.temp}) - ${rec.effect}`;
        recipeList.appendChild(li);
    });
}
