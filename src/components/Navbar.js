import React, { useState } from "react";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  return (
    <>
      <nav className="main-nav">
        {/* 1st logo part  */}
        <div className="logo">
          <h2>
            <span>S</span>tar
            <span>W</span>ars
          </h2>
        </div>

        {/* 2nd menu part  */}
        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/films">Films</NavLink>
            </li>
            <li>
              <NavLink to="/people">People</NavLink>
            </li>
            <li>
              <NavLink to="/planets">Planets</NavLink>
            </li>
            <li>
              <NavLink to="/starShips">Starships</NavLink>
            </li>
          </ul>
        </div>

        {/* 3rd social media links */}
        <div className="social-media">
          <ul className="social-media-desktop">
            <li>
              <a
                href="https://www.linkedin.com/in/mateen-rajput-193a50188/"
                target="_mateen">
                <FaLinkedin className="youtube" />
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/mateen.rajput.92/"
                target="_mateen">
                <FaFacebookSquare className="facebook" />
              </a>
            </li>
            <li>
              <a
                target="_mateen">
                <FaInstagramSquare className="instagram" />
              </a>
            </li>
          </ul>

          {/* hamburget menu start  */}
          <div className="hamburger-menu">
            <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
              <GiHamburgerMenu />
            </a>
          </div>
        </div>
      </nav>

      {/* hero section  */}
      {/* <section className="hero-section">
      </section> */}
    </>
  );
};

export default Navbar;
