import React, { useState } from 'react';

export default function Calculator() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [result, setResult] = useState(0);

  return (
    <div>
      <h2>Calculator App</h2>
      <input type="number" value={num1} onChange={e => setNum1(Number(e.target.value))} />
      <input type="number" value={num2} onChange={e => setNum2(Number(e.target.value))} />
      <button onClick={() => setResult(num1 + num2)}>+</button>
      <button onClick={() => setResult(num1 - num2)}>-</button>
      <div>Result: {result}</div>
    </div>
  );
}
