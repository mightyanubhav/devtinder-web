import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async() =>{
        try {
            const response =await axios.post(BASE_URL+'login', {
                emailId: email,
                password
              }, {
                withCredentials: true
              });
            // console.log("Login success:", response.data);
            dispatch(setUser(response.data.user));
            
            navigate('/feed')
          } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
          }
    }
  
    const handleSignup =() =>{
        navigate('/signup')
    }


  return (
    <div className="card bg-base-300 w-96 shadow-sm flex object-center">
      <figure>
        <img
          src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740"
          alt="User"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Enter Credentials</h2>

        <label className="input validator">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </g>
          </svg>
          <input 
          type="email" 
          placeholder="mail@site.com" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <div className="validator-hint hidden">Enter valid email address</div>
        <label className="input validator">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
          <input
            type="password"
            required
            placeholder="Password"
            minlength="8"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <p className="validator-hint hidden">
          Must be more than 8 characters, including
          <br />
          At least one number <br />
          At least one lowercase letter <br />
          At least one uppercase letter
        </p>

        <div className="card-actions justify-center">
          <button className="btn btn-primary mr-2" onClick={handleLogin}>Login</button>
          <button className="btn btn-primary ml-2" onClick={handleSignup}>Signup</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
