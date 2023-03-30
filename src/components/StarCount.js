import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";

export default function StarCount(props) {
  let rating = props.rating.toString();
  let stars;
  let html = [];
  //   Check for x.5 rating and split
  if (rating.includes(".5")) {
    stars = rating.split(".");
    stars = stars[0];
    for (let i = 0; i < stars; i++) {
      html.push(<FontAwesomeIcon icon={faStar} key={i} color="#f2b038" />);
    }
    //   add half star for x.5 rating
    html.push(<FontAwesomeIcon icon={faStarHalf} key={0.5} color="#f2b038" />);
  } else {
    // else just render stars based on rating
    stars = rating;
    for (let i = 0; i < stars; i++) {
      html.push(<FontAwesomeIcon icon={faStar} key={i} color="#f2b038" />);
    }
  }
  console.log(stars);
  return <div>{html}</div>;
}
