import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../style/details.css"; // Import the CSS file

function Description() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://remonabackend.onrender.com/api/v1/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details">
      <h2>Product Details</h2>
      {product.image && (
        <p>
          <img
            src={`https://remonabackend.onrender.com/${product.image}`}
            alt={product.name}
          />
        </p>
      )}
      <p>
        <strong>Name:</strong> {product.name}
      </p>
      <p>
        <strong>Description:</strong> {product.description}
      </p>
      <p>
        <strong>Price:</strong> {product.price}
      </p>
      <p>
        <strong>Old Price:</strong> {product.oldprice}
      </p>
      <p>
        <strong>Material:</strong> {product.material}
      </p>
      <p>
        <strong>Brand:</strong> {product.brand.name}
      </p>
      <p>
        <strong>Category:</strong> {product.category.name}
      </p>
    </div>
  );
}

export default Description;
