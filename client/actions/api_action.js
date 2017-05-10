import axios from 'axios';

export function fetchUserData() {
    console.log("action fetchUserData");
    return dispatch => {
        return axios.get("/my_page/user").then(function (res) {
            console.log(res);
        });
    };
}

export function forgotPassword(userInput) {
    console.log(userInput.email);
    return dispatch => {
        return axios.post("/forgot", {
            email: userInput.email
        }).then(function (res) {
            console.log(res);
        });
    };
}

export function changePassword(userInput) {

    var urlParams;
    (window.onpopstate = function () {
        var match,
            pl = /\+/g, 
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) { return decodeURIComponent(s.replace(pl, "+")); },
            query = window.location.search.substring(1);

        urlParams = {};
        while (match = search.exec(query))
            urlParams[decode(match[1])] = decode(match[2]);
    })();
    console.log(urlParams.token);

    var config = {
        headers: {
            Authorization: urlParams.token
        }
    }

    return dispatch => {
        return axios.post("/reset", {
            password: userInput.password,
            Authorization: urlParams.token
        }, config).then(function (res) {
            console.log(res);
        })
    }
}



