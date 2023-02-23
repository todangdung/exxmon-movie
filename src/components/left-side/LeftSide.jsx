import { signOut } from "firebase/auth";
import React, { useEffect, useState, useCallback } from "react";

import { Link, useLocation } from "react-router-dom";
import { auth } from "../../firebase/config";

import "./left-side.scss";

const home = {
    display: "Home",
    path: "/movie",
    icon: "bi bi-house",
};

const menu = [
    {
        display: "Catalog",
        path: "/catalog/movie",
        icon: "bi bi-hospital",
    },
    {
        display: "Discover",
        path: "/discover/movie",
        icon: "bi bi-compass",
    },
    {
        display: "Now playing",
        path: "/nowplaying/movie",
        icon: "bi bi-alarm",
    },
];

const social = [
    {
        display: "Friends",
        path: "/friends",
        icon: "bi bi-person",
    },
    {
        display: "Parties",
        path: "/parties",
        icon: "bi bi-postcard-heart",
    },
    {
        display: "Media",
        path: "/media",
        icon: "bi bi-record-circle",
    },
];

const general = [
    {
        display: "Setting",
        path: "/setting",
        icon: "bi bi-gear",
        id: "setting",
    },
    {
        display: "Log out",
        path: "/",
        icon: "bi bi-box-arrow-right",
        id: "logout",
    },
];

const LeftSide = () => {
    const [active, setActive] = useState(false);

    const handelToggleMobile = useCallback(() => {
        if (!active) {
            document.getElementById("sidebar").classList.remove("active");
        }
    }, [active]);

    useEffect(() => {
        const close = (e) => {
            if (e.srcElement.id !== "toggle") {
                setActive(false);
                handelToggleMobile();
            }
        };

        document.body.addEventListener("click", close);

        return () => document.body.removeEventListener("click", close);
    }, [handelToggleMobile]);

    const { pathname } = useLocation();

    const menuActive = menu.findIndex((e) =>
        pathname.includes(e.path.slice(0, 8))
    );

    const socialActive = social.findIndex((e) => e.path === pathname);
    const generalActive = general.findIndex((e) => e.path === pathname);

    const handelLogout = useCallback(() => {
        alert("Do you want to sign out?");
        signOut(auth);
        alert("You are logged out, please reload the page to continue");
    }, []);

    useEffect(() => {
        const logoutElement = document.getElementById("logout");

        logoutElement.addEventListener("click", handelLogout);
    }, [handelLogout]);

    return (
        <>
            <div className={`left-side`} id="sidebar">
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
                <div className="left-side__item">
                    <div className="left-side__item__header section-header">
                        <span className="title">MENU</span>
                    </div>
                    <Link to={home.path}>
                        <div
                            className={`left-side__item__menu ${
                                pathname === "/movie" ||
                                pathname === "/tv" ||
                                pathname === "/animes" ||
                                pathname === "/"
                                    ? "active"
                                    : ""
                            }`}
                        >
                            <div className="left-side__item__menu__icon">
                                <i className={home.icon}></i>
                            </div>
                            <div className="left-side__item__menu__content">
                                {home.display}
                            </div>
                        </div>
                    </Link>
                    {menu.map((item, index) => (
                        <Link to={item.path} key={index}>
                            <div
                                className={`left-side__item__menu ${
                                    menuActive === index ? "active" : ""
                                }`}
                            >
                                <div className="left-side__item__menu__icon">
                                    <i className={item.icon}></i>
                                </div>
                                <div className="left-side__item__menu__content">
                                    {item.display}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="left-side__item">
                    <div className="left-side__item__header section-header">
                        <span className="title">Social</span>
                    </div>
                    {social.map((item, index) => (
                        <Link to={item.path} key={index}>
                            <div
                                className={`left-side__item__menu ${
                                    socialActive === index ? "active" : ""
                                }`}
                            >
                                <div className="left-side__item__menu__icon">
                                    <i className={item.icon}></i>
                                </div>
                                <div className="left-side__item__menu__content">
                                    {item.display}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="left-side__item">
                    <div className="left-side__item__header section-header">
                        <span className="title">General</span>
                    </div>

                    {general.map((item, index) => (
                        <Link to={item.path} key={index}>
                            <div
                                className={`left-side__item__menu ${
                                    generalActive === index ? "active" : ""
                                }`}
                                id={item.id}
                            >
                                <div className="left-side__item__menu__icon">
                                    <i className={item.icon}></i>
                                </div>
                                <div className="left-side__item__menu__content">
                                    {item.display}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default LeftSide;
