import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../main";
import logo from "/lg1.png";
import "../styles/Navbar.css";

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="ZeeCare Medical Institute" className="logo-img" />
        </Link>
      </div>
      <div className={`navLinks ${isOpen ? "open" : ""}`}>
        <div className="links">
          <Link to="/" className="link" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/appointment" className="link" onClick={toggleMenu}>
            Appointment
          </Link>
          <Link to="/about" className="link" onClick={toggleMenu}>
            About
          </Link>
        </div>
        <div className="buttons">
          {isAuthenticated ? (
            <button onClick={() => {handleLogout(); toggleMenu();}} className="logoutBtn btn">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="loginBtn btn" onClick={toggleMenu}>
                Login
              </Link>
              <Link to="/register" className="registerBtn btn" onClick={toggleMenu}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>
    </nav>
  );
};

export default Navbar;
