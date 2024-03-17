import { useState } from "react";
import "./App.css";

function App() {
  const [result, setResult] = useState("");

  return (
    <>
      <div className="App">
        <h1>EXPENSES APP</h1>

        <button
          onClick={async () => {
            const res = await fetch("https://expndeploy.onrender.com/ping");
            const data = await res.json();
            console.log(data);
            setResult(data);
          }}
        >
          Add Expense
        </button>

        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    </>
  );
}

export default App;
