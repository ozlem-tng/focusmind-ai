import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-title">FocusMind AI</div>
      <div className="navbar-links">
        <Link
          to="/"
          className={location.pathname === "/" ? "nav-link active" : "nav-link"}
        >
          Ana Sayfa
        </Link>

        <Link
          to="/veri-girisi"
          className={
            location.pathname === "/veri-girisi" ? "nav-link active" : "nav-link"
          }
        >
          Veri Girişi
        </Link>

        <Link
          to="/gecmis-kayitlar"
          className={
            location.pathname === "/gecmis-kayitlar"
              ? "nav-link active"
              : "nav-link"
          }
        >
          Geçmiş Kayıtlar
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;