import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";

export default function StarCount(props) {
  let rating = props.rating.toString();
  let stars;
  let html = [];
  if (rating.includes(".5")) {
    stars = rating.split(".");
    for (let i = 0; i < stars[0]; i++) {
        html.push(<FontAwesomeIcon icon={faStar} key={i} color="#f2b038" />);
      }
      html.push(<FontAwesomeIcon icon={faStarHalf} key={.5} color="#f2b038" />)
  } else {
    stars = rating;
    for (let i = 0; i < stars; i++) {
      html.push(<FontAwesomeIcon icon={faStar} key={i} color="#f2b038" />);
    }
  }
  console.log(stars);
//   console.log(html);
  return <div>{html}</div>;
}
