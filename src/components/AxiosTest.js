import React, {useEffect, useState} from "react";
import axios from "axios";

export default function RestaurantSearch(props) {
    let userLat;
    let userLong;

    const [url, setUrl] = useState("")
    const [searchLoc, setSearchLoc] = useState("");
    const [selection, setSelection] = useState('Hangry?');

    const successCallback = (position) => {
        userLat = position.coords.latitude;
        userLong = position.coords.longitude;
        console.log(`${userLat}, ${userLong}`)
        setSearchLoc(`${userLat}, ${userLong}`)
    };
    const errorCallback = (error) => {
        console.log(error);
    };


    const handleChange = (event) => {
        setSearchLoc(event.target.value);
    }
    useEffect(() => {
        async function getYelpData() {
            await axios.get(`${url}`, {
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_YELP_FUSION_API_KEY}`

                },
            }).then((res) => {
                const random = Math.floor(Math.random() * res.data.businesses.length);
                console.log("Hanrgy selection: " + res.data.businesses[random].name)
                setSelection(res.data.businesses[random].name)
            }).catch((err) => {
                console.log('error')
            })
        }
        async function getYelpRandom(){
            await axios.get(`${url}`).then((res) => {
                const random = Math.floor(Math.random() * res.data.businesses.length);
                console.log("Hanrgy selection: " + res.data.businesses[random].name)
                setSelection(res.data.businesses[random].name)
            }).catch((err) => {
                console.log('error')
            })
        }
        getYelpRandom();
        // getYelpData();
    }, [url])
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }, [])
    const handleSubmit = (event) => {
        event.preventDefault();
        setUrl(`http://ec2-3-135-20-154.us-east-2.compute.amazonaws.com:8080/api/yelpFetch/${searchLoc}`)

        // const options = {
        //     method: 'GET',
        //     headers: {
        //         accept: 'application/json',
        //         Authorization: `Bearer ${process.env.REACT_APP_YELP_FUSION_API_KEY}`
        //     }
        // };
        //
        // fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${searchLoc}&term=fast%20food&radius=40000&categories=Fast%20food&open_now=true&sort_by=best_match&matches_party_size_param=true&limit=20`, options)
        //     .then(response => response.json())
        //     .then(response => console.log(response))
        //     .then(response => places = response.businesses)
        //     .catch(err => console.error(err));
        // console.log(places);
    };
    return (

        <div className={"text-center"}>
            <form id={"searchForm"} onSubmit={handleSubmit}>
                <input
                    id="searchInput"
                    type="text"
                    name="Search Location"
                    placeholder="Search Location"
                    value={searchLoc}
                    onChange={handleChange}
                />
                <button className={"submitBtn"} type={"submit"}>Hangry!</button>
            </form>
            <div className={"card selectionCard"}>{selection}</div>
        </div>
    )

}
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
