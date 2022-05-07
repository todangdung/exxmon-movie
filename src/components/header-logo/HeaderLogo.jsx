import React, { useCallback, useEffect } from "react";

import { Link } from "react-router-dom";

import "./header-logo.scss";

const HeaderLogo = () => {
  const setActive = useCallback(() => {
    document.getElementById("sidebar").classList.add("active");
  }, []);

  return (
    <>
      <div className="logo">
        <div className="mobile__toggle" id="toggle" onClick={() => setActive()}>
          <i className="bi bi-list " id="toggle"></i>
        </div>
        <div className="header-height header__logo">
          <Link to="/">
            <div className="header__logo__img">
              <i className="bi bi-film"></i>
            </div>
          </Link>
          <Link to="/">
            <div className="left-side__logo__title">
              <h3>Exxmon</h3>
              <span>.</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HeaderLogo;
