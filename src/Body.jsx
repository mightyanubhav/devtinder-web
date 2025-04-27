import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Landing from "./Landing";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";

const Body = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />}>
          <Route index element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route
            path="feed"
            element={
              <PrivateRoute>
                <Feed />
              </PrivateRoute>
            }
          />
          <Route
            path="profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Body;
