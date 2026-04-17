import React, { useState } from 'react';

const pizzas = [
  { name: "Áfonyás", category: "king" },
  { name: "Csupa sajt", category: "knight" },
  { name: "Gombás", category: "page" },
  { name: "Hawaii", category: "nobleman" }
];

export default function PizzaFilter() {
  const [filter, setFilter] = useState('');

  const filtered = pizzas.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <h2>Pizza Filter App</h2>
      <input 
        type="text" 
        placeholder="Filter by name..." 
        value={filter}
        onChange={e => setFilter(e.target.value)} 
      />
      <ul>
        {filtered.map((p, i) => <li key={i}>{p.name} ({p.category})</li>)}
      </ul>
    </div>
  );
}
