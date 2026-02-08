document.addEventListener("DOMContentLoaded", () => {

  // ===== ZUTATEN =====
  const ingredients = [
    "Ei",
    "Topfen",
    "Butter",
    "Philadelphia",
    "Schnittlauch",
    "Gurke",
    "Erdäpfel",
    "Kichererbsen"
  ];

  let selected = JSON.parse(localStorage.getItem("selectedIngredients")) || [];

  // ===== REZEPTE LADEN =====
  let recipes = [];

  fetch("recipes.json")
    .then(res => res.json())
    .then(data => {
      recipes = data;
    })
    .catch(err => {
      console.error("Rezepte konnten nicht geladen werden", err);
    });

  // ===== ZUTATEN RENDERN =====
  const container = document.getElementById("ingredients");

  function renderIngredients() {
    if (!container) return;

    container.innerHTML = "";

    ingredients.forEach(name => {
      const btn = document.createElement("button");
      btn.textContent = name;
      btn.className =
        "ingredient-btn" + (selected.includes(name) ? " active" : "");

      btn.onclick = () => toggleIngredient(name);

      container.appendChild(btn);
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
  }

  // ===== BUTTON: ZEIG MIR MEINE JAUSE =====
  const showBtn = document.getElementById("showRecipes");
  const results = document.getElementById("results");

  showBtn.onclick = () => {
    results.innerHTML = "<h2>Das geht heute</h2>";

    if (recipes.length === 0) {
      results.innerHTML += "<p>Rezepte werden noch geladen …</p>";
      return;
    }

    let found = false;

    recipes.forEach(recipe => {
      const ok = recipe.ingredients.every(i =>
        selected.includes(i)
      );

      if (!ok) return;

      found = true;

      const div = document.createElement("div");
      div.className = "recipe-card";
      div.textContent = recipe.name;

      results.appendChild(div);
    });

    if (!found) {
      results.innerHTML +=
        "<p>Mit den gewählten Zutaten geht heute nichts.</p>";
    }
  };

  // ===== START =====
  renderIngredients();

});
