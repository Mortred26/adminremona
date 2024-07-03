import { useState, useEffect } from "react";
import axios from "axios";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import Sidebar from "./Sidebar";
import "../style/style.css";
import "line-awesome/dist/line-awesome/css/line-awesome.min.css";
import { authStore } from "../store/auth.store";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [isUpdateWindowVisible, setIsUpdateWindowVisible] = useState(false);
  const [isPostWindowVisible, setIsPostWindowVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedImage, setUpdatedImage] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState(null);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://remonabackend.onrender.com/api/v1/category",
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

    fetchData();
  }, [accessToken]);

  const handleUpdateClick = (category) => {
    setSelectedCategory(category);
    setUpdatedName(category.name);
    setUpdatedImage(null);
    setIsUpdateWindowVisible(true);
    setIsPostWindowVisible(false);
  };

  const handlePostClick = () => {
    setIsUpdateWindowVisible(false);
    setIsPostWindowVisible(true);
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", updatedName);
    if (updatedImage) {
      formData.append("image", updatedImage);
    }

    try {
      await axios.put(
        `https://remonabackend.onrender.com/api/v1/category/${selectedCategory._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedCategories = await axios.get(
        "https://remonabackend.onrender.com/api/v1/category",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setCategories(updatedCategories.data);

      setIsUpdateWindowVisible(false);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handlePostSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", newCategoryName);
    formData.append("image", newCategoryImage);

    try {
      const response = await axios.post(
        "https://remonabackend.onrender.com/api/v1/category",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setCategories([...categories, response.data]);
      setIsPostWindowVisible(false);
      setNewCategoryName("");
      setNewCategoryImage(null);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(
        `https://remonabackend.onrender.com/api/v1/category/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== categoryId)
      );
    } catch (error) {
      console.error("Error deleting category:", error);
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
            <h1>Categories</h1>
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
                      <th>ID</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>ISSUED DATE</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category) => (
                      <tr key={category._id}>
                        <td>{category._id}</td>
                        <td>
                          <div className="client">
                            <div>
                              <img
                                src={`https://remonabackend.onrender.com/${category.image}`}
                                className="client-img bg-img"
                                alt={category.name}
                              ></img>
                            </div>
                          </div>
                        </td>
                        <td>{category.name}</td>
                        <td>{category.update}</td>
                        <td>
                          <div className="actions">
                            <span>
                              <FaRegEdit
                                className="la-edit"
                                onClick={() => handleUpdateClick(category)}
                              />
                              {isUpdateWindowVisible &&
                                selectedCategory?._id === category._id && (
                                  <div className="update-window">
                                    <form onSubmit={handleUpdateSubmit}>
                                      <h2>Update Category</h2>
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
                                        Image:
                                        <input
                                          type="file"
                                          onChange={(e) =>
                                            setUpdatedImage(e.target.files[0])
                                          }
                                        />
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
                                onClick={() =>
                                  handleDeleteCategory(category._id)
                                }
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
            <h2>Add New Category</h2>
            <label>
              Name:
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
            </label>
            <label>
              Image:
              <input
                type="file"
                onChange={(e) => setNewCategoryImage(e.target.files[0])}
              />
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

export default Category;
