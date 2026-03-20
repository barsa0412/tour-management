export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api/v1"
    : "https://your-backend-url.onrender.com/api/v1";