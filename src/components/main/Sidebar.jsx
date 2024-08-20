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
              <Link to="/category">
                <span className="las la-stream"></span>
                <small>Category</small>
              </Link>
            </li>
            <li>
              <Link to="/groups">
                <span className="lab la-buffer"></span>
                <small>Groups</small>
              </Link>
            </li>
            <li>
              <Link to="/tests">
                <span className="las la-clipboard-list"></span>
                <small>Tests</small>
              </Link>
            </li>
            <li>
              <Link to="/users">
                <span className="las la-user-cog"></span>
                <small>Users</small>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
