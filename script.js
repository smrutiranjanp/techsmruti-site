// ================================
// Smooth Scroll & Active Links
// ================================
(function() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Close mobile menu if open
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) navLinks.classList.remove('active');
      }
    });
  });

  // Active navigation link highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    const scrollY = window.scrollY + 150;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  // ================================
  // Mobile Navigation Toggle
  // ================================
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      
      // Animate hamburger
      const spans = this.querySelectorAll('span');
      if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // ================================
  // Scroll Animations
  // ================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeInObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe timeline items
  document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
    fadeInObserver.observe(item);
  });

  // Observe cards
  document.querySelectorAll('.project-card, .highlight-card, .edu-card, .cert-item').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease';
    
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100);
          cardObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    cardObserver.observe(card);
  });

  // ================================
  // Navbar background on scroll
  // ================================
  const navHeader = document.querySelector('.nav-header');
  if (navHeader) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navHeader.style.background = 'rgba(10, 10, 15, 0.95)';
      } else {
        navHeader.style.background = 'rgba(10, 10, 15, 0.8)';
      }
    }, { passive: true });
  }

  // ================================
  // Parallax effect for hero visual
  // ================================
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual) {
    window.addEventListener('scroll', function() {
      const scrolled = window.scrollY;
      heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
      heroVisual.style.opacity = 1 - (scrolled / 1000);
    }, { passive: true });
  }

  // ================================
  // Typing effect for role text (optional enhancement)
  // ================================
  const roleText = document.querySelector('.role-text');
  if (roleText && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const originalText = roleText.textContent;
    roleText.textContent = '';
    roleText.style.borderRight = '2px solid var(--accent)';
    
    let charIndex = 0;
    function typeCharacter() {
      if (charIndex < originalText.length) {
        roleText.textContent += originalText.charAt(charIndex);
        charIndex++;
        setTimeout(typeCharacter, 50);
      } else {
        setTimeout(() => {
          roleText.style.borderRight = 'none';
        }, 1000);
      }
    }
    
    // Start typing after a delay
    setTimeout(typeCharacter, 1000);
  }
})();
