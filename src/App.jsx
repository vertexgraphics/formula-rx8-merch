import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import Shirts from "./pages/Shirts";
import Hoodies from "./pages/Hoodies";
import Hats from "./pages/Hats";
import Beanies from "./pages/Beanies";
import StubbyCoolers from "./pages/StubbyCoolers";
import Navbar from "./components/Navbar";
//import Support_the_series from "./pages/Support-the-series";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shirts" element={<Shirts />} />
        <Route path="/hoodies" element={<Hoodies />} />
        <Route path="/hats" element={<Hats />} />
        <Route path="/beanies" element={<Beanies />} />
        <Route path="/stubbycoolers" element={<StubbyCoolers />} />
        {/*<Route path="/support-the-series" element={<Support_the_series />} />*/}
      </Routes>
    </BrowserRouter>
  );
}

export default App;