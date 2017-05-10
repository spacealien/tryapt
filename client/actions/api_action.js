import axios from 'axios';

export function setUserData(user) {
    return {
        type: SET_CURRENT_USER,
        user: user
    }
}

export function fetchUserData() {
    return dispatch => {
        return axios.get("/my_page/user")
            .then((res) => {
                console.log(res);
            });
    }
}

export function forgotPassword(userInput) {
    return dispatch => {
        return axios.post("/forgot", {
            email: userInput.email
        }).then((res) => {
            console.log(res);
        });
    }
}

export function changePassword(userInput) {
    var urlParams;
    window.onpopstate = function () {
        var match,
            pl = /\+/g,
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) { return decodeURIComponent(s.replace(pl, "+")); },
            query = window.location.search.substring(1);

        urlParams = {};
        while (match = search.exec(query))
            urlParams[decode(match[1])] = decode(match[2]);
    }();

    var config = {
        headers: {
            Authorization: urlParams.token
        }
    }

    return dispatch => {
        return axios.post("/reset", {
            password: userInput.password
        }, config).then((res) => {
            console.log(res);
        });
    }
}



