import React from "react";
import { Link } from "react-router-dom";
import "./footer.scss";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__logo">
        <div className="left-side__logo header-height">
          <Link to="/">
            <div className="left-side__logo__img">
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
      <div className="footer__content">
        <div className="footer__content__item">
          <Link to="/">Home</Link>
          <Link to="/">Contact us</Link>
          <Link to="/">Term of services</Link>
          <Link to="/">About us</Link>
        </div>
        <div className="footer__content__item">
          <Link to="/">Live</Link>
          <Link to="/">FAQ</Link>
          <Link to="/">Premium</Link>
          <Link to="/">Privacy policy</Link>
        </div>
        <div className="footer__content__item">
          <Link to="/">You must watch</Link>
          <Link to="/">Recent release</Link>
          <Link to="/">Top IMDB</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
