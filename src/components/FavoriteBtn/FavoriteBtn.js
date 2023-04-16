import React from "react";
import axios from "axios";
import "./FavoriteBtn.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

// will need to do an intital check of favorites to know when to show solid heart
// plus additionally need to maintain an array of newly favorited locations
// to know when to show solid hearts. Could just run a call every card change...

const FavoriteBtn = (props) => {
  const RESTAURANTS_LOCAL = process.env.REACT_APP_RESTAURANT_API_LOCAL;
  const RESTAURANTS_GLITCH = process.env.REACT_APP_RESTAURANT_API_GLITCH;
  let favData = props.favData;
  console.log(favData);
  let user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const handleFavoriteClick = async () => {
    // Grab neccesary data from user and responsecard to push into favorties table...
    let restaurantId = favData.id;
    let restaurantImage = favData.image_url.split("/");
    let restaurantImg = restaurantImage[4];
    let restaurantName = favData.name;
    let userId = user.id;

    //Pushing restaurant into restaurants table
    const addGameRequestOptions = {
      method: "POST",
    };
    await fetch(
      `${RESTAURANTS_LOCAL}save/${restaurantName}/${restaurantId}/${restaurantImg}`,
      addGameRequestOptions
    ).then(async function (response) {
      if (!response.ok) {
        console.log("save restaurant error: " + response.status);
      } else {
        console.log("save restaurant ok");
      }
    });

    //Pushing restaurants into user_favorites table
    await fetch(
      `${RESTAURANTS_LOCAL}add/${userId}/${restaurantId}`,
      addGameRequestOptions
    ).then(async function (response) {
      if (!response.ok) {
        console.log("add restaurant to user error: " + response.status);
      } else {
        console.log("add restaurant to user ok");
        // let thisBtnDiv = document.getElementById(`${gameId}`);
        // thisBtnDiv.innerHTML = `<button class="removeGameBtn rounded mb-2" data-id="${gameId}"><i class="fa-solid favoriteStar fa-star"></i> Remove Game</button>`;
        // let removeBtn = document.getElementsByClassName("removeGameBtn");
        // for (let i = 0; i < removeBtn.length; i++) {
        //   removeBtn[i].addEventListener("click", removeGame);
        // }
      }
    });
  };
  return (
    <div className="favorite-btn-cont">
      <div className="favorite-btn">
        <FontAwesomeIcon
          className="fav-btn-regularHeart"
          icon={regularHeart}
          onClick={handleFavoriteClick}
        />
      </div>
    </div>
  );
};

export default FavoriteBtn;
