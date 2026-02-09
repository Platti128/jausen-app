document.addEventListener("DOMContentLoaded", () => {

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

  const ingredientsContainer = document.getElementById("ingredients");
  const resultsContainer = document.getElementById("results");
  const showBtn = document.getElementById("showRecipes");

  let selected = [];
  let recipes = [];

  // ===== REZEPTE LADEN =====
  fetch("recipes.json?v=" + Date.now())
    .then(r => r.json())
    .then(data => {
      recipes = data;
      console.log("Rezepte geladen:", recipes.length);
    })
    .catch(err => {
      console.error("Fehler beim Laden der Rezepte", err);
      resultsContainer.innerHTML = "<p>Rezepte konnten nicht geladen werden</p>";
    });

  // ===== ZUTATEN =====
  function renderIngredients() {
    ingredientsContainer.innerHTML = "";

    ingredients.forEach(name => {
      const btn = document.createElement("button");
      btn.textContent = name;
      btn.onclick = () => toggleIngredient(name);
      ingredientsContainer.appendChild(btn);
    });
  }

  function toggleIngredient(name) {
    if (selected.includes(name)) {
      selected = selected.filter(i => i !== name);
    } else {
      selected.push(name);
    }
  }

  // ===== BUTTON =====
  showBtn.onclick = () => {
    resultsContainer.innerHTML = "<h2>Rezepte</h2>";

    if (recipes.length === 0) {
      resultsContainer.innerHTML += "<p>Rezepte werden geladen …</p>";
      return;
    }

recipes.forEach(r => {
  const card = document.createElement("div");
  card.className = "recipe-card";

  card.innerHTML = `
    <div class="recipe-image">
      <img src="${r.image}" alt="${r.name}">
      <span class="badge">Rezept</span>
    </div>
    <div class="recipe-info">
      <strong>${r.name}</strong>
      <small>⏱ ${r.time} min</small>
    </div>
  `;

  resultsContainer.appendChild(card);
});
  };

  renderIngredients();
});
