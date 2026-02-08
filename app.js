document.addEventListener("DOMContentLoaded", () => {

  /* ===== ZUTATEN ===== */
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

  const ingredients = Object.keys(ingredientIcons);

  const container = document.getElementById("ingredients");
  const showBtn = document.getElementById("showRecipes");

  let selected = JSON.parse(localStorage.getItem("selectedIngredients")) || [];

  function renderIngredients() {
    container.innerHTML = "";

    ingredients.forEach(name => {
      const btn = document.createElement("button");

      const icon = document.createElement("span");
      icon.className = "ingredient-icon";
      icon.textContent = ingredientIcons[name];

      const text = document.createElement("span");
      text.className = "ingredient-text";
      text.textContent = name;

      btn.appendChild(icon);
      btn.appendChild(text);

      btn.style.background = selected.includes(name)
        ? "#2e7d32"
        : "#2a2a2a";

      btn.onclick = () => {
        if (selected.includes(name)) {
          selected = selected.filter(i => i !== name);
        } else {
          selected.push(name);
        }
        localStorage.setItem("selectedIngredients", JSON.stringify(selected));
        renderIngredients();
      };

      container.appendChild(btn);
    });
  }

  renderIngredients();

  /* ===== REZEPTE ===== */
  const recipes = [
    { name: "Eierbrot", ingredients: ["Ei"] },
    { name: "Ei-Topfen-Aufstrich", ingredients: ["Ei", "Topfen"] },
    { name: "Topfen pur", ingredients: ["Topfen"] },
    { name: "Avocado mit Zwiebel", ingredients: ["Avocado", "Rote Zwiebeln"] }
  ];

  showBtn.onclick = () => {
    const old = document.getElementById("results");
    if (old) old.remove();

    const results = document.createElement("div");
    results.id = "results";
    results.innerHTML = "<h2>Das geht heute</h2>";

    let found = false;

    recipes.forEach(r => {
      if (r.ingredients.every(i => selected.includes(i))) {
        found = true;
        const div = document.createElement("div");
        div.className = "recipe-card";
        div.textContent = r.name;
        results.appendChild(div);
      }
    });

    if (!found) {
      results.innerHTML += "<p>Heute nichts direkt machbar.</p>";
    }

    document.body.appendChild(results);
  };

});
