import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import Topbar from "./Topbar";

const Sidebar = () => {
  let openPop = () => {
    // alert('asdfasdf');
    $(".maindiv").toggleClass("main");
  };
  return (
    <>
      <i className="fas fa-bars side_b" onClick={openPop}></i>
      <div className="sidbar_left">
        <i className="fas fa-times side_b close" onClick={openPop}></i>
        <div className="logo">
          <Link to="/userdashboard">
            <img src="images/logo.png" alt="logo" />
          </Link>
        </div>
        <ul>
          <li>
            <Link to="/userdashboard" className="active">
              <span>
                <img src="images/iconS1.png" align="icon" />
              </span>{" "}
              News Feed
            </Link>
          </li>
          <li>
            <Link to="/userprofile">
              <span>
                <img src="images/useri_1.png" align="icon" />
              </span>{" "}
              My Profile
            </Link>
          </li>
          <li>
            <Link to="/messages">
              <span>
                <img src="images/iconS2.png" align="icon" />
              </span>{" "}
              Messages{" "}
            </Link>
          </li>
          <li>
            <Link to="/requests">
              <span>
                <img src="images/iconS3.png" align="icon" />
              </span>{" "}
              Requests
            </Link>
          </li>
          <li>
            <Link to="/followers">
              <span>
                <img src="images/iconS4.png" align="icon" />
              </span>{" "}
              My Followers
            </Link>
          </li>
          <li>
            <Link to="/blocklist">
              <span>
                <img src="images/iconS5.png" align="icon" />
              </span>{" "}
              Blocklist
            </Link>
          </li>
          <li>
            <Link to="/viewnotifications">
              <span>
                <i className="fas fa-bell" style={{ color: "#ffdc5d" }}>
                  <sup style={{ color: "#ff0000d6" }}></sup>
                </i>
              </span>{" "}
              Notifications
            </Link>
          </li>
          {/* <li><Link to="pagesliked"><span><img src="images/iconS7.png" align="icon"/></span> Pages Liked</Link></li> */}
          <li>
            <Link to="/favorites">
              <span>
                <img src="images/iconS8.png" align="icon" />
              </span>{" "}
              Favorites
            </Link>
          </li>
        </ul>
      </div>
      <Topbar/>
    </>
  );
};

export default Sidebar;
