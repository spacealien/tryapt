import axios from 'axios';


// fetches private user data
export function fetchUserData() {
    return dispatch => {
        return axios.get("/my_page/user_data")
    }
}



// fetches a employee from json file with matching
export function fetchEmployee(email) {
    return dispatch => {
        return axios.post("/api/people/employee", {
            email: email
        });
    }
}

// fetches public profile data
// linkedn, and experience
export function fetchProfileData(email) {
    return dispatch => {
        return axios.post("/api/people/profile", {
            email: email
        });
    }
}


// save changges to profile data in my page view
export function submitProfileChanges(profile) {
    console.log(profile);
    return dispatch => {
        return axios.post("/my_page/profile/update", {
            profile: profile
        });
    }
}



// sends post request with email to send reset link to 
export function forgotPassword(userInput) {
    console.log(userInput);
    return dispatch => {
        return axios.post("/forgot", {
            email: userInput.email
        })
    }
}

//MÅ GJØRES
export function newUser(userInput) {
    console.log(userInput.password);
    return dispatch => {
        return axios.post("/api/user/register", {
            email: userInput.email,
            password: userInput.password
        })
    }
}

export function sendNewConfirmationEmail(userInput) {
    return dispatch => {
        return axios.post("/resend_confirmation", {
            email: userInput.email,
        })
    }
}

// change user password
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
        return axios.post("/reset_password", {
            password: userInput.password
        }, config);
    }
}



