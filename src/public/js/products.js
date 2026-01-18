console.log("Orange Café - Products page animations");

document.addEventListener('DOMContentLoaded', () => {
  
  // Check if anime.js is loaded
  if (typeof anime === 'undefined') {
    console.warn('Anime.js is not loaded. Animations will not work.');
    return;
  }

  // Product cards animation on load
  const productCards = document.querySelectorAll('.product-card');
  if (productCards.length > 0) {
    productCards.forEach((card, index) => {
      anime({
        targets: card,
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 600,
        delay: index * 100,
        easing: 'easeOutExpo'
      });

      // Card hover animation
      card.addEventListener('mouseenter', () => {
        anime({
          targets: card,
          scale: 1.05,
          translateY: -10,
          boxShadow: '0 15px 35px rgba(255, 140, 66, 0.3)',
          duration: 400,
          easing: 'easeOutCubic'
        });

        // Animate product image
        const img = card.querySelector('img');
        if (img) {
          anime({
            targets: img,
            scale: 1.1,
            rotate: 5,
            duration: 400,
            easing: 'easeOutCubic'
          });
        }

        // Show coffee steam
        createProductSteam(card);
      });

      card.addEventListener('mouseleave', () => {
        anime({
          targets: card,
          scale: 1,
          translateY: 0,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          duration: 400,
          easing: 'easeOutCubic'
        });

        const img = card.querySelector('img');
        if (img) {
          anime({
            targets: img,
            scale: 1,
            rotate: 0,
            duration: 400,
            easing: 'easeOutCubic'
          });
        }
      });
    });
  }

  // Product create button animation
  const createBtn = document.querySelector('.product-create-btn');
  if (createBtn) {
    anime({
      targets: createBtn,
      scale: [0, 1],
      rotate: [180, 0],
      duration: 800,
      delay: 400,
      easing: 'easeOutElastic(1, .6)'
    });

    createBtn.addEventListener('click', () => {
      createCoffeeExplosion(createBtn);
    });
  }

  // Product filter/search animations
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (filterBtns.length > 0) {
    filterBtns.forEach((btn, index) => {
      anime({
        targets: btn,
        translateX: [-30, 0],
        opacity: [0, 1],
        duration: 500,
        delay: index * 80,
        easing: 'easeOutExpo'
      });

      btn.addEventListener('click', () => {
        filterProducts(btn);
      });
    });
  }

  // Product image upload preview animation
  const imageInput = document.querySelector('input[type="file"][accept="image/*"]');
  if (imageInput) {
    imageInput.addEventListener('change', (e) => {
      handleImagePreview(e);
    });
  }

  // Price animation on product cards
  animateProductPrices();

  // Add to cart button animations
  initializeCartButtons();

  // Product category badges
  animateCategoryBadges();

  // Floating coffee beans background
  createFloatingBeans();

  // Product stock status indicator
  animateStockStatus();
});

// Create product steam effect
function createProductSteam(card) {
  const rect = card.getBoundingClientRect();
  
  for (let i = 0; i < 5; i++) {
    const steam = document.createElement('div');
    steam.textContent = '☕';
    steam.style.position = 'fixed';
    steam.style.left = rect.left + (rect.width / 2) + (i * 15 - 30) + 'px';
    steam.style.top = rect.top + 50 + 'px';
    steam.style.fontSize = '20px';
    steam.style.opacity = '0.6';
    steam.style.pointerEvents = 'none';
    steam.style.zIndex = '10000';
    
    document.body.appendChild(steam);

    anime({
      targets: steam,
      translateY: -100,
      translateX: () => anime.random(-30, 30),
      rotate: 360,
      scale: [1, 0.3],
      opacity: [0.6, 0],
      duration: 2000,
      delay: i * 150,
      easing: 'easeOutQuad',
      complete: () => steam.remove()
    });
  }
}

// Coffee explosion effect
function createCoffeeExplosion(button) {
  const rect = button.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < 12; i++) {
    const particle = document.createElement('div');
    particle.textContent = ['☕', '🫘', '☕', '🫘'][i % 4];
    particle.style.position = 'fixed';
    particle.style.left = centerX + 'px';
    particle.style.top = centerY + 'px';
    particle.style.fontSize = '24px';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '10001';
    
    document.body.appendChild(particle);

    const angle = (360 / 12) * i;
    const distance = 100;

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
}

// Filter products with animation
function filterProducts(btn) {
  const category = btn.dataset.category;
  const allCards = document.querySelectorAll('.product-card');

  // Active button animation
  document.querySelectorAll('.filter-btn').forEach(b => {
    anime({
      targets: b,
      backgroundColor: b === btn ? '#FF8C42' : '#f5f5f5',
      color: b === btn ? '#fff' : '#2C1810',
      duration: 300,
      easing: 'easeOutQuad'
    });
  });

  // Filter animation
  allCards.forEach((card, index) => {
    const cardCategory = card.dataset.category;
    const shouldShow = !category || category === 'all' || cardCategory === category;

    if (shouldShow) {
      anime({
        targets: card,
        scale: [0.8, 1],
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 500,
        delay: index * 50,
        easing: 'easeOutExpo',
        begin: () => {
          card.style.display = 'block';
        }
      });
    } else {
      anime({
        targets: card,
        scale: 0.8,
        opacity: 0,
        duration: 300,
        easing: 'easeInQuad',
        complete: () => {
          card.style.display = 'none';
        }
      });
    }
  });
}

// Handle image preview with animation
function handleImagePreview(e) {
  const files = e.target.files;
  
  if (files && files.length > 0) {
    const preview = document.querySelector('.image-preview') || createPreviewContainer();
    
    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const img = document.createElement('img');
        img.src = event.target.result;
        img.style.width = '100px';
        img.style.height = '100px';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '10px';
        img.style.margin = '10px';
        img.style.opacity = '0';
        
        preview.appendChild(img);

        anime({
          targets: img,
          opacity: [0, 1],
          scale: [0, 1],
          rotate: [180, 0],
          duration: 600,
          delay: index * 100,
          easing: 'easeOutElastic(1, .6)'
        });
      };
      
      reader.readAsDataURL(file);
    });
  }
}

function createPreviewContainer() {
  const container = document.createElement('div');
  container.className = 'image-preview';
  container.style.display = 'flex';
  container.style.flexWrap = 'wrap';
  container.style.marginTop = '20px';
  
  const form = document.querySelector('form');
  if (form) {
    form.appendChild(container);
  }
  
  return container;
}

// Animate product prices
function animateProductPrices() {
  const prices = document.querySelectorAll('.product-price');
  
  prices.forEach((price, index) => {
    const finalValue = parseFloat(price.textContent.replace(/[^0-9.]/g, ''));
    
    anime({
      targets: price,
      innerHTML: [0, finalValue],
      round: 2,
      duration: 1500,
      delay: index * 100,
      easing: 'easeOutExpo',
      update: function(anim) {
        price.textContent = '$' + anim.animations[0].currentValue.toFixed(2);
      }
    });
  });
}

// Initialize add to cart buttons
function initializeCartButtons() {
  const cartBtns = document.querySelectorAll('.add-to-cart-btn');
  
  cartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      
      anime({
        targets: btn,
        scale: [1, 1.2, 1],
        duration: 400,
        easing: 'easeInOutQuad'
      });

      // Create success checkmark
      createSuccessCheckmark(btn);
      
      // Update cart counter
      updateCartCounter();
    });
  });
}

function createSuccessCheckmark(button) {
  const checkmark = document.createElement('span');
  checkmark.textContent = '✓';
  checkmark.style.position = 'absolute';
  checkmark.style.color = '#4CAF50';
  checkmark.style.fontSize = '30px';
  checkmark.style.fontWeight = 'bold';
  
  button.style.position = 'relative';
  button.appendChild(checkmark);

  anime({
    targets: checkmark,
    scale: [0, 2],
    opacity: [1, 0],
    duration: 800,
    easing: 'easeOutExpo',
    complete: () => checkmark.remove()
  });
}

function updateCartCounter() {
  const counter = document.querySelector('.cart-counter');
  if (counter) {
    const currentValue = parseInt(counter.textContent) || 0;
    counter.textContent = currentValue + 1;

    anime({
      targets: counter,
      scale: [1, 1.5, 1],
      backgroundColor: ['#FF8C42', '#4CAF50', '#FF8C42'],
      duration: 500,
      easing: 'easeOutElastic(1, .6)'
    });
  }
}

// Animate category badges
function animateCategoryBadges() {
  const badges = document.querySelectorAll('.category-badge');
  
  badges.forEach((badge, index) => {
    anime({
      targets: badge,
      rotate: [0, 360],
      scale: [0, 1],
      duration: 600,
      delay: index * 80,
      easing: 'easeOutElastic(1, .5)'
    });
  });
}

// Create floating coffee beans
function createFloatingBeans() {
  const container = document.querySelector('.products-container') || document.body;
  
  for (let i = 0; i < 6; i++) {
    const bean = document.createElement('div');
    bean.textContent = '🫘';
    bean.style.position = 'fixed';
    bean.style.fontSize = '30px';
    bean.style.opacity = '0.1';
    bean.style.pointerEvents = 'none';
    bean.style.zIndex = '0';
    bean.style.left = Math.random() * 100 + '%';
    bean.style.top = Math.random() * 100 + '%';
    
    container.appendChild(bean);

    anime({
      targets: bean,
      translateY: [0, -30, 0],
      translateX: [0, Math.random() * 20 - 10, 0],
      rotate: 360,
      duration: 8000 + (i * 1000),
      easing: 'easeInOutSine',
      loop: true
    });
  }
}

// Animate stock status
function animateStockStatus() {
  const stockIndicators = document.querySelectorAll('.stock-status');
  
  stockIndicators.forEach((indicator, index) => {
    const status = indicator.textContent.toLowerCase();
    
    if (status.includes('low') || status.includes('out')) {
      anime({
        targets: indicator,
        backgroundColor: ['#ff9800', '#f44336'],
        duration: 1000,
        delay: index * 100,
        easing: 'easeInOutQuad',
        loop: true,
        direction: 'alternate'
      });
    }
  });
}

console.log("☕ Orange Café products animations loaded!");
