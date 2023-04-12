import React from "react";
import axios from "axios";
import './FavoriteBtn.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

const FavoriteBtn = () => {
  return (
    <div className="favorite-btn-cont">
      <div className="favorite-btn">
        <FontAwesomeIcon icon={regularHeart} />
      </div>
    </div>
  );
};

export default FavoriteBtn;
