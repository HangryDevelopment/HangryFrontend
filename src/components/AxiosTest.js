import React from "react";
import axios from "axios";

export default function AxiosTest(props) {
    // ec2 dns
    // const url = 'http://ec2-54-90-98-222.compute-1.amazonaws.com:8080/api/users/';
    //
    // const getAllUsers = () => {
    //     axios.get(url).then((response) => {
    //          const allUsers = response.data;
    //         console.log(allUsers);
    //     }).catch(error => console.error(`Error: ${error}`));
    // }
    // getAllUsers();

        //UI feedback to tell the user when we are retrieving infromation from the API

        //using a proxy server cors-anywhere to get rid of the CROS probblem
        //SUPER HOT TIP: passing the location variable, which equals to the user's input (see below). Instead of grabbbing the entire API, it will only retrieve the restaurants that are closed to the lcoation information we entered. This makes the lodading wayyyyyyy faster.
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_YELP_FUSION_API_KEY}`
        }
    };

    fetch('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=San%20Antonio%2C%20TX%2078218&term=fast%20food&radius=25000&categories=Fast%20food&open_now=true&sort_by=best_match&matches_party_size_param=true&limit=20', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}