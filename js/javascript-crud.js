let pizzas = [
  { pname: "Áfonyás",   categoryname: "king",   vegetarian: 0 },
  { pname: "Csupa sajt",categoryname: "knight", vegetarian: 1 },
  { pname: "Gombás",    categoryname: "page",   vegetarian: 1 },
  { pname: "Hawaii",    categoryname: "nobleman", vegetarian: 0 },
  { pname: "Kétszínű",  categoryname: "knight", vegetarian: 0 }
];

const tbody = document.querySelector('#pizzaTable tbody');
const form = document.getElementById('pizzaForm');
const pnameInput = document.getElementById('pname');
const categoryInput = document.getElementById('categoryname');
const vegInput = document.getElementById('vegetarian');
const editIndexInput = document.getElementById('editIndex');

function renderTable() {
  tbody.innerHTML = '';
  pizzas.forEach((pizza, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${pizza.pname}</td>
      <td>${pizza.categoryname}</td>
      <td>${pizza.vegetarian ? 'Yes' : 'No'}</td>
      <td>
        <button onclick="editPizza(${index})">Edit</button>
        <button onclick="deletePizza(${index})">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function editPizza(index) {
  const p = pizzas[index];
  pnameInput.value = p.pname;
  categoryInput.value = p.categoryname;
  vegInput.checked = p.vegetarian == 1;
  editIndexInput.value = index;
}

function deletePizza(index) {
  pizzas.splice(index, 1);
  renderTable();
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  
  const pData = {
    pname: pnameInput.value,
    categoryname: categoryInput.value,
    vegetarian: vegInput.checked ? 1 : 0
  };

  const idx = editIndexInput.value;
  if (idx !== "") {
    pizzas[idx] = pData;
    editIndexInput.value = "";
  } else {
    pizzas.push(pData);
  }
  
  form.reset();
  renderTable();
});

// Initial render
renderTable();
