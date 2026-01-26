

// Fit element to parent container
function fitElementToParent(el, padding) {
  let timeout = null;

  function resize() {
    if (timeout) clearTimeout(timeout);
    if (typeof anime !== 'undefined') {
      anime.set(el, { scale: 1 });
    }
    let pad = padding || 0;
    let parentEl = el.parentNode;
    let elOffsetWidth = el.offsetWidth - pad;
    let parentOffsetWidth = parentEl.offsetWidth;
    let ratio = parentOffsetWidth / elOffsetWidth;
    timeout = setTimeout(() => {
      if (typeof anime !== 'undefined') {
        anime.set(el, { scale: ratio });
      }
    }, 10);
  }

  resize();
  window.addEventListener("resize", resize);
}

// Coffee Cup Steam Animation
(function () {
  // Check if anime.js is loaded
  if (typeof anime === 'undefined') {
    console.warn('Anime.js is not loaded. Animations will not work.');
    return;
  }

  const coffeeContainer = document.querySelector(".animation-wrapper");
  
  if (!coffeeContainer) {
    console.warn('Coffee animation container not found');
    return;
  }

  // Coffee cup floating animation
  const coffeeCup = document.querySelector(".coffee-cup");
  if (coffeeCup) {
    anime({
      targets: coffeeCup,
      translateY: [-8, 8],
      duration: 3000,
      easing: 'easeInOutSine',
      loop: true,
      direction: 'alternate'
    });

    // Cup rotation on hover
    coffeeCup.addEventListener('mouseenter', () => {
      anime({
        targets: coffeeCup,
        rotate: [0, 5, -5, 0],
        duration: 600,
        easing: 'easeInOutQuad'
      });
    });
  }

  // Steam particles animation
  const steamParticles = document.querySelectorAll(".steam-particle");
  if (steamParticles.length > 0) {
    steamParticles.forEach((particle, index) => {
      anime({
        targets: particle,
        translateY: [0, -80],
        translateX: () => anime.random(-20, 20),
        scale: [1, 0.5],
        opacity: [0.8, 0],
        duration: 2500,
        delay: index * 300,
        easing: 'easeOutQuad',
        loop: true
      });
    });
  }

  // Coffee beans rotation
  const coffeeBeans = document.querySelectorAll(".coffee-bean");
  if (coffeeBeans.length > 0) {
    coffeeBeans.forEach((bean, index) => {
      anime({
        targets: bean,
        rotate: 360,
        duration: 8000 + (index * 1000),
        easing: 'linear',
        loop: true
      });

      // Bean scale on hover
      bean.addEventListener('mouseenter', () => {
        anime({
          targets: bean,
          scale: 1.2,
          duration: 300,
          easing: 'easeOutElastic(1, .5)'
        });
      });

      bean.addEventListener('mouseleave', () => {
        anime({
          targets: bean,
          scale: 1,
          duration: 300,
          easing: 'easeOutElastic(1, .5)'
        });
      });
    });
  }

  // Sphere animation (converted to coffee theme)
  const sphereEl = document.querySelector(".sphere-animation");
  
  if (sphereEl) {
    const spherePathEls = sphereEl.querySelectorAll(".sphere path");
    const pathLength = spherePathEls.length;
    const animations = [];

    fitElementToParent(sphereEl);

    // Coffee color breathing animation
    const breathAnimation = anime({
      begin: function () {
        for (let i = 0; i < pathLength; i++) {
          animations.push(
            anime({
              targets: spherePathEls[i],
              stroke: {
                value: ["rgba(255,140,66,1)", "rgba(139,90,43,0.35)"], // Orange to brown
                duration: 500,
              },
              translateX: [2, -4],
              translateY: [2, -4],
              easing: "easeOutQuad",
              autoplay: false,
            })
          );
        }
      },
      update: function (ins) {
        animations.forEach(function (animation, i) {
          let percent = (1 - Math.sin(i * 0.35 + 0.0022 * ins.currentTime)) / 2;
          animation.seek(animation.duration * percent);
        });
      },
      duration: Infinity,
      autoplay: false,
    });

    // Intro animation
    const introAnimation = anime
      .timeline({
        autoplay: false,
      })
      .add(
        {
          targets: spherePathEls,
          strokeDashoffset: {
            value: [anime.setDashoffset, 0],
            duration: 3900,
            easing: "easeInOutCirc",
            delay: anime.stagger(190, { direction: "reverse" }),
          },
          duration: 2000,
          delay: anime.stagger(60, { direction: "reverse" }),
          easing: "linear",
        },
        0
      );

    // Gradient shadow animation (coffee colors)
    const shadowAnimation = anime(
      {
        targets: "#sphereGradient",
        x1: "25%",
        x2: "25%",
        y1: "0%",
        y2: "75%",
        duration: 30000,
        easing: "easeOutQuint",
        autoplay: false,
      },
      0
    );

    function init() {
      introAnimation.play();
      breathAnimation.play();
      shadowAnimation.play();
    }

    init();
  }

  // Navigation menu animation
  const navItems = document.querySelectorAll(".nav-item");
  if (navItems.length > 0) {
    navItems.forEach((item, index) => {
      anime({
        targets: item,
        translateY: [-20, 0],
        opacity: [0, 1],
        duration: 800,
        delay: index * 100,
        easing: 'easeOutExpo'
      });

      // Hover effect
      item.addEventListener('mouseenter', () => {
        anime({
          targets: item,
          scale: 1.05,
          duration: 300,
          easing: 'easeOutQuad'
        });
      });

      item.addEventListener('mouseleave', () => {
        anime({
          targets: item,
          scale: 1,
          duration: 300,
          easing: 'easeOutQuad'
        });
      });
    });
  }

  // Logo animation
  const logo = document.querySelector(".logo");
  if (logo) {
    anime({
      targets: logo,
      scale: [0, 1],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutElastic(1, .5)',
      delay: 200
    });

    // Logo pulse on hover
    logo.addEventListener('mouseenter', () => {
      anime({
        targets: logo,
        scale: 1.1,
        duration: 400,
        easing: 'easeOutQuad'
      });
    });

    logo.addEventListener('mouseleave', () => {
      anime({
        targets: logo,
        scale: 1,
        duration: 400,
        easing: 'easeOutQuad'
      });
    });
  }

  // Background coffee emoji animation
  const bgEmoji = document.querySelector(".home-container::after");
  if (bgEmoji) {
    anime({
      targets: bgEmoji,
      translateY: [0, -20],
      opacity: [0.05, 0.08],
      duration: 4000,
      easing: 'easeInOutSine',
      loop: true,
      direction: 'alternate'
    });
  }

})();

// Smooth scroll for navigation
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href !== '#' && href !== '') {
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
});

console.log("☕ Orange Café animations loaded successfully!");
