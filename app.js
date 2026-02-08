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

  function renderIngredients() {
    const container = document.getElementById("ingredients");
    if (!container) return;

    container.innerHTML = "";

    ingredients.forEach(name => {
      const btn = document.createElement("button");
      btn.textContent = name;

      btn.className = selected.includes(name)
        ? "ingredient selected"
        : "ingredient";

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

  // ===== START =====
  renderIngredients();

});


  const container = document.getElementById("ingredients");

  ingredients.forEach(name => {
    const btn = document.createElement("button");
    btn.textContent = name;
    btn.style.padding = "16px";
    btn.style.margin = "8px";
    btn.style.fontSize = "18px";
    container.appendChild(btn);
  });

document.getElementById("showRecipes").onclick = () => {
  const selection = document.getElementById("selection");
  if (selection) selection.style.display = "none";

  const old = document.getElementById("results");
  if (old) old.remove();

  const results = document.createElement("div");
  results.id = "results";
  results.innerHTML = "<h2 style='opacity:.8'>Das geht heute</h2>";

  let found = false;

  recipes.forEach(recipe => {
    const missing = recipe.ingredients.filter(i => !selected.includes(i));
    if (missing.length !== 0) return;

    found = true;

    const card = document.createElement("div");
    card.className = "recipe-card";

    card.innerHTML = `
      <img src="${recipe.image}">
      <div class="content">
        <strong>${recipe.name}</strong><br>
        <span style="opacity:.7">
          ⏱ ${recipe.time} min &nbsp; ${"🔥".repeat(recipe.satiety)}
        </span>
      </div>
    `;

    card.onclick = () => openRecipeDetail(recipe);
    results.appendChild(card);
  });

  if (!found) {
    results.innerHTML += "<p style='opacity:.6'>Heute nichts direkt machbar.</p>";
  }

  document.body.appendChild(results);
};
