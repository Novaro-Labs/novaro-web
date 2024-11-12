import { RouterProvider } from "react-router-dom";
import "./global.css";
import router from "./router/index.tsx";

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
