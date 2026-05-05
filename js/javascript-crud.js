const API_URL = "php/pizza_api.php";

let pizzas = [];

const tbody = document.querySelector("#pizzaTable tbody");
const form = document.getElementById("pizzaForm");
const pnameInput = document.getElementById("pname");
const categoryInput = document.getElementById("categoryname");
const vegInput = document.getElementById("vegetarian");
const editIndexInput = document.getElementById("editIndex");

async function loadPizzas() {
  const res = await fetch(API_URL);
  pizzas = await res.json();
  renderTable();
}

function renderTable() {
  tbody.innerHTML = "";

  pizzas.forEach((pizza, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${pizza.pname}</td>
      <td>${pizza.categoryname}</td>
      <td>${pizza.vegetarian == 1 ? "Yes" : "No"}</td>
      <td>
        <button onclick="editPizza(${index})">Edit</button>
        <button onclick="deletePizza('${encodeURIComponent(pizza.pname)}')">Delete</button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

function editPizza(index) {
  const p = pizzas[index];

  pnameInput.value = p.pname;
  pnameInput.disabled = true;
  categoryInput.value = p.categoryname;
  vegInput.checked = p.vegetarian == 1;
  editIndexInput.value = index;
}

async function deletePizza(encodedName) {
  const pname = decodeURIComponent(encodedName);

  await fetch(`${API_URL}?pname=${encodeURIComponent(pname)}`, {
    method: "DELETE"
  });

  await loadPizzas();
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const payload = {
    pname: pnameInput.value,
    categoryname: categoryInput.value,
    vegetarian: vegInput.checked ? 1 : 0
  };

  const method = editIndexInput.value !== "" ? "PUT" : "POST";

  await fetch(API_URL, {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  form.reset();
  pnameInput.disabled = false;
  editIndexInput.value = "";

  await loadPizzas();
});

loadPizzas();