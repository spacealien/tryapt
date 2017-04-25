import axios from 'axios';

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user: user
    }
}

export function fetchUserData() {

    console.log("fetchUserData");
    return dispatch => {
        return axios.get("/my_page/user").then(function (res) {
            console.log(res);
        })
    }
}