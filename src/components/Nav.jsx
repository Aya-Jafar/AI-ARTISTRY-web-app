import React, { useState, useEffect, useRef, useContext } from "react";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import NavBtn from "./NavBtn";
import AuthContext from "../providers/Auth";
import UserSection from "./UserSection";
import AuthPopupContext from "../providers/AuthPopup";
import logoutIcon from "../images/logout.png";
import { linkStyles, navGapSetter } from "../utils/styleSetter";

function Nav() {
  const { currentUser, signOutUser } = useContext(AuthContext);

  const [showUserSection, setShowUserSection] = useState(false);

  const [menuActive, setMenuActive] = useState(false);

  const [hoveredLogout, setHoveredLogout] = useState(false);

  const toggleMenu = () => setMenuActive(!menuActive);

  useEffect(() => {
    currentUser ? setShowUserSection(true) : setShowUserSection(false);
  }, [currentUser]);

  return (
    <>
      <div className="nav">
        <div>
          <Link to="/" style={{ ...linkStyles }}>
            {/* <img src={logo} alt="" id="logo"/> */}
            <strong className="nav-title">{"ai Artistry".toUpperCase()}</strong>
          </Link>
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          <FaBars />
        </div>

        <div className="nav-links" style={navGapSetter(currentUser)}>
          
          <Link to="/imagine" style={{ ...linkStyles }}>
            <div className="nav-link">{"Imagine".toUpperCase()}</div>
          </Link>

          <div className="nav-link">CONTACT US</div>
          {showUserSection ? (
            <>
              <UserSection />
              <div
                className="logout-section"
                onMouseOver={() => setHoveredLogout(true)}
                onMouseLeave={() => setHoveredLogout(false)}
              >
                <img
                  src={logoutIcon}
                  alt=""
                  className="logout-btn"
                  onClick={signOutUser}
                />
                {hoveredLogout && <p onClick={signOutUser}>Log out</p>}
              </div>
            </>
          ) : (
            <div className="nav-btns">
              <NavBtn path="/signup" text="SIGN UP" id="sign-up" />
              <NavBtn path="/login" text="LOG IN" id="login" />
            </div>
          )}
        </div>
      </div>

      <div class={menuActive ? "drop-down-menu open" : "drop-down-menu"}>
        <li>
          <Link
            to="/imagine"
            style={{ textDecoration: "none", color: "white" }}
          >
            <div className="nav-link">IMAGINE</div>
          </Link>
        </li>
        <li>
          <div href="#">CONTACT US</div>
        </li>
        {/* TODO: Fix mobile size auth buttons issue */}

        {/* <NavBtn path="/signup" text="SIGN UP" id="sign-up" /> */}

        {/* <li>
          <UserSection
            toggleSignupPopup
            setSignupPopup
            signupPopup
            toggleLoginPopup
            setLoginPopup
            loginPopup
          />
        </li> */}
      </div>
    </>
  );
}

export default Nav;
