// src/components/Profile.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { setUser } from "../utils/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    age: user?.age || "",
    gender: user?.gender || "",
    mobileNo: user?.mobileNo || "",
  });

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-bold">Loading Profile...</p>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditToggle = () => {
    setEditMode((prev) => !prev);
  };

  const handleSave = async () => {
    try {
      const res = await axios.patch(BASE_URL + "profile/edit", formData, {
        withCredentials: true,
      });
      dispatch(setUser(res.data.user)); // Update Redux with the new user data
      alert("Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      console.error("Profile update failed:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Failed to update profile.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure className="px-10 pt-10">
          <img
            src={user.profileImage || "https://via.placeholder.com/150"}
            alt="Profile"
            className="rounded-xl w-32 h-32 object-cover"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{user.firstName} {user.lastName}</h2>
          <p className="text-sm text-gray-400">{user.emailId}</p>

          <div className="mt-4 text-left w-full space-y-2">

            {/* First Name */}
            <div>
              <strong>First Name:</strong><br />
              {editMode ? (
                <input
                  className="input input-bordered w-full"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              ) : (
                <p>{user.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <strong>Last Name:</strong><br />
              {editMode ? (
                <input
                  className="input input-bordered w-full"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              ) : (
                <p>{user.lastName}</p>
              )}
            </div>

            {/* Age */}
            <div>
              <strong>Age:</strong><br />
              {editMode ? (
                <input
                  type="number"
                  className="input input-bordered w-full"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="1"
                  max="100"
                />
              ) : (
                <p>{user.age}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <strong>Gender:</strong><br />
              {editMode ? (
                <select
                  className="select select-bordered w-full"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              ) : (
                <p>{user.gender}</p>
              )}
            </div>

            {/* Mobile Number */}
            <div>
              <strong>Mobile No:</strong><br />
              {editMode ? (
                <input
                  className="input input-bordered w-full"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  pattern="[0-9]*"
                  minLength="10"
                  maxLength="10"
                />
              ) : (
                <p>{user.mobileNo}</p>
              )}
            </div>

          </div>

          {/* Edit / Save Buttons */}
          <div className="card-actions justify-center mt-4">
            {editMode ? (
              <>
                <button className="btn btn-success mr-2" onClick={handleSave}>
                  Save
                </button>
                <button className="btn btn-error ml-2" onClick={handleEditToggle}>
                  Cancel
                </button>
              </>
            ) : (
              <button className="btn btn-primary" onClick={handleEditToggle}>
                Edit Profile
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
