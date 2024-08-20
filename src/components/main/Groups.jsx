import { useState, useEffect } from "react";
import axios from "axios";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import Sidebar from "./Sidebar";
import "../style/style.css";
import "line-awesome/dist/line-awesome/css/line-awesome.min.css";
import { authStore } from "../store/auth.store";

const GroupComponent = () => {
  const [groups, setGroups] = useState([]);
  const [categories, setCategories] = useState([]); // State to hold categories
  const [isUpdateWindowVisible, setIsUpdateWindowVisible] = useState(false);
  const [isPostWindowVisible, setIsPostWindowVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [newGroupName, setNewGroupName] = useState("");
  const [categoryId, setCategoryId] = useState(""); // To store the selected category ID
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    // Fetch groups
    const fetchGroups = async () => {
      try {
        const response = await axios.get(
          "https://ctfhawksbackend.onrender.com/api/groups",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setGroups(response.data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://ctfhawksbackend.onrender.com/api/categories",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchGroups();
    fetchCategories();
  }, [accessToken]);

  const handleUpdateClick = (group) => {
    setSelectedGroup(group);
    setUpdatedName(group.name);
    setCategoryId(group.category._id); // Set selected category ID
    setIsUpdateWindowVisible(true);
    setIsPostWindowVisible(false);
  };

  const handlePostClick = () => {
    setIsUpdateWindowVisible(false);
    setIsPostWindowVisible(true);
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name: updatedName,
      category: categoryId, // Send selected category ID
    };

    try {
      await axios.put(
        `https://ctfhawksbackend.onrender.com/api/groups/${selectedGroup._id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const updatedGroups = await axios.get(
        "https://ctfhawksbackend.onrender.com/api/groups",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setGroups(updatedGroups.data);
      setIsUpdateWindowVisible(false);
    } catch (error) {
      console.error("Error updating group:", error);
    }
  };

  const handlePostSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name: newGroupName,
      category: categoryId, // Send selected category ID
    };

    try {
      const response = await axios.post(
        "https://ctfhawksbackend.onrender.com/api/groups",
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setGroups([...groups, response.data]);
      setIsPostWindowVisible(false);
      setNewGroupName("");
      setCategoryId(""); // Reset the category selection
    } catch (error) {
      console.error("Error adding group:", error);
    }
  };

  const handleDeleteGroup = async (groupId) => {
    try {
      await axios.delete(
        `https://ctfhawksbackend.onrender.com/api/groups/${groupId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setGroups((prevGroups) =>
        prevGroups.filter((group) => group._id !== groupId)
      );
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  };

  const handleLogout = () => {
    authStore.logout();
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.name : "Unknown Category";
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
            <h1>Groups</h1>
          </div>

          <div className="page-content">
            <div className="records table-responsive">
              <div className="record-header">
                <div className="add">
                  <span>Entries</span>
                  <select>
                    <option>ID</option>
                  </select>
                  <button onClick={handlePostClick}>Add record</button>
                </div>
                <div className="browse">
                  <input
                    type="search"
                    placeholder="Search"
                    className="record-search"
                  />
                  <select>
                    <option>Status</option>
                  </select>
                </div>
              </div>

              <div>
                <table width="100%">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groups.map((group) => (
                      <tr key={group._id}>
                        <td>{group.name}</td>
                        <td>{getCategoryName(group.category)}</td>
                        {/* Display category name */}
                        <td>
                          <div className="actions">
                            <span>
                              <FaRegEdit
                                className="la-edit"
                                onClick={() => handleUpdateClick(group)}
                              />
                              {isUpdateWindowVisible &&
                                selectedGroup?._id === group._id && (
                                  <div className="update-window">
                                    <form onSubmit={handleUpdateSubmit}>
                                      <h2>Update Group</h2>
                                      <label>
                                        Name:
                                        <input
                                          type="text"
                                          value={updatedName}
                                          onChange={(e) =>
                                            setUpdatedName(e.target.value)
                                          }
                                        />
                                      </label>
                                      <label>
                                        Category:
                                        <select
                                          value={categoryId}
                                          onChange={(e) =>
                                            setCategoryId(e.target.value)
                                          }
                                        >
                                          <option value="">
                                            Select a category
                                          </option>
                                          {categories.map((category) => (
                                            <option
                                              key={category._id}
                                              value={category._id}
                                            >
                                              {category.name}
                                            </option>
                                          ))}
                                        </select>
                                      </label>
                                      <button
                                        className="update-button"
                                        type="submit"
                                      >
                                        Update
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setIsUpdateWindowVisible(false)
                                        }
                                      >
                                        Cancel
                                      </button>
                                    </form>
                                  </div>
                                )}
                            </span>
                            <span>
                              <FaTrash
                                className="la-delete"
                                onClick={() => handleDeleteGroup(group._id)}
                              />
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {isPostWindowVisible && (
        <div className="post-window">
          <form onSubmit={handlePostSubmit}>
            <h2>Add New Group</h2>
            <label>
              Name:
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
              />
            </label>
            <label>
              Category:
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit">Add</button>
            <button type="button" onClick={() => setIsPostWindowVisible(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default GroupComponent;
