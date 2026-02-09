document.addEventListener("DOMContentLoaded", () => {

  // ===== ZUTATEN =====
  const ingredients = [
    "Ei",
    "Butter",
    "Schnittlauch",
    "Philadelphia",
    "Gurke",
    "Erdäpfel",
    "Kichererbsen",
    "Käse",
    "Olivenöl",
    "Bohnen",
    "Zwiebel",
    "Linsen",
    "Senf",
    "Sauerrahm",
    "Kren"
  ];

  let selected = [];
  let recipes = [];
  let showClicked = false;

  const ingredientsContainer = document.getElementById("ingredients");
  const resultsContainer = document.getElementById("results");
  const showBtn = document.getElementById("showRecipes");

  // ===== REZEPTE LADEN =====
  fetch("recipes.json?v=" + Date.now())
    .then(r => r.json())
    .then(data => {
      recipes = data;
      if (showClicked) showRecipes();
    })
    .catch(err => {
      resultsContainer.innerHTML = "<p>FEHLER: recipes.json nicht geladen</p>";
      console.error(err);
    });

  // ===== ZUTATEN =====
  function renderIngredients() {
    ingredientsContainer.innerHTML = "";

    ingredients.forEach(name => {
      const btn = document.createElement("button");
      btn.textContent = name;
      btn.className =
        "ingredient-btn" + (selected.includes(name) ? " active" : "");
      btn.onclick = () => toggleIngredient(name);
      ingredientsContainer.appendChild(btn);
    });
  }

  function toggleIngredient(name) {
    selected = selected.includes(name)
      ? selected.filter(i => i !== name)
      : [...selected, name];

    renderIngredients();
  }

  // ===== REZEPTE =====
  function showRecipes() {
    resultsContainer.innerHTML = "<h2>Das geht heute</h2>";

    if (recipes.length === 0) {
      resultsContainer.innerHTML += "<p>Rezepte werden geladen …</p>";
      return;
    }

    let found = false;

    recipes.forEach(recipe => {
      if (
        recipe.ingredients.every(i => selected.includes(i)) &&
        recipe.ingredients.length >= selected.length
      ) {
        found = true;
        const div = document.createElement("div");
        div.className = "recipe-card";
        div.textContent = recipe.name;
        resultsContainer.appendChild(div);
      }
    });

    if (!found) {
      resultsContainer.innerHTML += "<p>Kein passendes Rezept</p>";
    }
  }

  showBtn.onclick = () => {
    showClicked = true;
    showRecipes();
  };

  renderIngredients();
});
