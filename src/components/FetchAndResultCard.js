import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  HANGRY_LOCAL_API,
  HANGRY_LINUXEC2_API,
  HANGRY_GLITCH_API,
} from "../public_constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import StarCount from "./StarCount";

export default function FetchAndResultCard(props) {
  let userLat;
  let userLong;

  const [url, setUrl] = useState("");
  const [searchLoc, setSearchLoc] = useState("");
  const [selection, setSelection] = useState("Hangry?");
  const [yelpUrl, setYelpUrl] = useState("https://www.yelp.com/");
  const [selectionImg, setSelectionImg] = useState();
  const [rating, setRating] = useState();
  const [closed, setClosed] = useState();
  const [bisPrice, setBisPrice] = useState();

  const handleChange = (event) => {
    event.persist();
    setSearchLoc(event.target.value);
  };

  useEffect(() => {
    setUrl(HANGRY_LOCAL_API + searchLoc);
  }, [searchLoc]);

  // For grabbing user location, will switch to a button so providing location is optional
  // const successCallback = (position) => {
  //   userLat = position.coords.latitude;
  //   userLong = position.coords.longitude;
  //   console.log(`${userLat}, ${userLong}`);
  //   // setSearchLoc(`${userLat}, ${userLong}`);
  // };
  // const errorCallback = (error) => {
  //   console.log(error);
  // };

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  // }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(url);
    if (searchLoc === "") {
      alert("Please enter a search location");
      return;
    }

    async function getYelpRandom() {
      await axios
        .get(`${url}`)
        .then((res) => {
          const random = Math.floor(Math.random() * res.data.businesses.length);
          console.log(
            "Hanrgy selection: " +
              res.data.businesses[random].name +
              ` [${random}]`
          );
          for (let i = 0; i < res.data.businesses.length; i++) {
            console.log(res.data.businesses[i].name);
          }
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

  const getRatingCount = () => {
    console.log(rating);

  }
  return (
    <div className={"text-center"}>
      <form id={"searchForm"}>
        <input
          id="searchInput"
          type="text"
          name="Search Location"
          placeholder="Search Location"
          value={searchLoc}
          onChange={handleChange}
        />
        <button className={"submitBtn"} type={"submit"} onClick={handleSubmit}>
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
                <StarCount rating={rating}/>
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
  );
}