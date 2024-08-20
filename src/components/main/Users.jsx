import { useState, useEffect } from "react";
import axios from "axios";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import Sidebar from "./Sidebar";
import "../style/style.css";
import "line-awesome/dist/line-awesome/css/line-awesome.min.css";
import { authStore } from "../store/auth.store";
import { GrUserAdmin } from "react-icons/gr";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isUpdateWindowVisible, setIsUpdateWindowVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://ctfhawksbackend.onrender.com/api/users",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [accessToken]);

  const handleGrantSuperuser = async (userId) => {
    try {
      await axios.put(
        `https://ctfhawksbackend.onrender.com/api/users/${userId}/superuser`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const updatedUsers = await axios.get(
        "https://ctfhawksbackend.onrender.com/api/users",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setUsers(updatedUsers.data);
    } catch (error) {
      console.error("Error granting superuser rights:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(
        `https://ctfhawksbackend.onrender.com/api/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleUpdateClick = (user) => {
    setSelectedUser(user);
    setUpdatedName(user.name);
    setUpdatedEmail(user.email);
    setIsUpdateWindowVisible(true);
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name: updatedName,
      email: updatedEmail,

      password: userPassword,
    };

    try {
      await axios.put(
        `https://ctfhawksbackend.onrender.com/api/users/${selectedUser._id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const updatedUsers = await axios.get(
        "https://ctfhawksbackend.onrender.com/api/users",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setUsers(updatedUsers.data);
      setIsUpdateWindowVisible(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleLogout = () => {
    authStore.logout();
  };

  return (
    <div className="App">
      <input type="checkbox" id="menu-toggle" />
      <Sidebar />

      <div className="main-content">
        <header>
          <div className="header-content">
            <label htmlFor="menu-toggle">
              <span className="las la-bars"></span>
            </label>
            <div className="header-menu">
              <label>
                <span className="las la-search"></span>
              </label>
              <div className="notify-icon">
                <span className="las la-envelope"></span>
                <span className="notify">4</span>
              </div>
              <div className="notify-icon">
                <span className="las la-bell"></span>
                <span className="notify">3</span>
              </div>
              <div className="user">
                <div
                  className="bg-img"
                  style={{ backgroundImage: "url(img/1.jpeg)" }}
                ></div>
                <span>
                  <button className="logout-button" onClick={handleLogout}>
                    <span className="las la-power-off"></span>
                    Logout
                  </button>
                </span>
              </div>
            </div>
          </div>
        </header>

        <main>
          <div className="page-header">
            <h1>Users</h1>
          </div>

          <div className="page-content">
            <div className="records table-responsive">
              <table width="100%">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <div className="actions">
                          <span>
                            <FaRegEdit
                              className="la-edit"
                              onClick={() => handleUpdateClick(user)}
                            />
                          </span>
                          <span>
                            <FaTrash
                              className="la-trash"
                              onClick={() => handleDeleteUser(user._id)}
                            />
                          </span>
                          {user.role !== "superuser" && (
                            <span>
                              <button
                                className="grant-superuser-button"
                                onClick={() => handleGrantSuperuser(user._id)}
                              >
                                <GrUserAdmin className="adminpatch" />
                              </button>
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {isUpdateWindowVisible && selectedUser && (
          <div className="update-window">
            <form onSubmit={handleUpdateSubmit}>
              <h2>Update User</h2>
              <label>
                Name:
                <input
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  value={updatedEmail}
                  onChange={(e) => setUpdatedEmail(e.target.value)}
                />
              </label>

              <label>
                Password:
                <input
                  type="password"
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                />
              </label>
              <button type="submit">Update</button>
              <button
                onClick={() => setIsUpdateWindowVisible(false)}
                style={{
                  backgroundColor: "red",
                  marginTop: "10px",
                }}
                type="submit"
              >
                Close
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
