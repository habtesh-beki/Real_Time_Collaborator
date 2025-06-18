import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App.tsx";
import "./index.css";

// import "@excalidraw/excalidraw/index.css";
// import type * as TExcalidraw from "@excalidraw/excalidraw";

// declare global {
//   interface Window {
//     ExcalidrawLib: typeof TExcalidraw;
//   }
// }

// const { Excalidraw } = window.ExcalidrawLib;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App
    //  useCustom={(api: any, args?: any[]) => {}}
    //  excalidrawLib={window.ExcalidrawLib}
    />
    {/* </App> */}
  </StrictMode>
);
