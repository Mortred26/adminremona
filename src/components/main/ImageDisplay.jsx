import { useState } from "react";
import axios from "axios";

const CategoryForm = () => {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const accessToken = localStorage.getItem("accessToken");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", imageFile);

      const apiUrl = "https://remonabackend.onrender.com/api/v1/category";
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.post(apiUrl, formData, config);

      setLoading(false);
      setSuccessMessage("Category added successfully!");
      console.log("Response from server:", response.data);

      // Additional logic after successful submission (e.g., clearing form inputs)
      setName("");
      setImageFile(null);
    } catch (error) {
      setLoading(false);
      setError("Error adding category. Please try again."); // Generic error message
      console.error("Error adding category:", error);
    }
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <div>
      <h2>Add Category</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="name">Category Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Category Image:</label>
          <input
            type="file"
            id="image"
            onChange={handleFileChange}
            accept="image/*"
            required
          />
        </div>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        <button type="submit" disabled={loading}>
          Add Category
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
