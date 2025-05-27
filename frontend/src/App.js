import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Register from "./pages/Register.js";
import { CartProvider } from "./components/ContextReducer.js";

function App() {
  return (
    <CartProvider>
      <Router>
        <>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
        </>
      </Router>
    </CartProvider>
  );
}

export default App;
