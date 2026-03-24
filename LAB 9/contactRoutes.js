// Name: Utkarsh Raj
// Roll No: 2330416

// Contact routes — defines API endpoints for the contact form

const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { submitContact, getContacts } = require("../controllers/contactController");

// POST /api/contact — submit a new contact message (with validation)
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required").trim(),
    body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
    body("message").notEmpty().withMessage("Message is required").trim(),
  ],
  submitContact
);

// GET /api/contact — get all contact submissions
router.get("/", getContacts);

module.exports = router;
