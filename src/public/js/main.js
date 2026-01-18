console.log("Orange Café - Main JavaScript loaded");

// Global coffee shop utilities and animations

// Check if anime.js is available
const hasAnimeJS = typeof anime !== 'undefined';

if (!hasAnimeJS) {
  console.warn('⚠️ Anime.js is not loaded. Some animations will not work.');
  console.log('Add this to your HTML: <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>');
}

// Global configuration
const COFFEE_CONFIG = {
  colors: {
    primary: '#FF8C42',      // Orange
    secondary: '#D97326',    // Dark Orange
    brown: '#2C1810',        // Dark Brown
    cream: '#F5DEB3',        // Cream
    gold: '#D4AF37'          // Gold
  },
  animations: {
    duration: {
      fast: 300,
      normal: 600,
      slow: 1000
    },
    easing: {
      smooth: 'easeOutQuad',
      bounce: 'easeOutElastic(1, .5)',
      sharp: 'easeInOutCubic'
    }
  }
};

// Global utilities
window.CoffeeShop = {
  config: COFFEE_CONFIG,
  
  // Show toast notification
  toast: function(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'coffee-toast';
    toast.textContent = message;
    
    const colors = {
      success: '#4CAF50',
      error: '#f44336',
      warning: '#ff9800',
      info: '#FF8C42'
    };
    
    Object.assign(toast.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '15px 25px',
      backgroundColor: colors[type] || colors.info,
      color: 'white',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      zIndex: '10000',
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      maxWidth: '300px'
    });
    
    document.body.appendChild(toast);
    
    if (hasAnimeJS) {
      anime({
        targets: toast,
        translateX: [300, 0],
        opacity: [0, 1],
        duration: 400,
        easing: 'easeOutExpo'
      });
      
      setTimeout(() => {
        anime({
          targets: toast,
          translateX: 300,
          opacity: 0,
          duration: 400,
          easing: 'easeInExpo',
          complete: () => toast.remove()
        });
      }, duration);
    } else {
      toast.style.animation = 'slideIn 0.4s ease-out';
      setTimeout(() => {
        toast.style.animation = 'slideOut 0.4s ease-in';
        setTimeout(() => toast.remove(), 400);
      }, duration);
    }
  },
  
  // Create coffee particle effect
  createCoffeeParticles: function(x, y, count = 8) {
    if (!hasAnimeJS) return;
    
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.textContent = ['☕', '🫘'][i % 2];
      
      Object.assign(particle.style, {
        position: 'fixed',
        left: x + 'px',
        top: y + 'px',
        fontSize: '24px',
        pointerEvents: 'none',
        zIndex: '9999'
      });
      
      document.body.appendChild(particle);
      
      const angle = (360 / count) * i;
      const distance = 80;
      
      anime({
        targets: particle,
        translateX: distance * Math.cos(angle * Math.PI / 180),
        translateY: distance * Math.sin(angle * Math.PI / 180),
        rotate: 720,
        scale: [0, 1.5, 0],
        opacity: [0, 1, 0],
        duration: 1200,
        easing: 'easeOutExpo',
        complete: () => particle.remove()
      });
    }
  },
  
  // Smooth scroll to element
  scrollTo: function(element, offset = 0) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }
    
    if (element) {
      const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
      
      window.scrollTo({
        top: top,
        behavior: 'smooth'
      });
    }
  },
  
  // Loading spinner
  showLoading: function(text = 'Brewing...') {
    const loader = document.createElement('div');
    loader.id = 'coffee-loader';
    loader.innerHTML = `
      <div style="text-align: center;">
        <div class="coffee-cup-loader">☕</div>
        <p style="color: #FF8C42; margin-top: 15px; font-size: 16px;">${text}</p>
      </div>
    `;
    
    Object.assign(loader.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: '10001'
    });
    
    document.body.appendChild(loader);
    
    const cup = loader.querySelector('.coffee-cup-loader');
    cup.style.fontSize = '60px';
    
    if (hasAnimeJS) {
      anime({
        targets: cup,
        rotate: [0, 20, -20, 0],
        translateY: [-10, 10],
        duration: 2000,
        easing: 'easeInOutSine',
        loop: true
      });
    }
  },
  
  hideLoading: function() {
    const loader = document.getElementById('coffee-loader');
    if (loader) {
      if (hasAnimeJS) {
        anime({
          targets: loader,
          opacity: 0,
          duration: 300,
          easing: 'easeOutQuad',
          complete: () => loader.remove()
        });
      } else {
        loader.remove();
      }
    }
  }
};

// Initialize global features
document.addEventListener('DOMContentLoaded', () => {
  
  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '') {
        e.preventDefault();
        CoffeeShop.scrollTo(href);
      }
    });
  });
  
  // Add ripple effect to buttons
  document.querySelectorAll('button, .btn').forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX;
      const y = e.clientY;
      
      if (hasAnimeJS) {
        const ripple = document.createElement('div');
        
        Object.assign(ripple.style, {
          position: 'absolute',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          width: '0',
          height: '0',
          left: (x - rect.left) + 'px',
          top: (y - rect.top) + 'px',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none'
        });
        
        this.style.position = this.style.position || 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        anime({
          targets: ripple,
          width: Math.max(rect.width, rect.height) * 2,
          height: Math.max(rect.width, rect.height) * 2,
          opacity: [0.6, 0],
          duration: 600,
          easing: 'easeOutExpo',
          complete: () => ripple.remove()
        });
      }
    });
  });
  
  // Lazy load images with fade-in
  const images = document.querySelectorAll('img[data-src]');
  if (images.length > 0 && 'IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          
          img.onload = () => {
            if (hasAnimeJS) {
              anime({
                targets: img,
                opacity: [0, 1],
                scale: [0.9, 1],
                duration: 600,
                easing: 'easeOutQuad'
              });
            }
          };
          
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
  
  // Back to top button
  const backToTopBtn = document.createElement('button');
  backToTopBtn.innerHTML = '☕';
  backToTopBtn.className = 'back-to-top-btn';
  
  Object.assign(backToTopBtn.style, {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#FF8C42',
    color: 'white',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    zIndex: '1000',
    opacity: '0',
    pointerEvents: 'none',
    transition: 'all 0.3s ease'
  });
  
  document.body.appendChild(backToTopBtn);
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.style.opacity = '1';
      backToTopBtn.style.pointerEvents = 'auto';
    } else {
      backToTopBtn.style.opacity = '0';
      backToTopBtn.style.pointerEvents = 'none';
    }
  });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    if (hasAnimeJS) {
      anime({
        targets: backToTopBtn,
        rotate: 720,
        scale: [1, 1.3, 1],
        duration: 600,
        easing: 'easeOutElastic(1, .5)'
      });
    }
  });
  
  // Add hover effect to back to top button
  backToTopBtn.addEventListener('mouseenter', () => {
    backToTopBtn.style.transform = 'scale(1.1)';
    backToTopBtn.style.backgroundColor = '#D97326';
  });
  
  backToTopBtn.addEventListener('mouseleave', () => {
    backToTopBtn.style.transform = 'scale(1)';
    backToTopBtn.style.backgroundColor = '#FF8C42';
  });
  
  // Form validation utilities
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        validateField(input);
      });
    });
  });
  
  // Console welcome message
  console.log('%c☕ Welcome to Orange Café! ☕', 'color: #FF8C42; font-size: 24px; font-weight: bold;');
  console.log('%cEnjoy our premium coffee experience!', 'color: #8B6F47; font-size: 14px;');
});

// Field validation
function validateField(field) {
  const value = field.value.trim();
  let isValid = true;
  let message = '';
  
  if (field.required && !value) {
    isValid = false;
    message = 'This field is required';
  } else if (field.type === 'email' && value) {
    isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    message = isValid ? '' : 'Please enter a valid email';
  } else if (field.type === 'password' && value) {
    isValid = value.length >= 6;
    message = isValid ? '' : 'Password must be at least 6 characters';
  }
  
  // Visual feedback
  if (hasAnimeJS && value) {
    anime({
      targets: field,
      borderColor: isValid ? '#4CAF50' : '#f44336',
      duration: 300,
      easing: 'easeOutQuad'
    });
  } else if (value) {
    field.style.borderColor = isValid ? '#4CAF50' : '#f44336';
  }
  
  // Show/hide error message
  let errorEl = field.nextElementSibling;
  if (!errorEl || !errorEl.classList.contains('field-error')) {
    errorEl = document.createElement('span');
    errorEl.className = 'field-error';
    errorEl.style.color = '#f44336';
    errorEl.style.fontSize = '12px';
    errorEl.style.marginTop = '5px';
    errorEl.style.display = 'block';
    field.parentNode.insertBefore(errorEl, field.nextSibling);
  }
  
  errorEl.textContent = message;
  
  return isValid;
}

// Add CSS for animations (if anime.js is not loaded)
if (!hasAnimeJS) {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(300px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(300px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

console.log("☕ Orange Café main utilities initialized successfully!");

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.CoffeeShop;
}
