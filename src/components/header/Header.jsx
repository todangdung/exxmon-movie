import { useContext, useRef, useState, useEffect, useCallback } from "react";

import { auth } from "../../firebase/config";

import { Link, useLocation, useParams } from "react-router-dom";
import "./header.scss";

import { AuthContext } from "../../context/AuthProvider";
import { signOut } from "firebase/auth";
const menu = [
  {
    display: "TV Series",
    path: "/tv",
  },
  {
    display: "Movies",
    path: "/movie",
  },
  {
    display: "Animes",
    path: "/animes",
  },
];

const Header = (props) => {
  const { user } = useContext(AuthContext);
  const { pathname } = useLocation();
  const [login, setLogin] = useState(false);

  const personRef = useRef(null);

  const checkPage = menu.findIndex((e) => e.path === pathname);

  const { category } = useParams();

  const activeMenu = menu.findIndex((e) => e.path === `/${category}`);

  const check = props.path;

  /* const photoImage =
    user.photoURL + "?height=500&access_token=" + user.accessToken; */

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      setLogin(true);
    }
  }, [user]);

  const checkLogin = useCallback(() => {
    personRef.current.classList.toggle("active");
  }, []);

  useEffect(() => {
    const close = (e) => {
      if (e.path[3].id !== "person") {
        personRef.current.classList.remove("active");
      }
    };

    document.body.addEventListener("click", close);

    return () => document.body.removeEventListener("click", close);
  }, []);

  return (
    <div className="header">
      <div className="header__item">
        {menu.map((item, index) => (
          <Link
            to={check ? `/${props.path + item.path}` : item.path}
            key={index}
          >
            <div
              className={`header__item__content ${
                activeMenu === index ? "active" : ""
              }`}
            >
              <h3 className="title">{item.display}</h3>
            </div>
          </Link>
        ))}
      </div>
      {checkPage !== -1 && (
        <div id="person" className="header__person" onClick={checkLogin}>
          <div className="header__person__info">
            <div className="header__person__info__avatar">
              <img
                src={
                  user.photoURL
                    ? user.photoURL
                    : "https://graph.facebook.com/1170058490434977/picture"
                }
                alt=""
              />
            </div>
            <div className="header__person__info__name">
              {user.displayName ? user.displayName : ""}
            </div>
          </div>
          <div className="header__person__login" ref={personRef}>
            {login ? (
              <>
                <div className="email">{user?.email}</div>
                <div
                  className="logout"
                  onClick={() => {
                    signOut(auth);
                    window.location.reload();
                  }}
                >
                  Logout
                </div>
              </>
            ) : (
              <Link to="/sign-in">Login</Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
