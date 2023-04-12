import React, { useEffect, useState } from "react";
// create instance of axios for each endpoint to use proxy
// import axios from "axios";
import "./ResponseCard.scss";
import StarCount from "../StarCount/StarCount";
import FavoriteBtn from "../FavoriteBtn/FavoriteBtn";
// import { YELP_LOCAL_API, YELP_GLITCH_API } from "../../public_constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import api from "../api";
const YELP_LOCAL = process.env.REACT_APP_YELP_LOCAL;
const YELP_GLITCH = process.env.REACT_APP_YELP_GLITCH;

export default function FetchAndResultCard(props) {
  let userLat;
  let userLong;

  // useState for all relevant api responses
  const [url, setUrl] = useState("");
  const [searchLoc, setSearchLoc] = useState("");
  const [selection, setSelection] = useState("Hangry?");
  const [yelpUrl, setYelpUrl] = useState("https://www.yelp.com/");
  const [selectionImg, setSelectionImg] = useState();
  const [rating, setRating] = useState();
  const [closed, setClosed] = useState();
  const [bisPrice, setBisPrice] = useState();

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
    setUrl(`/yelpFetch/${searchLoc}`);
  }, [searchLoc]);

  // handler to initiate api call with null check
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(url);
    if (searchLoc === "") {
      alert("Please enter a search location");
      return;
    }

    // yelp fusion api call
    async function getYelpRandom() {
      await api
        .get(`${url}`)
        .then((res) => {
          // rng for business selection
          const random = Math.floor(Math.random() * res.data.businesses.length);
          console.log(
            "Hanrgy selection: " +
              res.data.businesses[random].name +
              ` [${random}]`
          );
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
        })
        .catch((err) => {
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
              <FavoriteBtn />
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
