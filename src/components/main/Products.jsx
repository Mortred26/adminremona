import { useState, useEffect } from "react";
import axios from "axios";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import Sidebar from "./Sidebar";
import "../style/style.css";
import "line-awesome/dist/line-awesome/css/line-awesome.min.css";
import { authStore } from "../store/auth.store";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isUpdateWindowVisible, setIsUpdateWindowVisible] = useState(false);
  const [isPostWindowVisible, setIsPostWindowVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState("");
  const [updatedOldPrice, setUpdatedOldPrice] = useState("");
  const [updatedMaterial, setUpdatedMaterial] = useState("");
  const [updatedBrand, setUpdatedBrand] = useState("");
  const [updatedCategory, setUpdatedCategory] = useState("");
  const [updatedImage, setUpdatedImage] = useState(null);
  const [newProductName, setNewProductName] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductOldPrice, setNewProductOldPrice] = useState("");
  const [newProductMaterial, setNewProductMaterial] = useState("");
  const [newProductBrand, setNewProductBrand] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("");
  const [newProductImage, setNewProductImage] = useState(null);
  const accessToken = localStorage.getItem("accessToken");

  // Fetch brands and categories from API
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  console.log(newProductBrand);
  useEffect(() => {
    const fetchBrands = async () => {
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

    const fetchCategories = async () => {
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

    fetchBrands();
    fetchCategories();
  }, [accessToken]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://remonabackend.onrender.com/api/v1/products",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [accessToken]);

  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
    setUpdatedName(product.name);
    setUpdatedDescription(product.description);
    setUpdatedPrice(product.price);
    setUpdatedOldPrice(product.oldprice);
    setUpdatedMaterial(product.material);
    setUpdatedBrand(product.brand._id); // Assuming product.brand is an object with _id
    setUpdatedCategory(product.category._id); // Assuming product.category is an object with _id
    setIsUpdateWindowVisible(true);
    setIsPostWindowVisible(false);
  };

  const handlePostClick = () => {
    setIsUpdateWindowVisible(false);
    setIsPostWindowVisible(true);
  };

  const handlePostClose = () => {
    setIsUpdateWindowVisible(false);
    setIsPostWindowVisible(false);
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", updatedName);
    formData.append("description", updatedDescription);
    formData.append("price", updatedPrice);
    formData.append("oldprice", updatedOldPrice);
    formData.append("material", updatedMaterial);
    formData.append("brand", updatedBrand);
    formData.append("category", updatedCategory);
    if (updatedImage) {
      formData.append("image", updatedImage);
    }

    try {
      await axios.put(
        `https://remonabackend.onrender.com/api/v1/products/${selectedProduct._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedProducts = await axios.get(
        "https://remonabackend.onrender.com/api/v1/products",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setProducts(updatedProducts.data);
      setIsUpdateWindowVisible(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handlePostSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", newProductName);
    formData.append("description", newProductDescription);
    formData.append("price", newProductPrice);
    formData.append("oldprice", newProductOldPrice);
    formData.append("material", newProductMaterial);
    formData.append("brand", newProductBrand);
    formData.append("category", newProductCategory);
    if (newProductImage) {
      formData.append("image", newProductImage);
    }

    try {
      const response = await axios.post(
        "https://remonabackend.onrender.com/api/v1/products",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProducts([...products, response.data]);
      setIsPostWindowVisible(false);
      setNewProductName("");
      setNewProductDescription("");
      setNewProductPrice("");
      setNewProductOldPrice("");
      setNewProductMaterial("");
      setNewProductBrand("");
      setNewProductCategory("");
      setNewProductImage(null);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(
        `https://remonabackend.onrender.com/api/v1/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
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
            <h1>Products</h1>
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
                      <th>Price</th>
                      <th>Old Price</th>
                      <th>Description</th>
                      <th>Material</th>
                      <th>Brand</th>
                      <th>Category</th>
                      <th>Issued Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>
                          <div className="client">
                            <div>
                              <img
                                src={`https://remonabackend.onrender.com/${product.image}`}
                                className="client-img bg-img"
                                alt={product.image}
                              ></img>
                            </div>
                          </div>
                        </td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.oldprice}</td>
                        <td>
                          <Link to={`/desctiption/${product._id}`}>
                            <button className="description-button">
                              more...
                            </button>
                          </Link>
                        </td>

                        <td>{product.material}</td>
                        <td>{product.brand.name}</td>
                        <td>{product.category.name}</td>
                        <td>{product.updateDate}</td>
                        <td>
                          <div className="actions">
                            <span>
                              <FaRegEdit
                                className="la-edit"
                                onClick={() => handleUpdateClick(product)}
                              />
                              {isUpdateWindowVisible &&
                                selectedProduct &&
                                selectedProduct._id === product._id && (
                                  <div className="update-window">
                                    <form onSubmit={handleUpdateSubmit}>
                                      <h2>Update Product</h2>
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
                                        <textarea
                                          value={updatedDescription}
                                          onChange={(e) =>
                                            setUpdatedDescription(
                                              e.target.value
                                            )
                                          }
                                        ></textarea>
                                      </label>
                                      <label>
                                        Price:
                                        <input
                                          type="number"
                                          value={updatedPrice}
                                          onChange={(e) =>
                                            setUpdatedPrice(e.target.value)
                                          }
                                        />
                                      </label>
                                      <label>
                                        Old Price:
                                        <input
                                          type="number"
                                          value={updatedOldPrice}
                                          onChange={(e) =>
                                            setUpdatedOldPrice(e.target.value)
                                          }
                                        />
                                      </label>
                                      <label>
                                        Material:
                                        <input
                                          type="text"
                                          value={updatedMaterial}
                                          onChange={(e) =>
                                            setUpdatedMaterial(e.target.value)
                                          }
                                        />
                                      </label>
                                      <label>
                                        Brand:
                                        <select
                                          className="product-select"
                                          value={updatedBrand}
                                          onChange={(e) =>
                                            setUpdatedBrand(e.target.value)
                                          }
                                        >
                                          <option value="">Select Brand</option>
                                          {brands.map((brand) => (
                                            <option
                                              key={brand._id}
                                              value={brand._id}
                                            >
                                              {brand.name}
                                            </option>
                                          ))}
                                        </select>
                                      </label>
                                      <label>
                                        Category:
                                        <select
                                          className="product-select"
                                          value={updatedCategory}
                                          onChange={(e) =>
                                            setUpdatedCategory(e.target.value)
                                          }
                                        >
                                          <option value="">
                                            Select Category
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
                                      <label>
                                        Image:
                                        <input
                                          type="file"
                                          onChange={(e) =>
                                            setUpdatedImage(e.target.files[0])
                                          }
                                        />
                                      </label>
                                      <button type="submit">Update</button>
                                      <button
                                        onClick={() => handlePostClose()}
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
                            </span>
                            <span>
                              <FaTrash
                                className="la-trash"
                                onClick={() => handleDeleteProduct(product._id)}
                              />
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {isPostWindowVisible && (
                <div className="post-window">
                  <form onSubmit={handlePostSubmit}>
                    <h2>Add Product</h2>
                    <label>
                      Name:
                      <input
                        type="text"
                        value={newProductName}
                        onChange={(e) => setNewProductName(e.target.value)}
                      />
                    </label>
                    <label>
                      Description:
                      <textarea
                        value={newProductDescription}
                        onChange={(e) =>
                          setNewProductDescription(e.target.value)
                        }
                      ></textarea>
                    </label>
                    <label>
                      Price:
                      <input
                        type="text"
                        value={newProductPrice}
                        onChange={(e) => setNewProductPrice(e.target.value)}
                      />
                    </label>
                    <label>
                      Old Price:
                      <input
                        type="text"
                        value={newProductOldPrice}
                        onChange={(e) => setNewProductOldPrice(e.target.value)}
                      />
                    </label>
                    <label>
                      Material:
                      <input
                        type="text"
                        value={newProductMaterial}
                        onChange={(e) => setNewProductMaterial(e.target.value)}
                      />
                    </label>
                    <label>
                      Brand:
                      <select
                        className="product-select"
                        value={newProductBrand}
                        onChange={(e) => setNewProductBrand(e.target.value)}
                      >
                        <option value="">Select Brand</option>
                        {brands.map((brand) => (
                          <option key={brand._id} value={brand._id}>
                            {brand.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Category:
                      <select
                        className="product-select"
                        value={newProductCategory}
                        onChange={(e) => setNewProductCategory(e.target.value)}
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Image:
                      <input
                        type="file"
                        onChange={(e) => setNewProductImage(e.target.files[0])}
                      />
                    </label>
                    <button type="submit">Add</button>
                    <button
                      onClick={() => handlePostClose()}
                      style={{ backgroundColor: "red" }}
                      type="submit"
                    >
                      Close
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Products;
