document.addEventListener("DOMContentLoaded", () => {
  const ingredients = ["Ei", "Topfen", "Butter"];

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
    alert("Button funktioniert");
  };
});
