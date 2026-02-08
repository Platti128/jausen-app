document.addEventListener("DOMContentLoaded", () => {
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
let recipes = [];

fetch("recipes.json")
  .then(res => res.json())
  .then(data => {
    recipes = data;
  })
  .catch(err => console.error("Rezepte konnten nicht geladen werden", err));

  const container = document.getElementById("ingredients");
  let selected = JSON.parse(localStorage.getItem("selectedIngredients")) || [];

  function renderIngredients() {
    container.innerHTML = "";

    ingredients.forEach(name => {
      const btn = document.createElement("button");
      btn.textContent = name;
      btn.className = "ingredient-btn";

      if (selected.includes(name)) {
        btn.classList.add("active");
      }

      btn.onclick = () => {
        toggleIngredient(name);
      };

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

  renderIngredients();
});
