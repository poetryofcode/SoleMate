import { pool } from "../config/database.js";

// Get all sneakers
export const getAllSneakers = async (req, res) => {
  try {
    const result = await pool.query(`
            SELECT s.*, 
                   so_sole.name as sole_color_name, so_sole.display_name as sole_color_display,
                   so_upper.name as upper_color_name, so_upper.display_name as upper_color_display,
                   so_laces.name as laces_color_name, so_laces.display_name as laces_color_display,
                   so_logo.name as logo_color_name, so_logo.display_name as logo_color_display
            FROM sneakers s
            LEFT JOIN sneaker_options so_sole ON s.sole_color_id = so_sole.id
            LEFT JOIN sneaker_options so_upper ON s.upper_color_id = so_upper.id
            LEFT JOIN sneaker_options so_laces ON s.laces_color_id = so_laces.id
            LEFT JOIN sneaker_options so_logo ON s.logo_color_id = so_logo.id
            ORDER BY s.created_at DESC
        `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error getting sneakers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get single sneaker by ID
export const getSneakerById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `
            SELECT s.*, 
                   so_sole.name as sole_color_name, so_sole.display_name as sole_color_display,
                   so_upper.name as upper_color_name, so_upper.display_name as upper_color_display,
                   so_laces.name as laces_color_name, so_laces.display_name as laces_color_display,
                   so_logo.name as logo_color_name, so_logo.display_name as logo_color_display
            FROM sneakers s
            LEFT JOIN sneaker_options so_sole ON s.sole_color_id = so_sole.id
            LEFT JOIN sneaker_options so_upper ON s.upper_color_id = so_upper.id
            LEFT JOIN sneaker_options so_laces ON s.laces_color_id = so_laces.id
            LEFT JOIN sneaker_options so_logo ON s.logo_color_id = so_logo.id
            WHERE s.id = $1
        `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Sneaker not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error getting sneaker:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create new sneaker
export const createSneaker = async (req, res) => {
  try {
    console.log("Creating sneaker with data:", req.body);
    const {
      name,
      sole_color_id,
      upper_color_id,
      laces_color_id,
      logo_color_id,
    } = req.body;

    // Calculate total price
    const priceResult = await pool.query(
      `
            SELECT 
                (SELECT price FROM sneaker_options WHERE id = $1) +
                (SELECT price FROM sneaker_options WHERE id = $2) +
                (SELECT price FROM sneaker_options WHERE id = $3) +
                (SELECT price FROM sneaker_options WHERE id = $4) as total_price
        `,
      [sole_color_id, upper_color_id, laces_color_id, logo_color_id]
    );

    const totalPrice = priceResult.rows[0].total_price + 50; // Base price of $50

    const result = await pool.query(
      `
            INSERT INTO sneakers (name, base_price, total_price, sole_color_id, upper_color_id, laces_color_id, logo_color_id)
            VALUES ($1, 50, $2, $3, $4, $5, $6)
            RETURNING *
        `,
      [
        name,
        totalPrice,
        sole_color_id,
        upper_color_id,
        laces_color_id,
        logo_color_id,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating sneaker:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update sneaker
export const updateSneaker = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      sole_color_id,
      upper_color_id,
      laces_color_id,
      logo_color_id,
    } = req.body;

    // Calculate total price
    const priceResult = await pool.query(
      `
            SELECT 
                (SELECT price FROM sneaker_options WHERE id = $1) +
                (SELECT price FROM sneaker_options WHERE id = $2) +
                (SELECT price FROM sneaker_options WHERE id = $3) +
                (SELECT price FROM sneaker_options WHERE id = $4) as total_price
        `,
      [sole_color_id, upper_color_id, laces_color_id, logo_color_id]
    );

    const totalPrice = priceResult.rows[0].total_price + 50; // Base price of $50

    const result = await pool.query(
      `
            UPDATE sneakers 
            SET name = $1, total_price = $2, sole_color_id = $3, upper_color_id = $4, laces_color_id = $5, logo_color_id = $6, updated_at = CURRENT_TIMESTAMP
            WHERE id = $7
            RETURNING *
        `,
      [
        name,
        totalPrice,
        sole_color_id,
        upper_color_id,
        laces_color_id,
        logo_color_id,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Sneaker not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating sneaker:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete sneaker
export const deleteSneaker = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM sneakers WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Sneaker not found" });
    }

    res.json({ message: "Sneaker deleted successfully" });
  } catch (error) {
    console.error("Error deleting sneaker:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
