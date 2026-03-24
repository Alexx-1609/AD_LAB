// Name: Utkarsh Raj
// Roll No: 2330416

// Project controller — handles fetching project data from MongoDB

const Project = require("../models/Project");

// @desc    Get all projects
// @route   GET /api/projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Server error while fetching projects" });
  }
};

// @desc    Seed default projects (for initial setup)
// @route   POST /api/projects/seed
const seedProjects = async (req, res) => {
  try {
    // Check if projects already exist
    const count = await Project.countDocuments();
    if (count > 0) {
      return res.status(400).json({ message: "Projects already seeded" });
    }

    const defaultProjects = [
      {
        title: "Insurance Analytics Dashboard",
        description:
          "Analyzed ₹5.98M in premiums and ₹16.91M in claims using Power BI. Built interactive dashboards with drill-through filters to identify high-risk policy segments and regional claim trends.",
        techStack: ["Power BI", "DAX", "Power Query", "SQL"],
        link: "#",
      },
      {
        title: "Loan Default Risk Analysis",
        description:
          "Performed exploratory data analysis on 200K+ loan records to identify default risk patterns. Used Python and SQL for data cleaning, feature engineering, and visualization of key risk indicators.",
        techStack: ["Python", "SQL", "Pandas", "Matplotlib"],
        link: "#",
      },
      {
        title: "UPI Transaction Dashboard",
        description:
          "Designed a real-time dashboard tracking UPI transactions across 50+ cities. Visualized transaction volumes, success rates, and regional adoption patterns using Power BI.",
        techStack: ["Power BI", "DAX", "SQL", "Power Query"],
        link: "#",
      },
    ];

    await Project.insertMany(defaultProjects);
    res.status(201).json({ message: "Projects seeded successfully" });
  } catch (error) {
    console.error("Error seeding projects:", error.message);
    res.status(500).json({ message: "Server error while seeding projects" });
  }
};

module.exports = { getProjects, seedProjects };
