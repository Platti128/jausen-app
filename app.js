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
  {
    id: "eierbrot",
    name: "Eierbrot klassisch",
    ingredients: ["Ei", "Brot"],
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2",
    steps: [
      "Ei 8–9 Minuten hart kochen",
      "Brot aufschneiden",
      "Ei schälen und zerdrücken",
      "Salzen, pfeffern, aufs Brot streichen"
    ],
    satiety: 3
  },
  {
    id: "eierbrot_zwiebel",
    name: "Eierbrot mit Zwiebel",
    ingredients: ["Ei", "Brot", "Rote Zwiebeln"],
    image: "https://images.unsplash.com/photo-1506086679525-9b6c58b2b7e8",
    steps: [
      "Ei hart kochen",
      "Zwiebel fein schneiden",
      "Ei zerdrücken und mit Zwiebel mischen",
      "Würzen und aufs Brot"
    ],
    satiety: 3
  },
  {
    id: "ei_topfen",
    name: "Ei-Topfen-Aufstrich",
    ingredients: ["Ei", "Topfen"],
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b",
    steps: [
      "Ei hart kochen",
      "Ei klein schneiden",
      "Mit Topfen vermengen",
      "Salz & Pfeffer nach Geschmack"
    ],
    satiety: 3
  },
  {
    id: "topfen_pur",
    name: "Topfen pur",
    ingredients: ["Topfen"],
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
    steps: [
      "Topfen in Schüssel geben",
      "Salz & Pfeffer einrühren",
      "Auf Brot streichen"
    ],
    satiety: 3
  },
  {
    id: "topfen_fruehzw",
    name: "Topfen mit Frühlingszwiebel",
    ingredients: ["Topfen", "Frühlingszwiebeln"],
    image: "https://images.unsplash.com/photo-1585238342028-4bbc3e6f9b4b",
    steps: [
      "Frühlingszwiebel fein schneiden",
      "Mit Topfen vermengen",
      "Würzen, fertig"
    ],
    satiety: 3
  },
  {
    id: "huettenkaese_gurke",
    name: "Hüttenkäse mit Gurke",
    ingredients: ["Hüttenkäse", "Gurke"],
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    steps: [
      "Gurke klein würfeln",
      "Mit Hüttenkäse mischen",
      "Salz & Pfeffer dazu"
    ],
    satiety: 2
  },
  {
    id: "avocado_pur",
    name: "Avocado pur",
    ingredients: ["Avocado"],
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8",
    steps: [
      "Avocado halbieren",
      "Fruchtfleisch zerdrücken",
      "Salzen & aufs Brot"
    ],
    satiety: 2
  },
  {
    id: "avocado_zwiebel",
    name: "Avocado mit Zwiebel",
    ingredients: ["Avocado", "Rote Zwiebeln"],
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    steps: [
      "Avocado zerdrücken",
      "Zwiebel fein schneiden",
      "Mischen & würzen"
    ],
    satiety: 2
  },
  {
    id: "kaese_pur",
    name: "Käsebrot",
    ingredients: ["Käse", "Brot"],
    image: "https://images.unsplash.com/photo-1542831371-d531d36971e6",
    steps: [
      "Brot aufschneiden",
      "Käse drauflegen",
      "Fertig"
    ],
    satiety: 3
  },
  {
    id: "kaese_fruehzw",
    name: "Käse mit Frühlingszwiebel",
    ingredients: ["Käse", "Frühlingszwiebeln"],
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8",
    steps: [
      "Frühlingszwiebel schneiden",
      "Käse belegen",
      "Zwiebel drauf"
    ],
    satiety: 3
  },
  {
    id: "hummus_pur",
    name: "Hummus pur",
    ingredients: ["Hummus"],
    image: "https://images.unsplash.com/photo-1598514982205-fb0d1a46a9b0",
    steps: [
      "Hummus aus Packung nehmen",
      "Auf Brot streichen"
    ],
    satiety: 2
  },
  {
    id: "hummus_gemuese",
    name: "Hummus mit Gemüse",
    ingredients: ["Hummus", "Gurke"],
    image: "https://images.unsplash.com/photo-1604908177522-4293c91e3c52",
    steps: [
      "Gurke klein schneiden",
      "Mit Hummus kombinieren",
      "Fertig"
    ],
    satiety: 2
  },
  {
    id: "ei_kaese",
    name: "Ei mit Käse",
    ingredients: ["Ei", "Käse"],
    image: "https://images.unsplash.com/photo-1544025162-d76694265947",
    steps: [
      "Ei hart kochen",
      "Ei schneiden",
      "Mit Käse aufs Brot"
    ],
    satiety: 3
  },
  {
    id: "ei_avocado",
    name: "Ei mit Avocado",
    ingredients: ["Ei", "Avocado"],
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8",
    steps: [
      "Ei hart kochen",
      "Avocado zerdrücken",
      "Zusammen aufs Brot"
    ],
    satiety: 3
  },
  {
    id: "topfen_tomate",
    name: "Topfen mit Tomate",
    ingredients: ["Topfen", "Tomate"],
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
    steps: [
      "Tomate klein schneiden",
      "Mit Topfen vermengen",
      "Würzen"
    ],
    satiety: 2
  }
  
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
