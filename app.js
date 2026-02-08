document.addEventListener("DOMContentLoaded", () => {

  const ingredients = ["Ei", "Butter", "Käse"];
  const recipes = [
    { name: "Eibrot", ingredients: ["Ei", "Butter"] },
    { name: "Käsebrot", ingredients: ["Käse", "Butter"] }
  ];

  let selected = [];

  const ingDiv = document.getElementById("ingredients");
  const resultsDiv = document.getElementById("results");

  function renderIngredients() {
    ingDiv.innerHTML = "";
    ingredients.forEach(i => {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.className = "ingredient" + (selected.includes(i) ? " selected" : "");
      btn.onclick = () => toggle(i);
      ingDiv.appendChild(btn);
    });
  }

  function toggle(i) {
    selected = selected.includes(i)
      ? selected.filter(x => x !== i)
      : [...selected, i];
    renderIngredients();
  }

  document.getElementById("showRecipes").onclick = () => {
    resultsDiv.innerHTML = "";
    recipes.forEach(r => {
      if (r.ingredients.every(i => selected.includes(i))) {
        const p = document.createElement("p");
        p.textContent = r.name;
        resultsDiv.appendChild(p);
      }
    });
  };

  renderIngredients();
});
