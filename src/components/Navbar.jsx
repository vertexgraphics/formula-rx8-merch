import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/shirts">Shirts</Link>
        <Link to="/hoodies">Hoodies</Link>
        <Link to="/hats">Hats</Link>
        <Link to="/beanies">Beanies</Link>
        <Link to="/stubbycoolers">Stubby Coolers</Link>
      <Link to="/stickers">Stickers</Link>

        {user ? (
          <>
            <Link to="/account">My Account</Link>

            {profile?.role === "admin" && (
              <Link to="/admin/logo-approvals">Admin</Link>
            )}

            <button className="nav-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;