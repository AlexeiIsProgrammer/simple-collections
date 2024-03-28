export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
  },
});
