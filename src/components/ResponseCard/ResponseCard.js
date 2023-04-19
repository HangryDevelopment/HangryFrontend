import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ResponseCard.scss";
import StarCount from "../StarCount/StarCount";
import FavoriteBtn from "../FavoriteBtn/FavoriteBtn";
// import { YELP_LOCAL_API, YELP_GLITCH_API } from "../../public_constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
const YELP_LOCAL = process.env.REACT_APP_YELP_LOCAL;
const YELP_GLITCH = process.env.REACT_APP_YELP_GLITCH;
const USERS_LOCAL = process.env.REACT_APP_USER_API_BASE_URL_LOCAL;

export default function FetchAndResultCard(props) {
  let userLat;
  let userLong;
  // check for user auth
  // const navigate = useNavigate();
  // let user = JSON.parse(localStorage.getItem("user"));
  // console.log(user.isAuthorized);
  // if (!user.isAuthorized) {
  //   navigate("/login");
  //   console.log("You must login to access this page.");
  // }

  // useState for all relevant api responses
  const [heartPlaceholder, setHeartPlaceHolder] = useState();
  const [url, setUrl] = useState("");
  const [searchLoc, setSearchLoc] = useState("");
  const [selection, setSelection] = useState("Hangry?");
  const [yelpUrl, setYelpUrl] = useState("https://www.yelp.com/");
  const [selectionImg, setSelectionImg] = useState();
  const [rating, setRating] = useState();
  const [closed, setClosed] = useState();
  const [bisPrice, setBisPrice] = useState();
  const [restaurantId, setRestaurantId] = useState();
  const [favData, setFavData] = useState();
  const [userId, setUserId] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRestaurants, setUserRestaurants] = useState([]);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    setUserId(user.id);
    console.log(userId);
    if ((user.isAuthorized = "true")) {
      setIsLoggedIn(true);
    }
    console.log(isLoggedIn);
  }, []);

  useEffect(() => {
    async function getUser() {
      await axios.get(`${USERS_LOCAL}${userId}`).then((res) => {
        // console.log(res.data.restaurants);
        let restaurants = res.data.restaurants;
        let restaurantArray = [];
        for (let i = 0; i < restaurants.length; i++) {
          restaurantArray.push(restaurants[i].restaurantId);
        }
        setUserRestaurants(restaurantArray);
        // console.log(test);
        console.log(userRestaurants);
      });
    }
    getUser();
  }, [userId]);

  // geolocation button
  const GetCurrentLocation = () => {
    const userCoords = () =>
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

    return (
      <button
        type="button"
        className="get-current-loc-btn"
        onClick={userCoords}
      >
        <FontAwesomeIcon icon={faLocationCrosshairs} title="Location" />
      </button>
    );
  };

  // Callbacks for grabbing user location, will switch to a button so providing location is optional
  const successCallback = (position) => {
    userLat = position.coords.latitude;
    userLong = position.coords.longitude;
    console.log(`${userLat}, ${userLong}`);
    setSearchLoc(`${userLat}, ${userLong}`);
  };
  const errorCallback = (error) => {
    console.log(error);
    alert(
      "Error getting your location. Please type a location in the search box."
    );
  };

  // handler for setting search location from input
  const handleChange = (event) => {
    event.persist();
    setSearchLoc(event.target.value);
  };

  // useEffect to set url after state is updated
  useEffect(() => {
    setUrl(`${YELP_LOCAL}${searchLoc}`);
  }, [searchLoc]);

  // handler to initiate api call with null check
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(url);
    console.log("Switching heart");
    setHeartPlaceHolder(regularHeart);
    if (searchLoc === "") {
      alert("Please enter a search location");
      return;
    }

    // yelp fusion api call
    async function getYelpRandom() {
      console.log(url);
      await axios
        .get(`${url}`)
        .then((res) => {
          // rng for business selection
          const random = Math.floor(Math.random() * res.data.businesses.length);
          console.log(
            "Hanrgy selection: " +
              res.data.businesses[random].name +
              ` [${random}]`
          );
          console.log(res.data.businesses[random].id);
          // log all businesses
          for (let i = 0; i < res.data.businesses.length; i++) {
            console.log(res.data.businesses[i].name);
          }
          // set state for relevant api responses
          let selectedBis = res.data.businesses[random];
          setSelection(selectedBis.name);
          setYelpUrl(selectedBis.url);
          setSelectionImg(selectedBis.image_url);
          setRating(selectedBis.rating);
          setClosed(selectedBis.is_closed);
          setBisPrice(selectedBis.price);
          setFavData(selectedBis);
          setRestaurantId(selectedBis.id);
          setHeartPlaceHolder(regularHeart);
        })
        .catch((err) => {
          console.log(err);
          console.log("error");
        });
    }

    getYelpRandom();
  };

  return (
    <div className="outerCard">
      <div className="text-center search-cont">
        <form id="searchForm">
          <div className="search-input-loc-button">
            <input
              id="searchInput"
              type="search"
              name="Search location"
              placeholder="Search Location"
              value={searchLoc}
              onChange={handleChange}
            />
            <GetCurrentLocation />
          </div>
          <button
            className={"submitBtn"}
            type={"submit"}
            onClick={handleSubmit}
            title="Search"
          >
            Hangry!
          </button>
        </form>
        <div className={"card selectionCard"}>
          {selection !== "Hangry?" ? (
            <div className="card">
              <img
                id="selectionCard-img"
                className="img-fluid rounded-start"
                src={selectionImg}
                alt="restaurant"
              ></img>
              <div className="selectionCard-info">
                <span>
                  <StarCount rating={rating} />
                  {/* {rating}/5&nbsp;
                <FontAwesomeIcon icon={faStar} color="#f2b038" /> */}
                </span>
                {closed === false ? (
                  <span className="selectionCard-info-open">Open</span>
                ) : (
                  <span className="selectionCard-info-closed">Closed</span>
                )}
                <span className="selectionCard-info-price">{bisPrice}</span>
              </div>
              {userRestaurants.includes(restaurantId) ? (
                <FontAwesomeIcon icon={solidHeart} color="#f00" />
              ) : (
                <div>
                  {/* <FavoriteBtn
                    favData={favData}
                    userId={userId}
                    heartPlaceholder={regularHeart}
                  />
                  <div>Test div for favorites</div> */}
                </div>
              )}
            </div>
          ) : (
            <div></div>
          )}
          <a
            className="selectionCard-title"
            href={yelpUrl}
            rel="noreferrer"
            target={"_blank"}
          >
            {selection}
          </a>
        </div>
      </div>
    </div>
  );
}
