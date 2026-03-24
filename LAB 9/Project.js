// Name: Utkarsh Raj
// Roll No: 2330416

// Project model — stores portfolio project details in MongoDB

const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
    },
    techStack: {
      type: [String],
      required: true,
    },
    link: {
      type: String,
      default: "#",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

module.exports = mongoose.model("Project", projectSchema);
