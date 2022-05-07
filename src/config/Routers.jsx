import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../container/home/Home";
import Catalog from "../container/catalog/Catalog";
import Detail from "../container/detail/Detail";
import Friends from "../container/friends/Friends";
import Parties from "../container/parties/Parties";
import Media from "../container/media/Media";
import LogOut from "../container/log-out/LogOut";
import Setting from "../container/setting/Setting";
import Discover from "../container/discover/Discover";
import NowPlaying from "../container/now-playing/NowPlaying";
import SignIn from "../components/sign-in/SignIn";
import SignUp from "../components/sign-up/SignUp";

const Routers = () => {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />

      <Route path="/" element={<Home />} />
      <Route path="/:category" element={<Home />} />
      <Route path="/:category/search/:keywords" element={<Catalog />} />
      <Route path="/:category/:id" element={<Detail />} />
      <Route path="/catalog/:category" element={<Catalog />} />
      <Route path="/discover/:category" element={<Discover />} />
      <Route path="/nowplaying/:category" element={<NowPlaying />} />
      <Route path="/friends" element={<Friends />} />
      <Route path="/parties" element={<Parties />} />
      <Route path="/media" element={<Media />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/logout" element={<Home />} />
    </Routes>
  );
};

export default Routers;
