// ----------------------------
// 📘 Unit Converter App Logic
// ----------------------------

// Referencias principales
const convertBtn = document.getElementById("convert-btn");
const resetBtn = document.getElementById("reset-btn");
const inputPanel = document.getElementById("input-panel");
const resultPanel = document.getElementById("result-panel");
const resultText = document.getElementById("result-text");

const tabs = document.querySelectorAll(".tab");
let currentCategory = "length";

// ----------------------------
// 🔹 Unidades disponibles
// ----------------------------
const units = {
  length: [
    { value: "mm", label: "Millimeters (mm)" },
    { value: "cm", label: "Centimeters (cm)" },
    { value: "m", label: "Meters (m)" },
    { value: "km", label: "Kilometers (km)" },
    { value: "in", label: "Inches (in)" },
    { value: "ft", label: "Feet (ft)" },
    { value: "yd", label: "Yards (yd)" },
    { value: "mi", label: "Miles (mi)" }
],
weight: [
    { value: "mg", label: "Milligrams (mg)" },
    { value: "g", label: "Grams (g)" },
    { value: "kg", label: "Kilograms (kg)" },
    { value: "lb", label: "Pounds (lb)" },
    { value: "oz", label: "Ounces (oz)" }
  ],
  temperature: [
    { value: "C", label: "Celsius (°C)" },
    { value: "F", label: "Fahrenheit (°F)" },
    { value: "K", label: "Kelvin (K)" }
  ]
};

// Inicializa selects con las unidades de longitud
loadUnits("length");

// Manejo de pestañas
tabs.forEach(tab => {
  tab.addEventListener("click", e => {
    e.preventDefault();
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    if (tab.id.includes("length")) currentCategory = "length";
    if (tab.id.includes("weight")) currentCategory = "weight";
    if (tab.id.includes("temp")) currentCategory = "temperature";

    loadUnits(currentCategory);
  });
});

// Cargar opciones en los selects según categoría
function loadUnits(category) {
  const fromSelect = document.getElementById("from-unit");
  const toSelect = document.getElementById("to-unit");

  fromSelect.innerHTML = "";
  toSelect.innerHTML = "";

  units[category].forEach(u => {
    const opt1 = document.createElement("option");
    opt1.value = u.value;
    opt1.textContent = u.label;

    const opt2 = document.createElement("option");
    opt2.value = u.value;
    opt2.textContent = u.label;

    fromSelect.appendChild(opt1);
    toSelect.appendChild(opt2);
  });
}

// ----------------------------
// 🔹 Conversión general
// ----------------------------
convertBtn.addEventListener("click", () => {
  const value = parseFloat(document.getElementById("value").value);
  const from = document.getElementById("from-unit").value;
  const to = document.getElementById("to-unit").value;

  if (isNaN(value)) {
    alert("Please enter a valid number.");
    return;
  }

  let converted;

  switch (currentCategory) {
    case "length":
      converted = convertLength(value, from, to);
      break;
    case "weight":
      converted = convertWeight(value, from, to);
      break;
    case "temperature":
      converted = convertTemperature(value, from, to);
      break;
    default:
      converted = "N/A";
  }

  resultText.innerHTML = `
    Result of your calculation<br>
    <span style="font-size:22px;">${value} ${from} = ${converted} ${to}</span>
  `;

  inputPanel.classList.add("hidden");
  resultPanel.classList.remove("hidden");
});

// ----------------------------
// 🔹 Botón Reset
// ----------------------------
resetBtn.addEventListener("click", () => {
  inputPanel.classList.remove("hidden");
  resultPanel.classList.add("hidden");
  document.getElementById("value").value = "";
});

// ----------------------------
// 🔹 Funciones de conversión
// ----------------------------
function convertLength(value, from, to) {
  const factors = {
    mm: 0.001,
    cm: 0.01,
    m: 1,
    km: 1000,
    in: 0.0254,
    ft: 0.3048,
    yd: 0.9144,
    mi: 1609.34
  };
  const meters = value * factors[from];
  return parseFloat((meters / factors[to]).toFixed(4));
}

function convertWeight(value, from, to) {
  const factors = {
    mg: 0.001,
    g: 1,
    kg: 1000,
    lb: 453.592,
    oz: 28.3495
  };
  const grams = value * factors[from];
  return parseFloat((grams / factors[to]).toFixed(4));
}

function convertTemperature(value, from, to) {
  let result = value;

  // Convertir a Celsius primero
  if (from === "F") result = (value - 32) * 5/9;
  if (from === "K") result = value - 273.15;

  // Luego convertir de Celsius a destino
  if (to === "F") result = result * 9/5 + 32;
  if (to === "K") result = result + 273.15;

  return parseFloat(result.toFixed(2));
}
