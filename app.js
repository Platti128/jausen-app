document.addEventListener("DOMContentLoaded", () => {

  // ===== ZUTATEN =====
  const ingredientIcons = {
    "Ei": "🥚",
    "Topfen": "🧀",
    "Frühlingszwiebeln": "🧅",
    "Rote Zwiebeln": "🧅",
    "Tomate": "🍅",
    "Gurke": "🥒",
    "Käse": "🧀",
    "Brot": "🍞",
    "Avocado": "🥑",
    "Joghurt": "🥣"
  };

  const ingredients = [
    "Ei",
    "Topfen",
    "Frühlingszwiebeln",
    "Rote Zwiebeln",
    "Tomate",
    "Gurke",
    "Käse",
    "Brot",
    "Avocado",
    "Joghurt"
  ];
const recipes = [
  {
    id: "eierbrot",
    name: "Eierbrot",
    ingredients: ["Ei"],
    image: ""
  },
  {
    id: "ei_topfen",
    name: "Ei-Topfen-Aufstrich",
    ingredients: ["Ei", "Topfen"],
    image: ""
  }
];

  const container = document.getElementById("ingredients");
  let selected = JSON.parse(localStorage.getItem("selectedIngredients")) || [];

  function toggleIngredient(name) {
    if (selected.includes(name)) {
      selected = selected.filter(i => i !== name);
    } else {
      selected.push(name);
    }
    localStorage.setItem("selectedIngredients", JSON.stringify(selected));
    renderIngredients();
  }

  function renderIngredients() {
    container.innerHTML = "";

    ingredients.forEach(name => {
      const btn = document.createElement("button");

      const iconSpan = document.createElement("span");
      iconSpan.className = "ingredient-icon";
      iconSpan.textContent = ingredientIcons[name] || "🟢";

      const textSpan = document.createElement("span");
      textSpan.className = "ingredient-text";
      textSpan.textContent = name;

      btn.appendChild(iconSpan);
      btn.appendChild(textSpan);

      btn.onclick = () => toggleIngredient(name);

      btn.style.background = selected.includes(name)
        ? "#2e7d32"
        : "#2a2a2a";

      container.appendChild(btn);
    });
  }

  renderIngredients();

});
const showBtn = document.getElementById("showRecipes");

showBtn.onclick = () => {
  const old = document.getElementById("results");
  if (old) old.remove();

  const results = document.createElement("div");
  results.id = "results";
  results.innerHTML = "<h2>Das geht heute</h2>";

  let found = false;

  recipes.forEach(recipe => {
    const missing = recipe.ingredients.filter(i => !selected.includes(i));
    if (missing.length !== 0) return;

    found = true;

    const card = document.createElement("div");
    card.className = "recipe-card";
    card.textContent = recipe.name;

    card.onclick = () => openRecipeDetail(recipe);

    results.appendChild(card);
  });

  if (!found) {
    results.innerHTML += "<p>Heute nichts direkt machbar.</p>";
  }

  document.body.appendChild(results);
};
