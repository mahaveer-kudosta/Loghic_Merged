import express from "express";
import { Server } from "http";
import passport from "passport";
import path from "path";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";

// Import models
import User from "./models/User.js";
import Company from "./models/Company.js";

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret_replace_this";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

// Middleware for authentication
const authenticateJWT = passport.authenticate("jwt", { session: false });

// Register API routes
export default async function registerRoutes(app) {
  // Create HTTP server
  const server = new Server(app);

  // API Routes
  const apiRouter = express.Router();
  app.use("/api", apiRouter);

  // Auth routes
  const authRouter = express.Router();
  apiRouter.use("/auth", authRouter);

  // Register route
  authRouter.post("/register", async (req, res) => {
    try {
      const { username, email, password, fullName } = req.body;

      // Check if user already exists
      const existingUserByEmail = await User.findOne({ email });
      if (existingUserByEmail) {
        return res.status(400).json({ message: "Email already in use" });
      }

      const existingUserByUsername = await User.findOne({ username });
      if (existingUserByUsername) {
        return res.status(400).json({ message: "Username already in use" });
      }

      // Create new user
      const newUser = new User({
        username,
        email,
        password, // Will be hashed by pre-save hook
        fullName,
      });

      // Save user
      await newUser.save();

      // Return success message
      res.status(201).json({
        message: "User registered successfully",
        user: newUser.getPublicProfile(),
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Registration failed" });
    }
  });

  // Login route
  authRouter.post("/login", (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: info.message || "Authentication failed" });
      }

      // Generate JWT token
      const token = jsonwebtoken.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });

      // Update last login
      user.lastLogin = new Date();
      user.save();

      // Return token and user data
      return res.json({
        message: "Login successful",
        token,
        user: user.getPublicProfile(),
      });
    })(req, res, next);
  });

  // Logout route
  authRouter.post("/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ message: "Logout successful" });
    });
  });

  // User routes
  const userRouter = express.Router();
  apiRouter.use("/users", userRouter);

  // Get current user
  userRouter.get("/me", authenticateJWT, (req, res) => {
    res.json(req.user.getPublicProfile());
  });

  // Update user profile
  userRouter.put("/profile", authenticateJWT, async (req, res) => {
    try {
      const { fullName, bio } = req.body;
      
      // Update user
      req.user.fullName = fullName || req.user.fullName;
      req.user.bio = bio || req.user.bio;
      
      // Save updated user
      await req.user.save();
      
      // Return updated user
      res.json(req.user.getPublicProfile());
    } catch (error) {
      console.error("Profile update error:", error);
      res.status(500).json({ message: "Profile update failed" });
    }
  });

  // Company routes
  const companyRouter = express.Router();
  apiRouter.use("/companies", companyRouter);

  // Get all companies
  companyRouter.get("/", async (req, res) => {
    try {
      const companies = await Company.find();
      res.json(companies);
    } catch (error) {
      console.error("Error fetching companies:", error);
      res.status(500).json({ message: "Error fetching companies" });
    }
  });

  // Get trending companies
  companyRouter.get("/trending", async (req, res) => {
    try {
      const trendingCompanies = await Company.findTrending();
      res.json(trendingCompanies);
    } catch (error) {
      console.error("Error fetching trending companies:", error);
      res.status(500).json({ message: "Error fetching trending companies" });
    }
  });

  // Get top gainers
  companyRouter.get("/top-gainers", async (req, res) => {
    try {
      const topGainers = await Company.findTopGainers();
      res.json(topGainers);
    } catch (error) {
      console.error("Error fetching top gainers:", error);
      res.status(500).json({ message: "Error fetching top gainers" });
    }
  });

  // Get top losers
  companyRouter.get("/top-losers", async (req, res) => {
    try {
      const topLosers = await Company.findTopLosers();
      res.json(topLosers);
    } catch (error) {
      console.error("Error fetching top losers:", error);
      res.status(500).json({ message: "Error fetching top losers" });
    }
  });

  // Get company by ID
  companyRouter.get("/:id", async (req, res) => {
    try {
      const company = await Company.findById(req.params.id);
      
      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }
      
      res.json(company);
    } catch (error) {
      console.error("Error fetching company:", error);
      res.status(500).json({ message: "Error fetching company" });
    }
  });

  // Get company by symbol
  companyRouter.get("/symbol/:symbol", async (req, res) => {
    try {
      const company = await Company.findOne({ symbol: req.params.symbol.toUpperCase() });
      
      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }
      
      res.json(company);
    } catch (error) {
      console.error("Error fetching company by symbol:", error);
      res.status(500).json({ message: "Error fetching company" });
    }
  });

  // Add more API routes here...
  // For posts, events, advisors, messages, notifications, etc.

  return server;
}