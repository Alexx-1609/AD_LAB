// Name: Utkarsh Raj
// Roll No: 2330416

// ===== Portfolio Data =====
// In a MERN setup, this would come from a MongoDB database via Express API
const portfolioData = {
  skills: [
    { name: "C++", level: 85 },
    { name: "SQL", level: 90 },
    { name: "Python", level: 80 },
    { name: "DAX", level: 75 },
    { name: "Power BI", level: 90 },
    { name: "MySQL", level: 85 },
    { name: "Power Query", level: 80 },
  ],
  projects: [
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
  ],
};

// ===== Theme Toggle =====
// Reads preference from localStorage and applies it on load
const themeToggle = document.getElementById("themeToggle");
const toggleIcon = document.getElementById("toggleIcon");

function applyTheme(dark) {
  if (dark) {
    document.documentElement.classList.add("dark");
    toggleIcon.textContent = "🌙";
  } else {
    document.documentElement.classList.remove("dark");
    toggleIcon.textContent = "☀️";
  }
  localStorage.setItem("theme", dark ? "dark" : "light");
}

// Check saved preference on page load
const savedTheme = localStorage.getItem("theme");
applyTheme(savedTheme === "dark");

themeToggle.addEventListener("click", function () {
  const isDark = document.documentElement.classList.contains("dark");
  applyTheme(!isDark);
});

// ===== Mobile Hamburger Menu =====
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", function () {
  navLinks.classList.toggle("open");
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("open");
  });
});

// ===== Render Skills =====
const skillsContainer = document.querySelector(".skills-list");

portfolioData.skills.forEach(function (skill) {
  const item = document.createElement("div");
  item.classList.add("skill-item");
  item.innerHTML = `
    <div class="skill-header">
      <span class="skill-name">${skill.name}</span>
      <span class="skill-pct">${skill.level}%</span>
    </div>
    <div class="skill-track">
      <div class="skill-fill" data-level="${skill.level}"></div>
    </div>
  `;
  skillsContainer.appendChild(item);
});

// ===== Render Projects =====
const projectsGrid = document.getElementById("projectsGrid");

portfolioData.projects.forEach(function (project, i) {
  const card = document.createElement("div");
  card.classList.add("project-card");

  const tags = project.techStack
    .map(function (t) {
      return '<span class="tag">' + t + "</span>";
    })
    .join("");

  card.innerHTML = `
    <span class="project-num">Project 0${i + 1}</span>
    <h3>${project.title}</h3>
    <p>${project.description}</p>
    <div class="project-tags">${tags}</div>
    <a href="${project.link}" class="project-link">View Details ↗</a>
  `;
  projectsGrid.appendChild(card);
});

// ===== Fade-in on Scroll (Intersection Observer) =====
const fadeElements = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // only animate once
      }
    });
  },
  { threshold: 0.15 }
);

fadeElements.forEach(function (el) {
  observer.observe(el);
});

// Also animate skill bars when they become visible
const skillSection = document.getElementById("skills");
const skillObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        document.querySelectorAll(".skill-fill").forEach(function (bar) {
          bar.style.width = bar.getAttribute("data-level") + "%";
        });
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

skillObserver.observe(skillSection);

// ===== Contact Form =====
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Basic validation
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = "Please fill all fields.";
    return;
  }

  // Simulate sending (in MERN setup, this would POST to /api/contact)
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  setTimeout(function () {
    formStatus.textContent = "Message sent successfully! Thank you.";
    contactForm.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";

    // Clear status after a few seconds
    setTimeout(function () {
      formStatus.textContent = "";
    }, 4000);
  }, 1500);
});
