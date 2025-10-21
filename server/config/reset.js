import { pool } from "./database.js";

const resetDatabase = async () => {
  try {
    // Drop existing tables if they exist
    await pool.query("DROP TABLE IF EXISTS sneakers CASCADE");
    await pool.query("DROP TABLE IF EXISTS sneaker_options CASCADE");
    await pool.query("DROP TABLE IF EXISTS option_types CASCADE");

    // Create option_types table
    await pool.query(`
            CREATE TABLE option_types (
                id SERIAL PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                display_name VARCHAR(100) NOT NULL
            )
        `);

    // Create sneaker_options table
    await pool.query(`
            CREATE TABLE sneaker_options (
                id SERIAL PRIMARY KEY,
                option_type_id INTEGER REFERENCES option_types(id),
                name VARCHAR(100) NOT NULL,
                display_name VARCHAR(100) NOT NULL,
                price DECIMAL(10,2) DEFAULT 0,
                image_url VARCHAR(255),
                is_default BOOLEAN DEFAULT FALSE
            )
        `);

    // Create sneakers table
    await pool.query(`
            CREATE TABLE sneakers (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                base_price DECIMAL(10,2) NOT NULL DEFAULT 0,
                total_price DECIMAL(10,2) NOT NULL DEFAULT 0,
                sole_color_id INTEGER REFERENCES sneaker_options(id),
                upper_color_id INTEGER REFERENCES sneaker_options(id),
                laces_color_id INTEGER REFERENCES sneaker_options(id),
                logo_color_id INTEGER REFERENCES sneaker_options(id),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

    // Insert option types
    await pool.query(`
            INSERT INTO option_types (name, display_name) VALUES
            ('sole_color', 'Sole Color'),
            ('upper_color', 'Upper Color'),
            ('laces_color', 'Laces Color'),
            ('logo_color', 'Logo Color')
        `);

    // Insert sneaker options
    await pool.query(`
            INSERT INTO sneaker_options (option_type_id, name, display_name, price, is_default) VALUES
            -- Sole Colors
            (1, 'white', 'White', 0, true),
            (1, 'black', 'Black', 0, false),
            (1, 'red', 'Red', 5, false),
            (1, 'blue', 'Blue', 5, false),
            (1, 'green', 'Green', 5, false),
            (1, 'yellow', 'Yellow', 5, false),
            
            -- Upper Colors
            (2, 'white', 'White', 0, true),
            (2, 'black', 'Black', 0, false),
            (2, 'red', 'Red', 10, false),
            (2, 'blue', 'Blue', 10, false),
            (2, 'green', 'Green', 10, false),
            (2, 'yellow', 'Yellow', 10, false),
            (2, 'pink', 'Pink', 15, false),
            (2, 'purple', 'Purple', 15, false),
            
            -- Laces Colors
            (3, 'white', 'White', 0, true),
            (3, 'black', 'Black', 0, false),
            (3, 'red', 'Red', 3, false),
            (3, 'blue', 'Blue', 3, false),
            (3, 'green', 'Green', 3, false),
            (3, 'yellow', 'Yellow', 3, false),
            (3, 'pink', 'Pink', 5, false),
            (3, 'purple', 'Purple', 5, false),
            
            -- Logo Colors
            (4, 'white', 'White', 0, true),
            (4, 'black', 'Black', 0, false),
            (4, 'red', 'Red', 2, false),
            (4, 'blue', 'Blue', 2, false),
            (4, 'green', 'Green', 2, false),
            (4, 'yellow', 'Yellow', 2, false),
            (4, 'gold', 'Gold', 8, false),
            (4, 'silver', 'Silver', 8, false)
        `);

    console.log("Database reset completed successfully!");
  } catch (error) {
    console.error("Error resetting database:", error);
  } finally {
    await pool.end();
  }
};

resetDatabase();
