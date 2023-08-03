import "./css/index.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

// pages
import Home from "./pages/Home"
import Create from "./pages/Create"
import Update from "./pages/Update"

function App() {
  return (
    <BrowserRouter>
      <nav>
        <h1>Employee database CRUD - By Federico Aguirre</h1>
        <Link to="/">Home</Link>
        <Link to="/create">Add employee info</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;