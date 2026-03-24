// Name: Utkarsh Raj
// Roll No: 2330416

// Project routes — defines API endpoints for projects

const express = require("express");
const router = express.Router();
const { getProjects, seedProjects } = require("../controllers/projectController");

// GET /api/projects — fetch all projects
router.get("/", getProjects);

// POST /api/projects/seed — seed default project data
router.post("/seed", seedProjects);

module.exports = router;
