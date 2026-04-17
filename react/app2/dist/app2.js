function CalculatorApp() {
  const [num1, setNum1] = React.useState(0);
  const [num2, setNum2] = React.useState(0);
  const [result, setResult] = React.useState(0);

  return React.createElement('div', null,
    React.createElement('h2', null, 'Calculator App'),
    React.createElement('input', {
      type: 'number',
      value: num1,
      onChange: function (e) { setNum1(Number(e.target.value)); }
    }),
    React.createElement('input', {
      type: 'number',
      value: num2,
      onChange: function (e) { setNum2(Number(e.target.value)); }
    }),
    React.createElement('br'),
    React.createElement('button', { onClick: function () { setResult(num1 + num2); } }, '+'),
    React.createElement('button', { onClick: function () { setResult(num1 - num2); } }, '-'),
    React.createElement('div', null, 'Result: ', result)
  );
}

window.App2 = {
  root: null,
  mount: function (el) {
    if (this.root) {
      this.root.unmount();
    }
    el.innerHTML = '';
    this.root = ReactDOM.createRoot(el);
    this.root.render(React.createElement(CalculatorApp));
  }
};
