import React from "react";

const UserCard = ({ image, firstName, lastName, age, email, onLike, onIgnore }) => {
  return (
    <div className="card shadow-lg rounded-xl p-4 flex flex-col items-center gap-3 bg-white border-2 border-blue-300 hover:shadow-2xl transition w-80 md:w-96">
      {/* Profile Image */}
      <img
        src={image || "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740"}
        alt="User"
        className="w-32 h-32 rounded-full object-cover border-4 border-green-400"
      />

      {/* User Info */}
      <h3 className="text-2xl font-bold text-blue-700 text-center">
        {firstName} {lastName}
      </h3>
      <p className="text-base text-gray-600 text-center">{email}</p>
      <p className="text-base text-green-600 text-center">Age: {age}</p>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-2">
        <button 
          onClick={onLike}
          className="px-5 py-2 bg-yellow-400 hover:bg-yellow-300 text-white font-semibold rounded-full transition"
        >
          💖 Like
        </button>
        <button 
          onClick={onIgnore}
          className="px-5 py-2 bg-green-500 hover:bg-green-400 text-white font-semibold rounded-full transition"
        >
          ❌ Ignore
        </button>
      </div>
    </div>
  );
};

export default UserCard;
