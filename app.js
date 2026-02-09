document.addEventListener("DOMContentLoaded", () => {
alert("NEUE VERSION GELADEN");

  // ===== ZUTATEN =====
  const ingredients = [
    "Ei",
    "Topfen",
    "Butter",
    "Philadelphia",
    "Schnittlauch",
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

  // ===== REZEPTE LADEN =====
  let recipes = [];

  fetch("recipes.json3")
    .then(response => response.json())
    .then(data => {
      recipes = data;
    })
    .catch(error => {
      console.error("Fehler beim Laden der Rezepte:", error);
    });

  // ===== ZUTATEN RENDERN =====
  const ingredientsContainer = document.getElementById("ingredients");
  const resultsContainer = document.getElementById("results");
  const showBtn = document.getElementById("showRecipes");

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
  }

  // ===== BUTTON: ZEIG MIR MEINE JAUSE =====
  showBtn.onclick = () => {
    resultsContainer.innerHTML = "<h2>Das geht heute</h2>";

    if (recipes.length === 0) {
      resultsContainer.innerHTML += "<p>Rezepte werden noch geladen …</p>";
      return;
    }

    let found = false;

    recipes.forEach(recipe => {
      const passt =
        recipe.ingredients.every(i => selected.includes(i)) &&
        recipe.ingredients.length >= selected.length;

      if (!passt) return;

      found = true;

      const card = document.createElement("div");
      card.className = "recipe-card";
      card.textContent = recipe.name;

      resultsContainer.appendChild(card);
    });

    if (!found) {
      resultsContainer.innerHTML +=
        "<p>Mit dieser Auswahl passt kein Rezept.</p>";
    }
  };

  // ===== START =====
  renderIngredients();

});
