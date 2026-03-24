// Name: Utkarsh Raj
// Roll No: 2330416

// Contact controller — handles saving contact form submissions

const Contact = require("../models/Contact");
const { validationResult } = require("express-validator");

// @desc    Save a new contact message
// @route   POST /api/contact
const submitContact = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, message } = req.body;

    const newContact = await Contact.create({ name, email, message });

    res.status(201).json({
      message: "Message received! Thank you for reaching out.",
      contact: newContact,
    });
  } catch (error) {
    console.error("Error saving contact:", error.message);
    res.status(500).json({ message: "Server error while saving your message" });
  }
};

// @desc    Get all contact submissions (for admin use)
// @route   GET /api/contact
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { submitContact, getContacts };
