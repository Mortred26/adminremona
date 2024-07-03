import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import Sidebar from "./Sidebar";
import "../style/style.css";
import "line-awesome/dist/line-awesome/css/line-awesome.min.css";
import { authStore } from "../store/auth.store";

const Brand = () => {
  const [brands, setBrands] = useState([]);
  const [isUpdateWindowVisible, setIsUpdateWindowVisible] = useState(false);
  const [isPostWindowVisible, setIsPostWindowVisible] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [newBrandName, setNewBrandName] = useState("");
  const [newBrandDescription, setNewBrandDescription] = useState("");
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://remonabackend.onrender.com/api/v1/brands",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setBrands(response.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchData();
  }, [accessToken]);

  const handleUpdateClick = (brand) => {
    setSelectedBrand(brand);
    setUpdatedName(brand.name);
    setUpdatedDescription(brand.description);
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
      description: updatedDescription,
    };

    try {
      await axios.put(
        `https://remonabackend.onrender.com/api/v1/brands/${selectedBrand._id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const updatedBrands = await axios.get(
        "https://remonabackend.onrender.com/api/v1/brands",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setBrands(updatedBrands.data);

      setIsUpdateWindowVisible(false);
    } catch (error) {
      console.error("Error updating brand:", error);
    }
  };

  const handlePostSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name: newBrandName,
      description: newBrandDescription,
    };

    try {
      const response = await axios.post(
        "https://remonabackend.onrender.com/api/v1/brands",
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setBrands([...brands, response.data]);
      setIsPostWindowVisible(false);
      setNewBrandName("");
      setNewBrandDescription("");
    } catch (error) {
      console.error("Error adding brand:", error);
    }
  };

  const handleDeleteBrand = async (brandId) => {
    try {
      await axios.delete(
        `https://remonabackend.onrender.com/api/v1/brands/${brandId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setBrands((prevBrands) =>
        prevBrands.filter((brand) => brand._id !== brandId)
      );
    } catch (error) {
      console.error("Error deleting brand:", error);
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
            <h1>Brands</h1>
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
                      <th>Name</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {brands.map((brand) => (
                      <tr key={brand._id}>
                        <td>{brand._id}</td>
                        <td>{brand.name}</td>
                        <td>{brand.description}</td>
                        <td>
                          <div className="actions">
                            <span>
                              <FaRegEdit
                                className="la-edit"
                                onClick={() => handleUpdateClick(brand)}
                              />
                              {isUpdateWindowVisible &&
                                selectedBrand?._id === brand._id && (
                                  <div className="update-window">
                                    <form onSubmit={handleUpdateSubmit}>
                                      <h2>Update Brand</h2>
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
                                        Description:
                                        <input
                                          type="text"
                                          value={updatedDescription}
                                          onChange={(e) =>
                                            setUpdatedDescription(
                                              e.target.value
                                            )
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
                                onClick={() => handleDeleteBrand(brand._id)}
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
            <h2>Add New Brand</h2>
            <label>
              Name:
              <input
                type="text"
                value={newBrandName}
                onChange={(e) => setNewBrandName(e.target.value)}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                value={newBrandDescription}
                onChange={(e) => setNewBrandDescription(e.target.value)}
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

export default Brand;
