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


const container = document.getElementById("ingredients");
let selected = JSON.parse(localStorage.getItem("selectedIngredients")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

ingredients.forEach(name => {
  const btn = document.createElement("button");

  const iconSpan = document.createElement("span");
  iconSpan.className = "ingredient-icon";
  iconSpan.textContent = "🟢"; // Test-Icon

  const textSpan = document.createElement("span");
  textSpan.className = "ingredient-text";
  textSpan.textContent = name;

  btn.appendChild(iconSpan);
  btn.appendChild(textSpan);

  btn.onclick = () => toggleIngredient(name);

  btn.style.background = selected.includes(name)
    ? "#2e7d32"
    : "#2a2a2a";

  ingredientsContainer.appendChild(btn);
});


// ===== REZEPTE =====
const recipes = [
  // 🥚 EI
  {
    id: "eierbrot",
    name: "Eierbrot – der Klassiker",
    ingredients: ["Ei"],
    time: 5,
    satiety: 3,
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2"
  },
  {
    id: "eierbrot_fruehzw",
    name: "Eierbrot mit Frühlingszwiebel",
    ingredients: ["Ei", "Frühlingszwiebeln"],
    time: 5,
    satiety: 3,
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8"
  },
  {
    id: "eierbrot_rotezw",
    name: "Eierbrot mit roter Zwiebel",
    ingredients: ["Ei", "Rote Zwiebeln"],
    time: 5,
    satiety: 3,
    image: "https://images.unsplash.com/photo-1506086679525-9b6c58b2b7e8"
  },
  {
    id: "eierbrot_kaese",
    name: "Eierbrot mit Käse",
    ingredients: ["Ei", "Käse"],
    time: 5,
    satiety: 3,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947"
  },
  {
    id: "ei_topfen",
    name: "Ei-Topfen-Aufstrich",
    ingredients: ["Ei", "Topfen"],
    time: 5,
    satiety: 3,
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b"
  },

  // 🧀 TOPFEN & HÜTTENKÄSE
  {
    id: "topfen_pur",
    name: "Topfen-Kraftbrot",
    ingredients: ["Topfen"],
    time: 2,
    satiety: 3,
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe"
  },
  {
    id: "topfen_fruehzw",
    name: "Topfen mit Frühlingszwiebel",
    ingredients: ["Topfen", "Frühlingszwiebeln"],
    time: 2,
    satiety: 3,
    image: "https://images.unsplash.com/photo-1585238342028-4bbc3e6f9b4b"
  },
  {
    id: "topfen_paprika",
    name: "Topfen mit Paprika",
    ingredients: ["Topfen", "Paprika"],
    time: 2,
    satiety: 2,
    image: "https://images.unsplash.com/photo-1604908177522-4293c91e3c52"
  },
  {
    id: "huettenkaese_pur",
    name: "Hüttenkäse pur",
    ingredients: ["Hüttenkäse"],
    time: 2,
    satiety: 2,
    image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0"
  },
  {
    id: "huettenkaese_gurke",
    name: "Hüttenkäse mit Gurke",
    ingredients: ["Hüttenkäse", "Gurke"],
    time: 2,
    satiety: 2,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994"
  },

  // 🥑 PFLANZLICH
  {
    id: "avocado_pur",
    name: "Avocado pur",
    ingredients: ["Avocado"],
    time: 2,
    satiety: 2,
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8"
  },
  {
    id: "avocado_rotezw",
    name: "Avocado mit roter Zwiebel",
    ingredients: ["Avocado", "Rote Zwiebeln"],
    time: 2,
    satiety: 2,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
  },
  {
    id: "hummus_pur",
    name: "Hummus pur",
    ingredients: ["Hummus"],
    time: 2,
    satiety: 2,
    image: "https://images.unsplash.com/photo-1598514982205-fb0d1a46a9b0"
  },
  {
    id: "hummus_paprika",
    name: "Hummus mit Paprika",
    ingredients: ["Hummus", "Paprika"],
    time: 2,
    satiety: 2,
    image: "https://images.unsplash.com/photo-1604908177522-4293c91e3c52"
  },

  // 🧀 KÄSE
  {
    id: "kaese_pur",
    name: "Käsebrot",
    ingredients: ["Käse"],
    time: 2,
    satiety: 3,
    image: "https://images.unsplash.com/photo-1542831371-d531d36971e6"
  },
  {
    id: "kaese_fruehzw",
    name: "Käse mit Frühlingszwiebel",
    ingredients: ["Käse", "Frühlingszwiebeln"],
    time: 2,
    satiety: 3,
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8"
  }
];


// ===== BUTTON =====
document.getElementById("showRecipes").onclick = () => {
  const selection = document.getElementById("selection");
if (selection) {
  selection.style.display = "none";
}
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
    card.style.cursor = "pointer";

    const isFav = favorites.includes(recipe.id);

    card.innerHTML = `
      ${isFav ? `<div class="fav-badge">⭐</div>` : ""}

      <img src="${recipe.image}">
      <div class="content">
        <strong>${recipe.name}</strong><br>
        <span style="opacity:.7">
          ⏱ ${recipe.time} min &nbsp; ${"🔥".repeat(recipe.satiety)}
        </span>
      </div>
    `;

    // ⭐ Badge
    const badge = card.querySelector(".fav-badge");

if (badge) {
  badge.onclick = (e) => {
    e.stopPropagation();

    if (favorites.includes(recipe.id)) {
      favorites = favorites.filter(f => f !== recipe.id);
    } else {
      favorites.push(recipe.id);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    document.getElementById("showRecipes").click();
  };
}


    // Detail
    card.onclick = () => openRecipeDetail(recipe);

    results.appendChild(card);
  });

  if (!found) {
    results.innerHTML += "<p style='opacity:.6'>Heute nichts direkt machbar.</p>";
  }

  document.body.appendChild(results);
};

// ===== DETAIL =====
function openRecipeDetail(recipe) {
  const overlay = document.createElement("div");
  overlay.id = "recipe-detail";

  overlay.innerHTML = `
  <div class="detail-content">

    <div class="detail-image">
      <img src="${recipe.image}" alt="${recipe.name}" />
      <div class="close-btn">✕</div>
    </div>

    <div class="detail-header">
      <h2>${recipe.name}</h2>
      <div class="fav-inline" id="detail-fav">
        ${favorites.includes(recipe.id) ? "⭐" : "☆"}
      </div>
    </div>
    ...
`;

  overlay.querySelector(".close-btn").onclick = () => overlay.remove();

  const favBtn = overlay.querySelector("#detail-fav");
  favBtn.onclick = () => {
    if (favorites.includes(recipe.id)) {
      favorites = favorites.filter(f => f !== recipe.id);
      favBtn.textContent = "☆";
    } else {
      favorites.push(recipe.id);
      favBtn.textContent = "⭐";
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  document.body.appendChild(overlay);
}



  overlay.querySelector(".close-btn").onclick = () => overlay.remove();
  document.body.appendChild(overlay);
});