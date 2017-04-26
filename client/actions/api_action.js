import axios from 'axios';

export function fetchUserData() {
    console.log("action fetchUserData");
    return dispatch => {
        return axios.get("/my_page/user").then(function (res) {
            console.log(res);
        })
    }
}

export function forgotPassword(userInput) {
    console.log(userInput.email);
    return dispatch => {
        return axios.post("/forgot", {
            email: userInput.email
        }).then(function (res) {
            console.log(res);
        })
    }
}

export function changePassword(userInput) {
    return dispatch => {
        return axios.post("/reset", {   
            password: userInput.password
        }).then(function (res) {
            console.log(res);
        })
    }
}



