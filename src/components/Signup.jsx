import React, { useState } from "react";
import axios from "axios"; 
import { BASE_URL } from "../utils/constants";// we'll use axios to make API request // assuming you have exported BASE_URL

const Signup = () => {
  const [formData, setFormData] = useState({
    profileImage: "",
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    emailId: "",
    password: "",
    mobileNo: ""
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}signup`, formData);
      alert("Signup successful!");
      // Optionally reset form
      setFormData({
        profileImage: "",
        firstName: "",
        lastName: "",
        age: "",
        gender: "",
        emailId: "",
        password: "",
        mobileNo: ""
      });
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      alert("Signup failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title">Sign Up</h2>

          {/* Profile Image */}
          <label className="input validator">
            <input
              type="url"
              name="profileImage"
              value={formData.profileImage}
              onChange={handleChange}
              placeholder="Image URL"
              required
            />
          </label>

          {/* First Name */}
          <label className="input validator">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
            />
          </label>

          {/* Last Name */}
          <label className="input validator">
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
            />
          </label>

          {/* Age */}
          <label className="input validator">
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
              min="1"
              max="100"
              required
            />
          </label>

          {/* Gender */}
          <label className="input validator">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="input"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>

          {/* Email */}
          <label className="input validator">
            <input
              type="email"
              name="emailId"
              value={formData.emailId}
              onChange={handleChange}
              placeholder="mail@site.com"
              required
            />
          </label>

          {/* Password */}
          <label className="input validator">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              minLength="8"
            />
          </label>

          {/* Phone Number */}
          <label className="input validator">
            <input
              type="tel"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              placeholder="Phone"
              pattern="[0-9]*"
              minLength="10"
              maxLength="10"
              required
            />
          </label>

          {/* Submit Button */}
          <div className="card-actions justify-center">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>

        </div>
      </div>
    </form>
  );
};

export default Signup;
