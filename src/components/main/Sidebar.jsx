import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="side-header">
        <h3>
          M<span>odern</span>
        </h3>
      </div>
      <div className="side-content">
        <div className="profile">
          <div
            className="profile-img bg-img"
            style={{ backgroundImage: "url(img/3.jpeg)" }}
          ></div>
          <h4>David Green</h4>
          <small>Art Director</small>
        </div>
        <div className="side-menu">
          <ul>
            <li>
              <Link to="/">
                <span className="las la-server"></span>
                <small>Products</small>
              </Link>
            </li>
            <li>
              <Link to="/users">
                <span className="las la-user-cog"></span>
                <small>Users</small>
              </Link>
            </li>
            <li>
              <Link to="/brands">
                <span className="lab la-buffer"></span>
                <small>Brands</small>
              </Link>
            </li>
            <li>
              <Link to="/category">
                <span className="las la-clipboard-list"></span>
                <small>Categoryies</small>
              </Link>
            </li>
            <li>
              <Link to="/admin">
                <span className="las la-user-shield"></span>
                <small>admins</small>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
