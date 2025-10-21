import pg from "pg";

// Use the external database URL from Render
const connectionString =
  "postgresql://sneakers_db_cafj_user:NuHS08vN7j8Wr55VwNRWhV63wIphtFjg@dpg-d3rvomjuibrs739ifung-a.oregon-postgres.render.com/sneakers_db_cafj";

const config = {
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
};

export const pool = new pg.Pool(config);
