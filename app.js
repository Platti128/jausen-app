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

  let selected = JSON.parse(localStorage.getItem("selectedIngredients")) || [];
  let recipes = [];
  let showClicked = false;

  const ingredientsContainer = document.getElementById("ingredients");
  const resultsContainer = document.getElementById("results");
  const showBtn = document.getElementById("showRecipes");

  // ===== REZEPTE LADEN (cache-sicher) =====
  fetch("recipes.json?v=" + Date.now())
    .then(res => res.json())
    .then(data => {
      recipes = data;
      if (showClicked) showRecipes();
    })
    .catch(err => {
      resultsContainer.innerHTML =
        "<p>Fehler: Rezepte konnten nicht geladen werden.</p>";
      console.error(err);
    });

  // ===== ZUTATEN RENDERN =====
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
    if (selected.includes(name)) {
      selected = selected.filter(i => i !== name);
    } else {
      selected.push(name);
    }

    localStorage.setItem(
      "selectedIngredients",
      JSON.stringify(selected)
    );

    renderIngredients();

    // Falls Rezepte schon angezeigt werden → live neu sortieren
    if (showClicked) showRecipes();
  }

  // ===== REZEPTE ANZEIGEN (PRIORISIERT, NICHT GEFILTERT) =====
  function showRecipes() {
    resultsContainer.innerHTML = "<h2>Rezepte</h2>";

    if (recipes.length === 0) {
      resultsContainer.innerHTML += "<p>Rezepte werden geladen …</p>";
      return;
    }

    const scored = recipes.map(recipe => {
      const missing = recipe.ingredients.filter(
        i => !selected.includes(i)
      );

      return {
        recipe,
        missing,
        score: missing.length
      };
    });

    // Weniger fehlende Zutaten = weiter oben
    scored.sort((a, b) => a.score - b.score);

    scored.forEach(item => {
      renderRecipeCard(item.recipe, item.missing);
    });
  }

  // ===== REZEPT-KARTE =====
  function renderRecipeCard(recipe, missing) {
    const card = document.createElement("div");
    card.className = "recipe-card";

    let status = "✅ passt gut";
    if (missing.length === 1) status = "🟡 fehlt 1 Zutat";
    if (missing.length > 1) status = `⚪ fehlt ${missing.length} Zutaten`;

    card.innerHTML = `
      <strong>${recipe.name}</strong><br>
      <small>${status}</small>
    `;

    resultsContainer.appendChild(card);
  }

  // ===== BUTTON =====
  showBtn.onclick = () => {
    showClicked = true;
    showRecipes();
  };

  // ===== START =====
  renderIngredients();
});
