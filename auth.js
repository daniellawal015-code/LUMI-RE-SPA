document.addEventListener('DOMContentLoaded', () => {
  const currentUser = JSON.parse(localStorage.getItem('lumiere_current_user'));
  const header = document.querySelector('header');

  if (!header) return;

  // Find existing login button or avatar container
  let authContainer = header.querySelector('.login-btn, .user-avatar-container');

  if (currentUser) {
    // USER IS LOGGED IN
    const firstName = (currentUser.name || 'User').split(' ')[0];
    const initial = firstName.charAt(0).toUpperCase();

    // Create avatar HTML with dropdown
    const avatarHTML = `
      <div class="user-avatar-container" style="position: relative; cursor: pointer;">
        <div class="user-avatar" id="globalAvatar">${initial}</div>
        <div class="avatar-dropdown" id="avatarDropdown" style="display: none;">
          <p class="dropdown-user-name">${currentUser.name || 'Member'}</p>
          <hr>
          <a href="dashboard.html">Dashboard</a>
          <a href="#" id="logoutBtn" style="color: #c53030;">Logout</a>
        </div>
      </div>
    `;

    if (authContainer) {
      authContainer.outerHTML = avatarHTML;
    } else {
      header.insertAdjacentHTML('beforeend', avatarHTML);
    }

    // Toggle dropdown on click
    const globalAvatar = document.getElementById('globalAvatar');
    const avatarDropdown = document.getElementById('avatarDropdown');

    if (globalAvatar && avatarDropdown) {
      globalAvatar.addEventListener('click', (e) => {
        e.stopPropagation();
        avatarDropdown.style.display = avatarDropdown.style.display === 'block' ? 'none' : 'block';
      });

      document.addEventListener('click', () => {
        avatarDropdown.style.display = 'none';
      });
    }

    // Handle Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('lumiere_current_user');
        window.location.href = 'index.html';
      });
    }

  } else {
    // USER IS LOGGED OUT
    if (!authContainer || !authContainer.classList.contains('login-btn')) {
      const loginBtnHTML = `<a href="login.html" class="login-btn">Login</a>`;
      if (authContainer) {
        authContainer.outerHTML = loginBtnHTML;
      } else {
        header.insertAdjacentHTML('beforeend', loginBtnHTML);
      }
    }
  }
});