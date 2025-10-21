import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllSneakers, deleteSneaker } from "../services/SneakersAPI";
import { formatPrice } from "../utilities/priceCalculator";
import "../App.css";

const ViewSneakers = () => {
  const [sneakers, setSneakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadSneakers();
  }, []);

  const loadSneakers = async () => {
    try {
      const data = await getAllSneakers();
      setSneakers(data);
    } catch (error) {
      setError("Failed to load sneakers");
      console.error("Error loading sneakers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sneaker?")) {
      return;
    }

    try {
      await deleteSneaker(id);
      setSneakers((prev) => prev.filter((sneaker) => sneaker.id !== id));
    } catch (error) {
      setError("Failed to delete sneaker");
      console.error("Error deleting sneaker:", error);
    }
  };

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>Custom Sneakers</h1>
        <Link to="/" className="btn btn-primary">
          Create New Sneaker
        </Link>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {sneakers.length === 0 ? (
        <div className="empty-state">
          <h3>No custom sneakers yet</h3>
          <p>Create your first custom sneaker to get started!</p>
          <Link to="/" className="btn btn-primary">
            Create Sneaker
          </Link>
        </div>
      ) : (
        <div className="sneakers-grid">
          {sneakers.map((sneaker) => (
            <div key={sneaker.id} className="sneaker-card">
              <div className="sneaker-preview">
                <div className="sneaker-visual">
                  <div
                    className="sneaker-sole"
                    style={{ backgroundColor: sneaker.sole_color_name }}
                  ></div>
                  <div
                    className="sneaker-upper"
                    style={{ backgroundColor: sneaker.upper_color_name }}
                  ></div>
                  <div
                    className="sneaker-laces"
                    style={{ backgroundColor: sneaker.laces_color_name }}
                  ></div>
                  <div
                    className="sneaker-logo"
                    style={{ backgroundColor: sneaker.logo_color_name }}
                  ></div>
                </div>
              </div>

              <div className="sneaker-info">
                <h3>{sneaker.name}</h3>
                <div className="sneaker-colors">
                  <div className="color-info">
                    <span className="color-label">Sole:</span>
                    <span className="color-value">
                      {sneaker.sole_color_display}
                    </span>
                  </div>
                  <div className="color-info">
                    <span className="color-label">Upper:</span>
                    <span className="color-value">
                      {sneaker.upper_color_display}
                    </span>
                  </div>
                  <div className="color-info">
                    <span className="color-label">Laces:</span>
                    <span className="color-value">
                      {sneaker.laces_color_display}
                    </span>
                  </div>
                  <div className="color-info">
                    <span className="color-label">Logo:</span>
                    <span className="color-value">
                      {sneaker.logo_color_display}
                    </span>
                  </div>
                </div>
                <div className="sneaker-price">
                  <strong>{formatPrice(sneaker.total_price)}</strong>
                </div>
              </div>

              <div className="sneaker-actions">
                <Link
                  to={`/customsneakers/${sneaker.id}`}
                  className="btn btn-sm btn-primary"
                >
                  View
                </Link>
                <Link
                  to={`/edit/${sneaker.id}`}
                  className="btn btn-sm btn-secondary"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(sneaker.id)}
                  className="btn btn-sm btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewSneakers;
