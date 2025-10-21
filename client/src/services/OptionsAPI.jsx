const API_BASE_URL = "http://localhost:3000/api";

// Get all option types
export const getOptionTypes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/options/types`);
    if (!response.ok) {
      throw new Error("Failed to fetch option types");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching option types:", error);
    throw error;
  }
};

// Get options by type
export const getOptionsByType = async (typeId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/options/type/${typeId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch options by type");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching options by type:", error);
    throw error;
  }
};

// Get all options
export const getAllOptions = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/options`);
    if (!response.ok) {
      throw new Error("Failed to fetch options");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching options:", error);
    throw error;
  }
};

// Get single option by ID
export const getOptionById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/options/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch option");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching option:", error);
    throw error;
  }
};
