import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createSneaker } from "../services/SneakersAPI";
import { getAllOptions } from "../services/OptionsAPI";
import { calculateTotalPrice, formatPrice } from "../utilities/priceCalculator";
import { validateSneakerConfig } from "../utilities/validation";
import "../App.css";

const CreateSneaker = () => {
  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    sole_color_id: "",
    upper_color_id: "",
    laces_color_id: "",
    logo_color_id: "",
  });
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    loadOptions();
  }, []);

  const loadOptions = async () => {
    try {
      console.log("Loading options...");
      const allOptions = await getAllOptions();
      console.log("Options loaded:", allOptions);
      setOptions(allOptions);

      // Set default options
      const defaults = allOptions.filter((option) => option.is_default);
      console.log("Default options:", defaults);
      const newFormData = { ...formData };
      const newSelectedOptions = {};

      defaults.forEach((option) => {
        if (option.type_name === "sole_color") {
          newFormData.sole_color_id = option.id;
          newSelectedOptions.sole_color = option;
        } else if (option.type_name === "upper_color") {
          newFormData.upper_color_id = option.id;
          newSelectedOptions.upper_color = option;
        } else if (option.type_name === "laces_color") {
          newFormData.laces_color_id = option.id;
          newSelectedOptions.laces_color = option;
        } else if (option.type_name === "logo_color") {
          newFormData.logo_color_id = option.id;
          newSelectedOptions.logo_color = option;
        }
      });

      console.log("Form data after defaults:", newFormData);
      console.log("Selected options after defaults:", newSelectedOptions);
      setFormData(newFormData);
      setSelectedOptions(newSelectedOptions);
    } catch (error) {
      setError("Failed to load options");
      console.error("Error loading options:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOptionChange = (optionType, option) => {
    setFormData((prev) => ({
      ...prev,
      [`${optionType}_id`]: option.id,
    }));

    setSelectedOptions((prev) => ({
      ...prev,
      [optionType]: option,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validation = validateSneakerConfig(formData);
    if (!validation.isValid) {
      setError(validation.errors.join(", "));
      return;
    }

    try {
      await createSneaker(formData);
      navigate("/customsneakers");
    } catch (error) {
      setError("Failed to create sneaker");
      console.error("Error creating sneaker:", error);
    }
  };

  const getOptionsByType = (typeName) => {
    const filtered = options.filter((option) => option.type_name === typeName);
    console.log(`Options for ${typeName}:`, filtered);
    return filtered;
  };

  const getTotalPrice = () => {
    const selectedOptionsList = Object.values(selectedOptions).filter(Boolean);
    return calculateTotalPrice(50, selectedOptionsList); // Base price of $50
  };

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Create Custom Sneaker</h1>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit} className="grid">
        <div>
          <label htmlFor="name">Sneaker Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="Enter sneaker name"
          />
        </div>

        <div className="grid">
          <div>
            <label>Sole Color</label>
            <div className="grid">
              {getOptionsByType("sole_color").map((option) => (
                <label key={option.id} className="option-card">
                  <input
                    type="radio"
                    name="sole_color"
                    value={option.id}
                    checked={formData.sole_color_id == option.id}
                    onChange={() => handleOptionChange("sole_color", option)}
                  />
                  <div className="option-content">
                    <div
                      className="color-preview"
                      style={{ backgroundColor: option.name }}
                    ></div>
                    <span>{option.display_name}</span>
                    <span className="price">{formatPrice(option.price)}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label>Upper Color</label>
            <div className="grid">
              {getOptionsByType("upper_color").map((option) => (
                <label key={option.id} className="option-card">
                  <input
                    type="radio"
                    name="upper_color"
                    value={option.id}
                    checked={formData.upper_color_id == option.id}
                    onChange={() => handleOptionChange("upper_color", option)}
                  />
                  <div className="option-content">
                    <div
                      className="color-preview"
                      style={{ backgroundColor: option.name }}
                    ></div>
                    <span>{option.display_name}</span>
                    <span className="price">{formatPrice(option.price)}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label>Laces Color</label>
            <div className="grid">
              {getOptionsByType("laces_color").map((option) => (
                <label key={option.id} className="option-card">
                  <input
                    type="radio"
                    name="laces_color"
                    value={option.id}
                    checked={formData.laces_color_id == option.id}
                    onChange={() => handleOptionChange("laces_color", option)}
                  />
                  <div className="option-content">
                    <div
                      className="color-preview"
                      style={{ backgroundColor: option.name }}
                    ></div>
                    <span>{option.display_name}</span>
                    <span className="price">{formatPrice(option.price)}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label>Logo Color</label>
            <div className="grid">
              {getOptionsByType("logo_color").map((option) => (
                <label key={option.id} className="option-card">
                  <input
                    type="radio"
                    name="logo_color"
                    value={option.id}
                    checked={formData.logo_color_id == option.id}
                    onChange={() => handleOptionChange("logo_color", option)}
                  />
                  <div className="option-content">
                    <div
                      className="color-preview"
                      style={{ backgroundColor: option.name }}
                    ></div>
                    <span>{option.display_name}</span>
                    <span className="price">{formatPrice(option.price)}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="total-price">
          <h3>Total Price: {formatPrice(getTotalPrice())}</h3>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Create Sneaker
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/customsneakers")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSneaker;
