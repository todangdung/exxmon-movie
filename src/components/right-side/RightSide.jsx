import React, { useState } from "react";
import "./right-side.scss";

import { category, movieType, tvType } from "../../api/movieApi";

import { Input, StandingList } from "../index";

const RightSide = (props) => {
  const [keyword, setKeyword] = useState("");

  return (
    <div className="right-side">
      <div className="right-header">
        <Input
          placeholder="Search"
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
        />
      </div>
      <div className="right-body">
        <StandingList
          category={category.movie}
          type={movieType.now_playing}
          keyword={keyword}
          title="Now playing"
        />

        <StandingList
          category={category.tv}
          type={tvType.popular}
          keyword={keyword}
          title="Popular"
        />
      </div>
    </div>
  );
};

export default RightSide;
