import React, { useEffect, useState } from "react";
import "./Nav.css";
import netflix from "./750_netflix-removebg-preview.png";
import netflixAvatar from "./netflix.png";

function Nav() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) setShow(true);
      else setShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img src={netflix} alt="Netflix Logo" className="nav__logo" />
      <img src={netflixAvatar} alt="EssFlix Logo" className="nav__avatar" />
    </div>
  );
}

export default Nav;
