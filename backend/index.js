import express from "express";
import cors from "cors";
import requestIp from "request-ip";
import dotenv from "dotenv";
import mongoose from "mongoose";
import UAParser from "ua-parser-js";
import User from "./models/user.js";
import publicRoutes from "./routes/public.js";

dotenv.config();

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());
app.use(requestIp.mw());

// User identification middleware
app.use(async (req, res, next) => {
  try {
    // Attempt to find the user by IP address
    let user = await User.findOne({ ip: req.clientIp });

    if (!user) {
      // If user doesn't exist, parse the user agent for device info
      const userAgent = req.headers["user-agent"];
      const parser = new UAParser(userAgent);
      const parserResults = parser.getResult();
      console.log(parserResults); // Log the parsed user agent results

      // Create a new user instance
      const newUser = new User({
        ip: req.clientIp,
        deviceInfo: parserResults,
        activity: [],
      });

      // Save the new user to the database
      await newUser.save();
      user = newUser; // Set the user variable to the newly created user
    }

    // Attach the user to the request object for future middleware/routes
    req.user = user;
    next(); // Proceed to the next middleware
  } catch (err) {
    console.error(err); // Log the error
    res.status(500).json({ error: "Internal server error" }); // Send error response
  }
});

// Use public routes
app.use(publicRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_CONNECT)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
