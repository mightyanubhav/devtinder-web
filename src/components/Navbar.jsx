import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logoutUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "logout", {}, { withCredentials: true });
      dispatch(logoutUser());
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };
  const handleSetting = async () =>{
    console.log('setting')
  }
  const handleConnections = async() =>{
    console.log('connections')
  }

  const handleRequests = async() =>{
    console.log('requests')
  }
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">
          {user?.firstName ? "Welcome " + user.firstName : "devTinder"}
        </a>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
        />

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="user profile img"
                src={
                  user?.profileImage ||
                  "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740"
                }
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <button
                onClick={() => navigate("/profile")}
                className="justify-between text-left w-full"
              >
                Profile
                <span className="badge">👀</span>
              </button>
            </li>
            <li>
              {/* Instead of <a>, we use a button for Logout */}
              <button onClick={handleConnections} className="text-left w-full">
                Connections
              </button>
            </li>
            <li>
              {/* Instead of <a>, we use a button for Logout */}
              <button onClick={handleRequests} className="text-left w-full">
                Requests
              </button>
            </li>
            <li>
            <button onClick={handleSetting} className="text-left w-full">
                Setting
              </button>
            </li>
            <li>
              {/* Instead of <a>, we use a button for Logout */}
              <button onClick={handleLogout} className="text-left w-full">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
