import React, { Component, useState, useEffect } from 'react';
import { Routes, Route, Link,  } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import Login from "./components/Login";
import './App.css';

import AuthService from "./services/AuthService";

import Register from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import UploadContent from './components/UploadContent';
import CompeleteProfile from './components/CompeleteProfile';
import ViewContent from './components/ViewContent';
import MyAccount from './components/MyAccount';

const App = () => {

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);

    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">

        {currentUser ? (
          <Link to={"/dashboard"} className="navbar-brand">
            ZeroBeta
          </Link>
        ) :
          <Link to={"/"} className="navbar-brand">
            ZeroBeta
          </Link>}



        {currentUser ? (

          <div className="navbar-nav ml-auto">

            {currentUser.profileCompleted ? (
              <li className="nav-item">

                <Link to={"/myaccount"} className="nav-link">
                  My Account
                </Link>
              </li>
            ) :
              <div></div>}

            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>

        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route exact path={"/"} element={<Login />} />
          <Route exact path={"/dashboard"} element={<Dashboard />} />
          <Route exact path={"/myaccount"} element={<MyAccount />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/dashboard/uploadcontent" element={<UploadContent />} />
          <Route exact path="/dashboard/editcontent/:contentId" element={<UploadContent />} />
          <Route exact path="/dashboard/completeprofile" element={<CompeleteProfile />} />
          <Route exact path="/dashboard/viewcontent/:contentId" element={<ViewContent />} />
        </Routes>
      </div>

    </div>
  );
};

export default App;