document.addEventListener('DOMContentLoaded', () => {
  const currentUser = JSON.parse(localStorage.getItem('lumiere_current_user'));
  const header = document.querySelector('header');

  if (!header) return;

  const isDashboard = window.location.pathname.includes('dashboard.html');

  // 1. CREATE DRAWER & OVERLAY IF NOT EXISTING
  let drawer = document.getElementById('mobileDrawer');
  let overlay = document.getElementById('drawerOverlay');

  if (!drawer) {
    overlay = document.createElement('div');
    overlay.id = 'drawerOverlay';
    overlay.className = 'drawer-overlay';

    drawer = document.createElement('div');
    drawer.id = 'mobileDrawer';
    drawer.className = 'mobile-drawer';

    // Profile Footer HTML inside drawer
    let userFooterHTML = '';
    if (currentUser) {
      const firstName = (currentUser.name || 'User').split(' ')[0];
      const initial = firstName.charAt(0).toUpperCase();
      userFooterHTML = `
        <div class="drawer-user-profile">
          <div class="user-avatar">${initial}</div>
          <div class="user-info">
            <p class="u-name">${currentUser.name || 'Member'}</p>
            <a href="#" id="drawerLogoutBtn" class="u-logout">Logout</a>
          </div>
        </div>
      `;
    } else {
      userFooterHTML = `
        <div class="drawer-user-profile">
          <a href="login.html" class="login-btn" style="width: 100%; text-align: center;">Login</a>
        </div>
      `;
    }

    drawer.innerHTML = `
      <div class="drawer-header">
        <h3>${isDashboard ? 'Member Hub' : 'Lumière Spa'}</h3>
        <button class="drawer-close" id="closeDrawerBtn">&times;</button>
      </div>

      <nav class="drawer-nav">
        <p class="drawer-section-title">Navigation</p>
        <a href="index.html">Home</a>
        <a href="services.html">Services</a>
        <a href="gallery.html">Gallery</a>
        <a href="book.html">Book</a>
        ${isDashboard ? `
          <hr class="drawer-divider">
          <p class="drawer-section-title">Dashboard Menu</p>
          <a href="#" class="active">📊 Dashboard</a>
          <a href="#">📅 Bookings</a>
          <a href="#">🤍 Wishlist</a>
          <a href="#">👤 Profile</a>
          <a href="#">⚙️ Settings</a>
        ` : ''}
      </nav>

      <div class="drawer-footer">
        ${userFooterHTML}
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);
  }

  // 2. DESKTOP AVATAR / LOGIN SETUP
  let authContainer = header.querySelector('a[href*="login.html"], .login-btn, .user-avatar-container, .user-avatar');

  if (currentUser) {
    const firstName = (currentUser.name || 'User').split(' ')[0];
    const initial = firstName.charAt(0).toUpperCase();

    const avatarHTML = `
      <div class="user-avatar-container desktop-only-auth" style="position: relative; cursor: pointer;">
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

    // Toggle Desktop Dropdown
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

  } else {
    if (!authContainer || authContainer.classList.contains('user-avatar-container') || authContainer.classList.contains('user-avatar')) {
      const loginBtnHTML = `<a href="login.html" class="login-btn desktop-only-auth">Login</a>`;
      if (authContainer) {
        authContainer.outerHTML = loginBtnHTML;
      } else {
        header.insertAdjacentHTML('beforeend', loginBtnHTML);
      }
    }
  }

  // 3. INJECT RIGHT-ALIGNED HAMBURGER BUTTON IN HEADER
  if (!header.querySelector('.nav-hamburger-btn')) {
    const mobileBtn = document.createElement('button');
    mobileBtn.id = 'mobileMenuBtn';
    mobileBtn.className = 'nav-hamburger-btn';
    mobileBtn.setAttribute('aria-label', 'Toggle Navigation');
    mobileBtn.innerHTML = `<span></span><span></span><span></span>`;
    
    header.appendChild(mobileBtn);

    function openDrawer() {
      drawer.classList.add('open');
      overlay.classList.add('active');
    }

    function closeDrawer() {
      drawer.classList.remove('open');
      overlay.classList.remove('active');
    }

    mobileBtn.addEventListener('click', openDrawer);
    const closeBtn = document.getElementById('closeDrawerBtn');
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (overlay) overlay.addEventListener('click', closeDrawer);
  }

  // 4. LOGOUT HANDLERS
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('lumiere_current_user');
    window.location.href = 'index.html';
  };

  const logoutBtn = document.getElementById('logoutBtn');
  const drawerLogoutBtn = document.getElementById('drawerLogoutBtn');
  if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
  if (drawerLogoutBtn) drawerLogoutBtn.addEventListener('click', handleLogout);
});