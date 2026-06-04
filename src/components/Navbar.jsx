import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">

      <nav className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/shirts">Shirts</NavLink>
        <NavLink to="/hoodies">Hoodies</NavLink>
        <NavLink to="/hats">Hats</NavLink>
      </nav>
    </header>
  );
}

export default Navbar;