import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Provider, ErrorBoundary } from "@rollbar/react";
import Rollbar from "rollbar/dist/rollbar.noconflict.umd.js";
import { getRollbarConfig } from "./getRollbarConfig";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const app = () => (
    <div id="react-fragment">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );

  const rollbarConfig = getRollbarConfig();
  if (!rollbarConfig) {
    return app();
  }

  const rollbar = new Rollbar(rollbarConfig);
  return (
    <Provider instance={rollbar}>
      <ErrorBoundary>{app()}</ErrorBoundary>
    </Provider>
  );
}

export default App;
