// Handles dynamic card highlight on hover
document.addEventListener('DOMContentLoaded', () => {
  const teamImages = document.querySelectorAll('.team-member img');

  teamImages.forEach(img => {
    img.addEventListener('mouseenter', () => {
      // Remove active-card class from all team images
      teamImages.forEach(i => i.classList.remove('active-card'));
      // Add active-card class to the hovered image
      img.classList.add('active-card');
    });
  });
});
document.addEventListener('DOMContentLoaded', () => {
  // --- FILTER BUTTONS INTERACTIVITY ---
  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove 'active' class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add 'active' class to the clicked button
      button.classList.add('active');
    });
  });

  // --- TEAM CARDS HOVER INTERACTIVITY (From index.html) ---
  const teamImages = document.querySelectorAll('.team-member img');

  teamImages.forEach(img => {
    img.addEventListener('mouseenter', () => {
      teamImages.forEach(i => i.classList.remove('active-card'));
      img.classList.add('active-card');
    });
  });
});