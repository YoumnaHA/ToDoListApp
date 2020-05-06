import axios from "axios";

const API_URL = "http://localhost:3001/user/";

class Auth {
    login(email, password) {
        return axios
            .post(API_URL + "login", {
                email,
                password
            })
            .then(response => {
                console.log(response)
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                console.log(response.data)
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    signup(email, password) {
        return axios.post(API_URL + "signup", {
            email,
            password
        });
    }

    getUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new Auth();


