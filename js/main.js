// js/script.js

const API_URL = 'https://your-vercel-backend-url/api'; // Replace with your actual Vercel backend URL

// Fetch and display all dynamic content
document.addEventListener('DOMContentLoaded', () => {
  loadContent();
  loadServices();
  loadSkills();
  loadProjects();
});

// Load General Content (e.g., text, colors)
async function loadContent() {
  const response = await fetch(`${API_URL}/content`);
  const content = await response.json();
  document.getElementById('homeText').textContent = content.homeText;
  document.getElementById('aboutText').textContent = content.aboutText;

  // Update CSS variables for colors
  document.documentElement.style.setProperty('--primary-blue', content.primaryColor);
  document.documentElement.style.setProperty('--accent-yellow', content.accentColor);
}

// Load Services
async function loadServices() {
  const response = await fetch(`${API_URL}/services`);
  const services = await response.json();
  const servicesGrid = document.getElementById('servicesGrid');
  servicesGrid.innerHTML = services.map(service => `
    <div class="service-card">
      <img src="${service.icon}" alt="${service.title} Icon" class="service-icon">
      <h3>${service.title}</h3>
      <p>${service.description}</p>
    </div>
  `).join('');
}

// Load Skills
async function loadSkills() {
  const response = await fetch(`${API_URL}/skills`);
  const skills = await response.json();
  const skillsWrapper = document.getElementById('skillsWrapper');
  skillsWrapper.innerHTML = skills.map(skill => `
    <div class="skill-bubble">${skill.name}</div>
  `).join('');
}

// Load Projects
async function loadProjects() {
  const response = await fetch(`${API_URL}/projects`);
  const projects = await response.json();
  const projectsGrid = document.getElementById('projectsGrid');
  projectsGrid.innerHTML = projects.map(project => `
    <div class="project-card">
      <img src="${project.image}" alt="${project.title} Screenshot" class="project-image">
      <div class="project-content">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <a href="${project.link}" target="_blank" class="project-link">View Project</a>
      </div>
    </div>
  `).join('');
}

// Handle Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  const response = await fetch(`${API_URL}/contacts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message }),
  });

  if (response.ok) {
    alert('Message sent successfully!');
    document.getElementById('contactForm').reset();
  } else {
    alert('Failed to send message.');
  }
});

//email

document.addEventListener('DOMContentLoaded', function () {
  emailjs.init('ZIWDZ0I2VaaKWRqWD'); // Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
});

function sendEmail(event) {
  event.preventDefault(); // Prevent the default form submission

  const serviceID = 'service_7th4acr'; // Replace with your EmailJS Service ID
  const templateID = 'template_cq0ztoe'; // Replace with your new Template ID from EmailJS

  // Use sendForm to automatically send the form data
  emailjs.sendForm(serviceID, templateID, '#contact-form')
      .then(response => {
          alert('Your message has been sent successfully!');
          document.getElementById('contact-form').reset(); // Clear the form after sending
      })
      .catch(error => {
          alert('Failed to send your message, please try again later.');
          console.error('EmailJS Error:', error); // Log the detailed error to the console
      });
}
