// Validate sneaker configuration
export const validateSneakerConfig = (config) => {
  const errors = [];

  if (!config.name || config.name.trim() === "") {
    errors.push("Sneaker name is required");
  }

  if (!config.sole_color_id) {
    errors.push("Sole color is required");
  }

  if (!config.upper_color_id) {
    errors.push("Upper color is required");
  }

  if (!config.laces_color_id) {
    errors.push("Laces color is required");
  }

  if (!config.logo_color_id) {
    errors.push("Logo color is required");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Check for incompatible color combinations
export const checkIncompatibleCombinations = (config) => {
  const warnings = [];

  // Example: Red and green together might not look good
  // This is a stretch feature - you can add more complex logic here
  if (config.upper_color_id && config.sole_color_id) {
    // Add logic to check for incompatible combinations
    // For now, we'll just return no warnings
  }

  return warnings;
};

// Validate that all required fields are present
export const validateRequiredFields = (config) => {
  const requiredFields = [
    "name",
    "sole_color_id",
    "upper_color_id",
    "laces_color_id",
    "logo_color_id",
  ];
  const missingFields = requiredFields.filter((field) => !config[field]);

  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
};
