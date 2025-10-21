const API_BASE_URL = "http://localhost:3000/api";

// Get all sneakers
export const getAllSneakers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/sneakers`);
    if (!response.ok) {
      throw new Error("Failed to fetch sneakers");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching sneakers:", error);
    throw error;
  }
};

// Get single sneaker by ID
export const getSneakerById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/sneakers/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch sneaker");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching sneaker:", error);
    throw error;
  }
};

// Create new sneaker
export const createSneaker = async (sneakerData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/sneakers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sneakerData),
    });
    if (!response.ok) {
      throw new Error("Failed to create sneaker");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating sneaker:", error);
    throw error;
  }
};

// Update sneaker
export const updateSneaker = async (id, sneakerData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/sneakers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sneakerData),
    });
    if (!response.ok) {
      throw new Error("Failed to update sneaker");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating sneaker:", error);
    throw error;
  }
};

// Delete sneaker
export const deleteSneaker = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/sneakers/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete sneaker");
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting sneaker:", error);
    throw error;
  }
};
