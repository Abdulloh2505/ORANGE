console.log("Orange Café - Users management page animations");

document.addEventListener('DOMContentLoaded', () => {
  
  // Check if anime.js is loaded
  if (typeof anime === 'undefined') {
    console.warn('Anime.js is not loaded. Animations will not work.');
    return;
  }

  // Users table animation
  const userRows = document.querySelectorAll('.user-row, tr[data-user-id]');
  if (userRows.length > 0) {
    userRows.forEach((row, index) => {
      anime({
        targets: row,
        translateX: [-50, 0],
        opacity: [0, 1],
        duration: 500,
        delay: index * 80,
        easing: 'easeOutExpo'
      });

      // Row hover animation
      row.addEventListener('mouseenter', () => {
        anime({
          targets: row,
          backgroundColor: '#FFF8F0',
          scale: 1.02,
          duration: 300,
          easing: 'easeOutQuad'
        });
      });

      row.addEventListener('mouseleave', () => {
        anime({
          targets: row,
          backgroundColor: '#ffffff',
          scale: 1,
          duration: 300,
          easing: 'easeOutQuad'
        });
      });
    });
  }

  // User avatar animations
  const avatars = document.querySelectorAll('.user-avatar, .member-image');
  if (avatars.length > 0) {
    avatars.forEach((avatar, index) => {
      anime({
        targets: avatar,
        scale: [0, 1],
        rotate: [180, 0],
        duration: 600,
        delay: index * 100,
        easing: 'easeOutElastic(1, .5)'
      });

      // Avatar hover effect
      avatar.addEventListener('mouseenter', () => {
        anime({
          targets: avatar,
          scale: 1.15,
          rotate: 5,
          boxShadow: '0 8px 20px rgba(255, 140, 66, 0.4)',
          duration: 300,
          easing: 'easeOutCubic'
        });

        // Coffee badge on hover
        showCoffeeBadge(avatar);
      });

      avatar.addEventListener('mouseleave', () => {
        anime({
          targets: avatar,
          scale: 1,
          rotate: 0,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          duration: 300,
          easing: 'easeOutCubic'
        });
      });
    });
  }

  // User action buttons (edit, delete, block)
  const actionButtons = document.querySelectorAll('.action-btn, .edit-btn, .delete-btn, .block-btn');
  if (actionButtons.length > 0) {
    actionButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        handleActionClick(btn);
      });
    });
  }

  // User status badges animation
  animateUserStatusBadges();

  // User stats counters
  animateUserStats();

  // Search/filter input animation
  const searchInput = document.querySelector('.user-search, input[type="search"]');
  if (searchInput) {
    initializeSearchAnimation(searchInput);
  }

  // User role dropdown animations
  const roleSelects = document.querySelectorAll('.role-select, select[name="memberType"]');
  if (roleSelects.length > 0) {
    roleSelects.forEach(select => {
      select.addEventListener('change', (e) => {
        handleRoleChange(e.target);
      });
    });
  }

  // Pagination animation
  animatePagination();

  // Add new user button
  const addUserBtn = document.querySelector('.add-user-btn, .create-user-btn');
  if (addUserBtn) {
    initializeAddUserButton(addUserBtn);
  }

  // User activity indicator
  animateActivityIndicators();

  // Floating coffee decorations
  createUserPageDecorations();
});

// Show coffee badge on avatar hover
function showCoffeeBadge(avatar) {
  const rect = avatar.getBoundingClientRect();
  
  const badge = document.createElement('div');
  badge.textContent = '☕';
  badge.style.position = 'fixed';
  badge.style.left = rect.right + 'px';
  badge.style.top = rect.top + 'px';
  badge.style.fontSize = '30px';
  badge.style.pointerEvents = 'none';
  badge.style.zIndex = '10000';
  
  document.body.appendChild(badge);

  anime({
    targets: badge,
    translateX: [0, 20],
    translateY: [0, -20],
    rotate: 360,
    scale: [0, 1.5, 0],
    opacity: [0, 1, 0],
    duration: 1000,
    easing: 'easeOutExpo',
    complete: () => badge.remove()
  });
}

// Handle action button clicks
function handleActionClick(btn) {
  const action = btn.dataset.action || btn.className;
  
  anime({
    targets: btn,
    scale: [1, 0.9, 1.1, 1],
    duration: 400,
    easing: 'easeInOutQuad'
  });

  if (action.includes('delete')) {
    createDeleteConfirmation(btn);
  } else if (action.includes('edit')) {
    createEditModal(btn);
  } else if (action.includes('block')) {
    toggleBlockStatus(btn);
  }
}

// Create delete confirmation animation
function createDeleteConfirmation(btn) {
  const row = btn.closest('tr, .user-row');
  
  anime({
    targets: row,
    backgroundColor: ['#ffffff', '#ffebee', '#ffffff'],
    duration: 500,
    easing: 'easeInOutQuad',
    loop: 2
  });

  // Show confirmation with animation
  const confirmed = confirm('Delete this user?');
  
  if (confirmed) {
    anime({
      targets: row,
      translateX: 1000,
      opacity: 0,
      duration: 600,
      easing: 'easeInExpo',
      complete: () => {
        row.remove();
        showNotification('User deleted successfully', 'success');
      }
    });
  }
}

// Create edit modal
function createEditModal(btn) {
  const modal = document.createElement('div');
  modal.className = 'edit-modal';
  modal.style.position = 'fixed';
  modal.style.top = '50%';
  modal.style.left = '50%';
  modal.style.transform = 'translate(-50%, -50%)';
  modal.style.backgroundColor = 'white';
  modal.style.padding = '30px';
  modal.style.borderRadius = '15px';
  modal.style.boxShadow = '0 10px 40px rgba(0,0,0,0.3)';
  modal.style.zIndex = '10001';
  modal.style.minWidth = '400px';
  
  modal.innerHTML = `
    <h3 style="color: #FF8C42; margin-bottom: 20px;">☕ Edit User</h3>
    <p>Edit user functionality here...</p>
    <button class="close-modal-btn" style="margin-top: 20px; padding: 10px 20px; background: #FF8C42; color: white; border: none; border-radius: 8px; cursor: pointer;">Close</button>
  `;
  
  document.body.appendChild(modal);

  anime({
    targets: modal,
    scale: [0, 1],
    opacity: [0, 1],
    duration: 400,
    easing: 'easeOutBack'
  });

  modal.querySelector('.close-modal-btn').addEventListener('click', () => {
    anime({
      targets: modal,
      scale: 0,
      opacity: 0,
      duration: 300,
      easing: 'easeInBack',
      complete: () => modal.remove()
    });
  });
}

// Toggle block status
function toggleBlockStatus(btn) {
  const row = btn.closest('tr, .user-row');
  const isBlocked = btn.dataset.blocked === 'true';
  
  btn.dataset.blocked = !isBlocked;
  btn.textContent = isBlocked ? 'Block' : 'Unblock';
  
  anime({
    targets: row,
    backgroundColor: isBlocked ? '#ffffff' : '#ffebee',
    duration: 500,
    easing: 'easeInOutQuad'
  });

  showNotification(
    isBlocked ? 'User unblocked' : 'User blocked',
    isBlocked ? 'success' : 'warning'
  );
}

// Animate user status badges
function animateUserStatusBadges() {
  const badges = document.querySelectorAll('.status-badge, .member-status');
  
  badges.forEach((badge, index) => {
    anime({
      targets: badge,
      scale: [0, 1],
      rotate: [0, 360],
      duration: 600,
      delay: index * 100,
      easing: 'easeOutElastic(1, .5)'
    });

    // Pulse animation for active status
    if (badge.textContent.toLowerCase().includes('active')) {
      anime({
        targets: badge,
        scale: [1, 1.1, 1],
        duration: 2000,
        easing: 'easeInOutSine',
        loop: true
      });
    }
  });
}

// Animate user statistics
function animateUserStats() {
  const statNumbers = document.querySelectorAll('.stat-number, .user-count');
  
  statNumbers.forEach((stat, index) => {
    const finalValue = parseInt(stat.textContent) || 0;
    
    anime({
      targets: stat,
      innerHTML: [0, finalValue],
      round: 1,
      duration: 2000,
      delay: index * 200,
      easing: 'easeOutExpo'
    });
  });
}

// Initialize search animation
function initializeSearchAnimation(input) {
  input.addEventListener('focus', () => {
    anime({
      targets: input,
      scale: 1.05,
      borderColor: '#FF8C42',
      duration: 300,
      easing: 'easeOutQuad'
    });

    // Show search icon animation
    const icon = input.parentElement?.querySelector('.search-icon');
    if (icon) {
      anime({
        targets: icon,
        rotate: 360,
        scale: 1.2,
        duration: 400,
        easing: 'easeOutElastic(1, .5)'
      });
    }
  });

  input.addEventListener('blur', () => {
    anime({
      targets: input,
      scale: 1,
      borderColor: '#ddd',
      duration: 300,
      easing: 'easeOutQuad'
    });
  });

  input.addEventListener('input', () => {
    filterUsers(input.value);
  });
}

// Filter users with animation
function filterUsers(searchTerm) {
  const rows = document.querySelectorAll('.user-row, tr[data-user-id]');
  const term = searchTerm.toLowerCase();

  rows.forEach((row, index) => {
    const text = row.textContent.toLowerCase();
    const shouldShow = text.includes(term);

    if (shouldShow) {
      anime({
        targets: row,
        opacity: [0, 1],
        translateX: [-20, 0],
        duration: 300,
        delay: index * 30,
        easing: 'easeOutExpo',
        begin: () => {
          row.style.display = '';
        }
      });
    } else {
      anime({
        targets: row,
        opacity: 0,
        translateX: -20,
        duration: 200,
        easing: 'easeInQuad',
        complete: () => {
          row.style.display = 'none';
        }
      });
    }
  });
}

// Handle role change
function handleRoleChange(select) {
  const row = select.closest('tr, .user-row');
  
  anime({
    targets: row,
    backgroundColor: ['#ffffff', '#e3f2fd', '#ffffff'],
    duration: 800,
    easing: 'easeInOutQuad'
  });

  anime({
    targets: select,
    rotate: [0, 360],
    duration: 400,
    easing: 'easeOutCubic'
  });

  showNotification('User role updated', 'success');
}

// Animate pagination
function animatePagination() {
  const paginationBtns = document.querySelectorAll('.pagination-btn, .page-number');
  
  paginationBtns.forEach((btn, index) => {
    anime({
      targets: btn,
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 400,
      delay: index * 50,
      easing: 'easeOutExpo'
    });

    btn.addEventListener('click', () => {
      anime({
        targets: btn,
        scale: [1, 1.2, 1],
        backgroundColor: ['#fff', '#FF8C42', '#fff'],
        duration: 400,
        easing: 'easeInOutQuad'
      });
    });
  });
}

// Initialize add user button
function initializeAddUserButton(btn) {
  anime({
    targets: btn,
    scale: [0, 1],
    rotate: [180, 0],
    duration: 800,
    delay: 300,
    easing: 'easeOutElastic(1, .6)'
  });

  btn.addEventListener('click', () => {
    createCoffeeParticles(btn);
    
    anime({
      targets: btn,
      scale: [1, 0.9, 1.1, 1],
      rotate: [0, -10, 10, 0],
      duration: 600,
      easing: 'easeInOutQuad'
    });
  });
}

// Create coffee particles
function createCoffeeParticles(element) {
  const rect = element.getBoundingClientRect();
  
  for (let i = 0; i < 8; i++) {
    const particle = document.createElement('div');
    particle.textContent = '☕';
    particle.style.position = 'fixed';
    particle.style.left = rect.left + (rect.width / 2) + 'px';
    particle.style.top = rect.top + (rect.height / 2) + 'px';
    particle.style.fontSize = '20px';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '10000';
    
    document.body.appendChild(particle);

    const angle = (360 / 8) * i;
    
    anime({
      targets: particle,
      translateX: 80 * Math.cos(angle * Math.PI / 180),
      translateY: 80 * Math.sin(angle * Math.PI / 180),
      rotate: 720,
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
      duration: 1000,
      easing: 'easeOutExpo',
      complete: () => particle.remove()
    });
  }
}

// Animate activity indicators
function animateActivityIndicators() {
  const indicators = document.querySelectorAll('.activity-indicator, .online-status');
  
  indicators.forEach((indicator) => {
    if (indicator.classList.contains('online') || indicator.classList.contains('active')) {
      anime({
        targets: indicator,
        scale: [1, 1.3, 1],
        opacity: [1, 0.7, 1],
        duration: 2000,
        easing: 'easeInOutSine',
        loop: true
      });
    }
  });
}

// Create user page decorations
function createUserPageDecorations() {
  for (let i = 0; i < 5; i++) {
    const decoration = document.createElement('div');
    decoration.textContent = ['☕', '🫘', '☕'][i % 3];
    decoration.style.position = 'fixed';
    decoration.style.fontSize = '40px';
    decoration.style.opacity = '0.06';
    decoration.style.pointerEvents = 'none';
    decoration.style.zIndex = '0';
    decoration.style.left = Math.random() * 100 + '%';
    decoration.style.top = Math.random() * 100 + '%';
    
    document.body.appendChild(decoration);

    anime({
      targets: decoration,
      translateY: [0, -40, 0],
      rotate: 360,
      duration: 10000 + (i * 2000),
      easing: 'easeInOutSine',
      loop: true
    });
  }
}

// Show notification
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.position = 'fixed';
  notification.style.top = '20px';
  notification.style.right = '20px';
  notification.style.padding = '15px 25px';
  notification.style.backgroundColor = type === 'success' ? '#4CAF50' : type === 'warning' ? '#ff9800' : '#2196F3';
  notification.style.color = 'white';
  notification.style.borderRadius = '8px';
  notification.style.zIndex = '10002';
  notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
  
  document.body.appendChild(notification);

  anime({
    targets: notification,
    translateX: [300, 0],
    opacity: [0, 1],
    duration: 400,
    easing: 'easeOutExpo'
  });

  setTimeout(() => {
    anime({
      targets: notification,
      translateX: 300,
      opacity: 0,
      duration: 400,
      easing: 'easeInExpo',
      complete: () => notification.remove()
    });
  }, 3000);
}

console.log("☕ Orange Café users management animations loaded!");
