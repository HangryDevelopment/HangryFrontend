import React, {useEffect, useState} from "react";
import axios from "axios";
import {HANGRY_LOCAL_API, HANGRY_UBUNTUEC2_API} from "../public_constants";

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

        async function getYelpRandom() {
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
        setUrl(HANGRY_UBUNTUEC2_API + searchLoc)
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