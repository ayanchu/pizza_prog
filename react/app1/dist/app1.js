function PizzaFilterApp() {
  const [pizzas, setPizzas] = React.useState([]);
  const [filter, setFilter] = React.useState("");

  React.useEffect(function () {
    fetch("php/pizza_api.php")
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        setPizzas(data);
      });
  }, []);

  const filtered = pizzas.filter(function (p) {
    return p.pname.toLowerCase().includes(filter.toLowerCase());
  });

  return React.createElement(
    "div",
    null,
    React.createElement("h2", null, "Pizza Filter App From Database"),

    React.createElement("input", {
      type: "text",
      placeholder: "Filter by name...",
      value: filter,
      onChange: function (e) {
        setFilter(e.target.value);
      }
    }),

    React.createElement(
      "ul",
      null,
      filtered.map(function (p) {
        return React.createElement(
          "li",
          { key: p.pname },
          p.pname +
            " (" +
            p.categoryname +
            ") - Vegetarian: " +
            (p.vegetarian == 1 ? "Yes" : "No")
        );
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

    el.innerHTML = "";
    this.root = ReactDOM.createRoot(el);
    this.root.render(React.createElement(PizzaFilterApp));
  }
};