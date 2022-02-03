import axios from "axios";
import authHeader from './auth-header';

const API_URL = "http://ec2-3-83-2-143.compute-1.amazonaws.com/api/auth/";

const register = (loginName, password) => {
  return axios.post(API_URL + "signup", {
    loginName,
    password,
  });
};

const compeleteProfile = (name, descriptions, country, id) => {
  return axios.post(API_URL + "completeprofile", {
    name,
    descriptions,
    country,
    id
  }, { headers: authHeader() })
  .then((response) => {
    if (response.data) {
      const user = JSON.parse(localStorage.getItem("user"));
      user.profileCompleted = true;

      localStorage.setItem("user", JSON.stringify(user));
    }

    return response.data;
  });;
};


const login = (loginName, password) => {
  return axios
    .post(API_URL + "signin", {
      loginName,
      password,
    })
    .then((response) => {
      if (response.data) {
        console.log(response.data.object.loginName)
        localStorage.setItem("user", JSON.stringify(response.data.object));
      }

      return response.data;
    });
};

const logout = () => {

  return axios.get(API_URL + "signout", { headers: authHeader() }).then((response) => {
    localStorage.removeItem("user");
    return response.data;
  });
  
};

const getUserSubscribe = () => {

  return axios.get(API_URL + "getusersubscribe", { headers: authHeader() }).then((response) => {
    return response.data.object;
  });
  
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  getUserSubscribe,
  compeleteProfile
}

export default AuthService;