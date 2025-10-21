// Calculate total price for a sneaker configuration
export const calculateTotalPrice = (basePrice, options) => {
  const optionsPrice = options.reduce((total, option) => {
    return total + (parseFloat(option.price) || 0);
  }, 0);
  return basePrice + optionsPrice;
};

// Get price for a specific option
export const getOptionPrice = (option) => {
  return parseFloat(option.price) || 0;
};

// Format price for display
export const formatPrice = (price) => {
  const numPrice = parseFloat(price) || 0;
  return `$${numPrice.toFixed(2)}`;
};
