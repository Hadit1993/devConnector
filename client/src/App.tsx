import { BrowserRouter } from "react-router-dom";
import "./App.css";

import Footer from "./components/layout/Footer";

import NavbAr from "./components/layout/NavBar";

import DistrictedRoute from "./components/common/DistrictedRoute";
import useAppRoutes from "./hooks/useAppRoutes";
import useAppInit from "./hooks/useAppInit";

function App() {
  useAppInit();

  const appRoutes = useAppRoutes();

  return (
    <BrowserRouter>
      <div
        className="App"
        style={{
          display: "flex",
          flexDirection: "column",

          minHeight: "100vh",
        }}
      >
        <NavbAr />

        <div style={{ display: "flex", flexGrow: 1, flexDirection: "column" }}>
          {appRoutes.map((route) => (
            <DistrictedRoute {...route} />
          ))}
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
