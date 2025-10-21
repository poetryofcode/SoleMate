import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getSneakerById, deleteSneaker } from "../services/SneakersAPI";
import { formatPrice } from "../utilities/priceCalculator";
import "../App.css";

const SneakerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sneaker, setSneaker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadSneaker();
  }, [id]);

  const loadSneaker = async () => {
    try {
      const data = await getSneakerById(id);
      setSneaker(data);
    } catch (error) {
      setError("Failed to load sneaker");
      console.error("Error loading sneaker:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this sneaker?")) {
      return;
    }

    try {
      await deleteSneaker(id);
      navigate("/customsneakers");
    } catch (error) {
      setError("Failed to delete sneaker");
      console.error("Error deleting sneaker:", error);
    }
  };

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container">
        <div className="alert alert-error">{error}</div>
        <Link to="/customsneakers" className="btn btn-primary">
          Back to Sneakers
        </Link>
      </div>
    );
  }

  if (!sneaker) {
    return (
      <div className="container">
        <h1>Sneaker not found</h1>
        <Link to="/customsneakers" className="btn btn-primary">
          Back to Sneakers
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page-header">
        <Link to="/customsneakers" className="btn btn-secondary">
          ← Back to Sneakers
        </Link>
        <div className="header-actions">
          <Link to={`/edit/${sneaker.id}`} className="btn btn-primary">
            Edit Sneaker
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">
            Delete Sneaker
          </button>
        </div>
      </div>

      <div className="sneaker-details">
        <div className="sneaker-visual-large">
          <div className="sneaker-preview-large">
            <div
              className="sneaker-sole-large"
              style={{ backgroundColor: sneaker.sole_color_name }}
            ></div>
            <div
              className="sneaker-upper-large"
              style={{ backgroundColor: sneaker.upper_color_name }}
            ></div>
            <div
              className="sneaker-laces-large"
              style={{ backgroundColor: sneaker.laces_color_name }}
            ></div>
            <div
              className="sneaker-logo-large"
              style={{ backgroundColor: sneaker.logo_color_name }}
            ></div>
          </div>
        </div>

        <div className="sneaker-info-large">
          <h1>{sneaker.name}</h1>

          <div className="price-section">
            <h2>Total Price: {formatPrice(sneaker.total_price)}</h2>
            <p className="price-breakdown">
              Base Price: {formatPrice(50)} + Customizations:{" "}
              {formatPrice(sneaker.total_price - 50)}
            </p>
          </div>

          <div className="customization-details">
            <h3>Customization Details</h3>
            <div className="customization-grid">
              <div className="customization-item">
                <div
                  className="color-preview-large"
                  style={{ backgroundColor: sneaker.sole_color_name }}
                ></div>
                <div className="color-info">
                  <h4>Sole Color</h4>
                  <p>{sneaker.sole_color_display}</p>
                </div>
              </div>

              <div className="customization-item">
                <div
                  className="color-preview-large"
                  style={{ backgroundColor: sneaker.upper_color_name }}
                ></div>
                <div className="color-info">
                  <h4>Upper Color</h4>
                  <p>{sneaker.upper_color_display}</p>
                </div>
              </div>

              <div className="customization-item">
                <div
                  className="color-preview-large"
                  style={{ backgroundColor: sneaker.laces_color_name }}
                ></div>
                <div className="color-info">
                  <h4>Laces Color</h4>
                  <p>{sneaker.laces_color_display}</p>
                </div>
              </div>

              <div className="customization-item">
                <div
                  className="color-preview-large"
                  style={{ backgroundColor: sneaker.logo_color_name }}
                ></div>
                <div className="color-info">
                  <h4>Logo Color</h4>
                  <p>{sneaker.logo_color_display}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="metadata">
            <p>
              <strong>Created:</strong>{" "}
              {new Date(sneaker.created_at).toLocaleDateString()}
            </p>
            {sneaker.updated_at !== sneaker.created_at && (
              <p>
                <strong>Last Updated:</strong>{" "}
                {new Date(sneaker.updated_at).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SneakerDetails;
