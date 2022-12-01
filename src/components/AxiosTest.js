import React from "react";
import axios from "axios";

export default function AxiosTest(){
    // ec2 dns
    const url = 'http://ec2-54-90-98-222.compute-1.amazonaws.com:8080/api/users/';

    const getAllUsers = () => {
        axios.get(url).then((response) => {
             const allUsers = response.data;
            console.log(allUsers);
        }).catch(error => console.error(`Error: ${error}`));
    }
    getAllUsers();
}