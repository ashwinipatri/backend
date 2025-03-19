const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

// Allowed frontend URLs
const allowedOrigins = [
  "https://klefrontend.vercel.app",
  "https://klefrontend-an7i452tq-haribalajeeks-projects.vercel.app"
];

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allows cookies and authentication headers if needed
  })
);

// Connect to MongoDB
connectDB();

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/cart", require("./routes/cartRoutes"));

// Default route
app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});

// Start server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
