/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./configs/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:npg_N6yei3rszEJP@ep-floral-wind-a1s8e5gm-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
    }
  };