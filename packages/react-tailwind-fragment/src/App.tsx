import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./main.css";
import "./App.css";
import { registerTopic } from "./event-bus";

function App() {
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const countTopic = registerTopic<number>("totalCountTopic", {
    type: "number",
  });
  useEffect(() => countTopic.subscribe(setTotalCount), []);

  return (
    <div id="react-tailwind-fragment">
      <div className="flex flex-row gap-4 justify-center">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-3xl font-bold underline">
        Vite + React + Tailwind CSS
      </h1>
      <div className="card">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setCount((count) => count + 1);
            countTopic.publish(totalCount + 1);
          }}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div className="card flex justify-center">
        Total count is {totalCount}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
