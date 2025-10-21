import { pool } from "../config/database.js";

// Get all option types
export const getOptionTypes = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM option_types ORDER BY id");
    res.json(result.rows);
  } catch (error) {
    console.error("Error getting option types:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get options by type
export const getOptionsByType = async (req, res) => {
  try {
    const { typeId } = req.params;
    const result = await pool.query(
      `
            SELECT * FROM sneaker_options 
            WHERE option_type_id = $1 
            ORDER BY is_default DESC, name
        `,
      [typeId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error getting options by type:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all options with their types
export const getAllOptions = async (req, res) => {
  try {
    const result = await pool.query(`
            SELECT so.*, ot.name as type_name, ot.display_name as type_display_name
            FROM sneaker_options so
            JOIN option_types ot ON so.option_type_id = ot.id
            ORDER BY so.option_type_id, so.is_default DESC, so.name
        `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error getting all options:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get single option by ID
export const getOptionById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `
            SELECT so.*, ot.name as type_name, ot.display_name as type_display_name
            FROM sneaker_options so
            JOIN option_types ot ON so.option_type_id = ot.id
            WHERE so.id = $1
        `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Option not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error getting option:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
