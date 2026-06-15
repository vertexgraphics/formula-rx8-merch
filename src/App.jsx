import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import Shirts from "./pages/Shirts";
import Hoodies from "./pages/Hoodies";
import Hats from "./pages/Hats";
import Beanies from "./pages/Beanies";
import StubbyCoolers from "./pages/StubbyCoolers";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import StickerLogoUpload from "./pages/StickerLogoUpload";
import AdminLogoApprovals from "./pages/AdminLogoApprovals";
import Stickers from "./pages/Stickers";

import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shirts" element={<Shirts />} />
          <Route path="/hoodies" element={<Hoodies />} />
          <Route path="/hats" element={<Hats />} />
          <Route path="/beanies" element={<Beanies />} />
          <Route path="/stubbycoolers" element={<StubbyCoolers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/stickers" element={<Stickers />} />
          <Route path="/stickers/upload-logo" element={<StickerLogoUpload />} />
          <Route path="/admin/logo-approvals" element={<AdminLogoApprovals />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;