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

  let status = "Passt gut";
  let badge = "green";

  if (missing.length === 1) {
    status = "1 Zutat fehlt";
    badge = "yellow";
  }
  if (missing.length > 1) {
    status = `${missing.length} Zutaten fehlen`;
    badge = "gray";
  }

  card.innerHTML = `
    <div class="recipe-image">
      <img src="${recipe.image}" alt="${recipe.name}">
      <span class="badge ${badge}">${status}</span>
    </div>

    <div class="recipe-info">
      <strong>${recipe.name}</strong>
      <div class="meta">⏱ ${recipe.time} min</div>
    </div>
  `;
card.onclick = () => openRecipeDetail(recipe);

document.body.classList.add("modal-open");


  resultsContainer.appendChild(card);
}


  // ===== BUTTON =====
  showBtn.onclick = () => {
    showClicked = true;
    showRecipes();
  };

  // ===== START =====
  renderIngredients();

function openRecipeDetail(recipe) {
  // 🔒 Hintergrund-Scroll sperren
  document.body.classList.add("no-scroll");

  const overlay = document.createElement("div");
  overlay.className = "recipe-detail";

  const ingredientsList = recipe.ingredients.map(i => {
    const amount = recipe.amounts?.[i] || "";
    return `<li>${i} ${amount}</li>`;
  }).join("");

  const stepsList = recipe.steps
    ? recipe.steps.map(s => `<li>${s}</li>`).join("")
    : "<li>Keine Anleitung vorhanden</li>";

  overlay.innerHTML = `
    <div class="detail-content">
      <div class="detail-image">
        <img src="${recipe.image}" alt="${recipe.name}">
        <button class="close-btn">✕</button>
      </div>

      <div class="detail-body">
        <h2>${recipe.name}</h2>
        <p class="detail-time">⏱ ${recipe.time} min</p>

        <h3>Zutaten</h3>
        <ul>${ingredientsList}</ul>

        <h3>Zubereitung</h3>
        <ol>${stepsList}</ol>
      </div>
    </div>
  `;

  overlay.querySelector(".close-btn").onclick = () => {
  document.body.classList.remove("modal-open");
  overlay.remove();
};

overlay.onclick = e => {
  if (e.target === overlay) {
    document.body.classList.remove("modal-open");
    overlay.remove();
  }
};


  // ❌ schließen (Hintergrund)
  overlay.onclick = e => {
    if (e.target === overlay) {
      document.body.classList.remove("no-scroll");
      overlay.remove();
    }
  };

  document.body.appendChild(overlay);
}

});
