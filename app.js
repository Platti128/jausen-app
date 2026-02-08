document.addEventListener("DOMContentLoaded", () => {

  /* BASIS */
  const ingredientsData = [
    { name: "Ei", icon: "🥚" },
    { name: "Topfen", icon: "🧀" },
    { name: "Butter", icon: "🧈" },
    { name: "Philadelphia", icon: "🧀" },
    { name: "Schnittlauch", icon: "🌿" },
    { name: "Gurke", icon: "🥒" },
    { name: "Erdäpfel", icon: "🥔" },
    { name: "Kichererbsen", icon: "🫘" }
  ];

  const baseSpices = ["Salz", "Pfeffer", "Öl"];

  const recipes = [
    {
      id: "ei_aufstrich",
      name: "Deftiger Ei-Aufstrich",
      ingredients: ["Ei", "Philadelphia"],
      image: "https://images.unsplash.com/photo-1551024601-bec78aea704b",
      steps: [
        "Ei 8–9 Minuten hart kochen",
        "Ei schälen und fein zerdrücken",
        "Mit Frischkäse vermengen",
        "Salz, Pfeffer, etwas Senf"
      ],
      satiety: 3
    },
    {
      id: "butter_schnittlauch",
      name: "Butterbrot mit Schnittlauch",
      ingredients: ["Butter", "Schnittlauch"],
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
      steps: [
        "Butter streichfähig machen",
        "Schnittlauch fein schneiden",
        "Vermengen und würzen"
      ],
      satiety: 2
    },
    {
      id: "erdapfel_kren",
      name: "Erdäpfel-Kren-Aufstrich",
      ingredients: ["Erdäpfel"],
      image: "https://images.unsplash.com/photo-1604908177522-4293c91e3c52",
      steps: [
        "Erdäpfel weich kochen",
        "Zerdrücken",
        "Kren und Sauerrahm einrühren",
        "Salzen"
      ],
      satiety: 3
    }
  ];

  let selected = [];
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const ingredientsEl = document.getElementById("ingredients");
  const recipesEl = document.getElementById("recipes");
  const detailEl = document.getElementById("recipeDetail");

  /* ZUTATEN */
  ingredientsData.forEach(item => {
    const btn = document.createElement("button");
    btn.className = "ingredient-btn";
    btn.innerHTML = `<span>${item.icon}</span>${item.name}`;
    btn.onclick = () => {
      btn.classList.toggle("active");
      selected.includes(item.name)
        ? selected = selected.filter(i => i !== item.name)
        : selected.push(item.name);
    };
    ingredientsEl.appendChild(btn);
  });

  /* REZEPTE ANZEIGEN */
  document.getElementById("showRecipes").onclick = () => {
    document.getElementById("selection").classList.add("hidden");
    recipesEl.classList.remove("hidden");
    recipesEl.innerHTML = "";

    const available = [...selected, ...baseSpices];

    const visibleRecipes = recipes
      .filter(r => r.ingredients.every(i => available.includes(i)))
      .sort((a, b) => favorites.includes(b.id) - favorites.includes(a.id));

    visibleRecipes.forEach(r => {
      const card = document.createElement("div");
      card.className = "recipe-card";
      card.innerHTML = `
        <img src="${r.image}">
        <div class="recipe-info">
          <span class="fav">${favorites.includes(r.id) ? "⭐" : "☆"}</span>
          <h3>${r.name}</h3>
          ${"🔥".repeat(r.satiety)}
        </div>
      `;
      card.onclick = () => openDetail(r);
      recipesEl.appendChild(card);
    });
  };

  /* DETAIL */
  function openDetail(r) {
    detailEl.classList.remove("hidden");
    detailEl.innerHTML = `
      <div class="detail-img">
        <img src="${r.image}">
        <div class="close">✕</div>
      </div>
      <div class="detail-content">
        <h2>${r.name} <span id="fav">${favorites.includes(r.id) ? "⭐" : "☆"}</span></h2>
        <ol>${r.steps.map(s => `<li>${s}</li>`).join("")}</ol>
      </div>
    `;

    detailEl.querySelector(".close").onclick = () =>
      detailEl.classList.add("hidden");

    detailEl.querySelector("#fav").onclick = () => {
      favorites.includes(r.id)
        ? favorites = favorites.filter(f => f !== r.id)
        : favorites.push(r.id);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      openDetail(r);
    };
  }
});
