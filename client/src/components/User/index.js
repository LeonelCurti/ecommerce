import React from "react";
import UserLayout from "../../hoc/user";
import { Link } from "react-router-dom";

const UserDashboard = ({ user }) => {
  return (
    <UserLayout>
      <div className="user_nfo_panel text-center">
        <h2>Personal Information</h2>
        <div>
          <span>Name: {user.userData.name}</span>
          <span>Last Name: {user.userData.lastname}</span>
          <span>Email: {user.userData.email}</span>
        </div>        
        <Link to="/user/user_profile" className="btn btn-primary mt-2">
          Edit
        </Link>
      </div>
    </UserLayout>
  );
};

export default UserDashboard;
