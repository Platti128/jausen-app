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
