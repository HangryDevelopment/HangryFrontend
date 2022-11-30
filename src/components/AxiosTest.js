import React from "react";
import axios from "axios";

export default function AxiosTest(){
    // ec2 dns
    const url = 'ec2-34-229-141-196.compute-1.amazonaws.com:8080/api/users';

    const getAllUsers = () => {
        let allUsers = '';
        axios.get(url).then((response) => {
            allUsers = response.data;
        }).catch(error => console.error(`Error: ${error}`));
        console.log(allUsers);
    }
    getAllUsers();
}