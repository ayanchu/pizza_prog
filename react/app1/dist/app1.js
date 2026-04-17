const pizzas = [
  { name: "Áfonyás", category: "king" },
  { name: "Csupa sajt", category: "knight" },
  { name: "Gombás", category: "page" },
  { name: "Hawaii", category: "nobleman" }
];

function PizzaFilterApp() {
  const [filter, setFilter] = React.useState('');

  const filtered = pizzas.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));

  return React.createElement('div', null,
    React.createElement('h2', null, 'Pizza Filter App'),
    React.createElement('input', {
      type: 'text',
      placeholder: 'Filter by name...',
      value: filter,
      onChange: function (e) { setFilter(e.target.value); }
    }),
    React.createElement('ul', null,
      filtered.map(function (p, i) {
        return React.createElement('li', { key: i }, p.name + ' (' + p.category + ')');
      })
    )
  );
}

window.App1 = {
  root: null,
  mount: function (el) {
    if (this.root) {
      this.root.unmount();
    }
    el.innerHTML = '';
    this.root = ReactDOM.createRoot(el);
    this.root.render(React.createElement(PizzaFilterApp));
  }
};
