document.addEventListener('DOMContentLoaded', () => {

  // 1. CUSTOM CURSOR ANIMATION
  const cursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.custom-cursor-dot');
  
  if (cursor && cursorDot) {
    // Set initial centering offsets via GSAP
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(cursorDot, { xPercent: -50, yPercent: -50 });

    window.addEventListener('mousemove', (e) => {
      // Use GSAP for buttery smooth cursor follow with center alignment
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out'
      });
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.01
      });
    });

    const hoverTargets = document.querySelectorAll('a, button, .services-card, .product-item-card, .featured-card, .menu-toggle');
    hoverTargets.forEach(target => {
      target.addEventListener('mouseenter', () => {
        cursor.classList.add('hovered');
      });
      target.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovered');
      });
    });
  }

  // 2. GSAP & SCROLLTRIGGER REVEAL ANIMATIONS
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Load Animations
    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
    heroTimeline
      .from('.wheat-badge', { opacity: 0, y: -20, delay: 0.2 })
      .from('.hero-heading-short', { opacity: 0, y: 30, duration: 1.2 }, '-=0.8')
      .from('.hero-btn-wrap', { opacity: 0, y: 20 }, '-=0.8')
      .from('.hero-video-wrapper', { opacity: 0, scaleY: 0, transformOrigin: "bottom center", duration: 1.2 }, '-=0.8')
      .from('.hero-video-stamp', { opacity: 0, scale: 0, rotation: -90 }, '-=0.4');

    // Hero Video Scroll-triggered Expansion (Desktop only)
    let mm = gsap.matchMedia();
    
    mm.add("(min-width: 769px)", () => {
      gsap.timeline({
        scrollTrigger: {
          trigger: ".section-hero",
          start: "top top",
          end: "+=100%",
          scrub: true,
          pin: true,
          anticipatePin: 1
        }
      })
      .to(".hero-video-wrapper", {
        width: "100vw",
        height: "100vh",
        borderRadius: "0px",
        ease: "none"
      })
      .to(".hero-video-overlay", {
        background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.5) 100%)",
        ease: "none"
      }, 0)
      .to(".hero-heading-short", {
        color: "#ffffff",
        ease: "none"
      }, 0)
      .to(".wheat-badge", {
        borderColor: "rgba(255, 255, 255, 0.3)",
        color: "var(--color-yellow)",
        ease: "none"
      }, 0);
    });

    // Reveal animations on scroll using explicit fromTo to prevent FOUC conflicts
    
    // About Section
    gsap.fromTo('.about-left-col', 
      { opacity: 0, x: -50 },
      {
        scrollTrigger: {
          trigger: '.section-about',
          start: 'top 80%',
        },
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power2.out',
        onComplete: () => { gsap.set('.about-left-col', { clearProps: "transform" }); }
      }
    );

    gsap.fromTo('.about-right-col', 
      { opacity: 0, x: 50 },
      {
        scrollTrigger: {
          trigger: '.section-about',
          start: 'top 80%',
        },
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power2.out',
        onComplete: () => { gsap.set('.about-right-col', { clearProps: "transform" }); }
      }
    );

    gsap.fromTo('.about-stat-item', 
      { opacity: 0, y: 30 },
      {
        scrollTrigger: {
          trigger: '.about-stats-footer',
          start: 'top 85%',
        },
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => { gsap.set('.about-stat-item', { clearProps: "transform" }); }
      }
    );

    // Products Gallery
    gsap.fromTo('.products-header', 
      { opacity: 0, y: 30 },
      {
        scrollTrigger: {
          trigger: '.section-products',
          start: 'top 80%',
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        onComplete: () => { gsap.set('.products-header', { clearProps: "transform" }); }
      }
    );

    gsap.fromTo('.featured-card', 
      { opacity: 0, y: 40 },
      {
        scrollTrigger: {
          trigger: '.featured-card',
          start: 'top 85%',
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        onComplete: () => { gsap.set('.featured-card', { clearProps: "transform" }); }
      }
    );

    gsap.fromTo('.product-item-card', 
      { opacity: 0, y: 40 },
      {
        scrollTrigger: {
          trigger: '.products-grid',
          start: 'top 85%',
        },
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => { 
          // Crucial: clear inline styling to restore pure CSS transform hover capabilities!
          gsap.set('.product-item-card', { clearProps: "transform" }); 
        }
      }
    );

    // Process Steps Timeline
    const processItems = document.querySelectorAll('.process-item-media, .process-item-text');
    if (processItems.length > 0) {
      gsap.fromTo(processItems, 
        { opacity: 0, y: 40 },
        {
          scrollTrigger: {
            trigger: '.section-process',
            start: 'top 75%',
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          onComplete: () => { gsap.set(processItems, { clearProps: "all" }); }
        }
      );
    }

    // Services Accordion
    gsap.fromTo('.services-left', 
      { opacity: 0, x: -40 },
      {
        scrollTrigger: {
          trigger: '.section-services',
          start: 'top 80%',
        },
        opacity: 1,
        x: 0,
        duration: 1,
        onComplete: () => { gsap.set('.services-left', { clearProps: "transform" }); }
      }
    );

    gsap.fromTo('.services-right', 
      { opacity: 0, x: 40 },
      {
        scrollTrigger: {
          trigger: '.section-services',
          start: 'top 80%',
        },
        opacity: 1,
        x: 0,
        duration: 1,
        onComplete: () => { gsap.set('.services-right', { clearProps: "transform" }); }
      }
    );

    // Interactive Draggable bulletin board items reveal
    const bulletinItems = document.querySelectorAll('.bulletin-item');
    if (bulletinItems.length > 0) {
      gsap.fromTo(bulletinItems, 
        { opacity: 0, scale: 0.5, y: 50 },
        {
          scrollTrigger: {
            trigger: '.bulletin-board',
            start: 'top 80%',
          },
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.5)',
          onComplete: () => {
            bulletinItems.forEach(item => {
              gsap.set(item, { clearProps: "transform" });
            });
            if (typeof Draggable !== 'undefined') {
              gsap.registerPlugin(Draggable);
              Draggable.create(bulletinItems, {
                bounds: ".bulletin-board",
                inertia: true,
                onPress: function() {
                  const allItems = document.querySelectorAll('.bulletin-item');
                  let maxZ = 10;
                  allItems.forEach(el => {
                    const z = parseInt(window.getComputedStyle(el).zIndex) || 1;
                    if (z > maxZ) maxZ = z;
                  });
                  this.target.style.zIndex = maxZ + 1;
                }
              });
            }
          }
        }
      );
    }

    // Menu Grid
    gsap.fromTo('.menu-card', 
      { opacity: 0, y: 40 },
      {
        scrollTrigger: {
          trigger: '.section-menu',
          start: 'top 80%',
        },
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => { gsap.set('.menu-card', { clearProps: "transform" }); }
      }
    );

    // Blog Articles
    gsap.fromTo('.blog-article-card', 
      { opacity: 0, y: 30 },
      {
        scrollTrigger: {
          trigger: '.blog-grid-box',
          start: 'top 85%',
        },
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => { 
          gsap.set('.blog-article-card', { clearProps: "transform" }); 
        }
      }
    );

    // Footer CTA Unified
    gsap.fromTo('.footer-unified-content', 
      { opacity: 0, scale: 0.95 },
      {
        scrollTrigger: {
          trigger: '.footer-unified',
          start: 'top 75%',
        },
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
        onComplete: () => { gsap.set('.footer-unified-content', { clearProps: "transform" }); }
      }
    );

    // Refresh ScrollTrigger once window loads completely to ensure correct heights
    window.addEventListener('load', () => {
      ScrollTrigger.refresh();
    });
  }

  // 3. HEADER SCROLL EFFECT
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 4. MOBILE DRAWER NAVIGATION
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer .btn-primary');

  function toggleMenu() {
    menuToggle.classList.toggle('open');
    mobileDrawer.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
  }

  menuToggle.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileDrawer.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  // 5. STACKING SERVICES CARDS / SERVICES SECTION
  const servicesCards = gsap.utils.toArray('.services-card');
  const servicesMainImage = document.getElementById('services-main-image');

  if (servicesCards.length > 0 && servicesMainImage) {
    servicesCards.forEach((card, idx) => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top 45%',
        end: 'bottom 45%',
        onToggle: self => {
          if (self.isActive) {
            servicesCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');

            const newImgSrc = card.getAttribute('data-img');
            if (newImgSrc && servicesMainImage.getAttribute('src') !== newImgSrc) {
              gsap.to(servicesMainImage, {
                opacity: 0,
                duration: 0.25,
                onComplete: () => {
                  servicesMainImage.src = newImgSrc;
                  gsap.to(servicesMainImage, { opacity: 1, duration: 0.25 });
                }
              });
            }
          }
        }
      });

      card.addEventListener('click', () => {
        const offset = window.innerWidth <= 768 ? 20 : 150;
        const topPos = card.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top: topPos,
          behavior: 'smooth'
        });
      });
    });
  }

  // 6. ACTIVE NAVIGATION LINK SPY (INTERSECTION OBSERVER)
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // 7. PARALLAX EFFECT FOR FLOATING BREADS
  const floatingBreads = document.querySelectorAll('.floating-bread');
  window.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / window.innerWidth) - 0.5;
    const mouseY = (e.clientY / window.innerHeight) - 0.5;

    floatingBreads.forEach((bread, idx) => {
      let factor = 40;
      if (bread.classList.contains('bread-left')) factor = 50;
      else if (bread.classList.contains('bread-right')) factor = -70;
      else if (bread.classList.contains('bread-bottom')) factor = 35;

      const xTrans = mouseX * factor;
      const yTrans = mouseY * factor;
      
      let originalRotation = -15;
      if (bread.classList.contains('bread-right')) originalRotation = 20;
      if (bread.classList.contains('bread-bottom')) originalRotation = -5;

      gsap.to(bread, {
        x: xTrans,
        y: yTrans,
        rotation: originalRotation + (mouseX * 15),
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    });
  });

  // 8. BACK TO TOP BUTTON LOGIC
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 450) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 9. HEADER NAVIGATION SMOOTH SCROLL WITH OFFSET
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId.startsWith('#')) return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 10. DYNAMIC LANGUAGE TRANSLATION & PRICING SWITCHER SYSTEM
  const translations = {
    en: {
      "nav-home": "Home",
      "nav-about": "About",
      "nav-gallery": "Gallery",
      "nav-contact": "Contact",
      "btn-contact": "Contact US",
      "hero-badge": "100% wheat",
      "hero-title": "Baking Happiness For Every Heart",
      "about-subtitle": "Senties Bakers",
      "about-title": "The Heart Behind Our Bakery",
      "about-lead": "Our bakery is built on a love for honest ingredients, traditional techniques, and the joy of sharing freshly baked food every loaf, cake, and pastry.",
      "about-desc": "Our bakery was created to share fresh baked goodness, meaningful moments, and happiness with everyone.",
      "about-stat-label-1": "Happy Customers",
      "about-stat-desc-1": "Baked with care loved by every customer",
      "about-stat-label-2": "Customer Satisfaction",
      "about-stat-desc-2": "Fresh flavors that customers truly love",
      "about-stat-label-3": "Five-Star Reviews",
      "about-stat-desc-3": "Customers rate our bakery five stars",
      "products-title": "Our Signature Products Crafted With Passion",
      "process-title": "Our Process Behind Every Perfect Bake",
      "services-title": "Our Bakery Services",
      "testimonials-title": "Truly Loved by People Like You",
      "menu-title": "Delicious Fresh Treats Waiting To Be Enjoyed",
      "footer-title": "WHAT ARE YOU WAITING FOR?",
      "footer-subtitle": "We're Ready When You Are.",
      "footer-btn": "Order Now"
    },
    es: {
      "nav-home": "Inicio",
      "nav-about": "Nosotros",
      "nav-gallery": "Galería",
      "nav-contact": "Contacto",
      "btn-contact": "Contáctanos",
      "hero-badge": "100% trigo",
      "hero-title": "Horneando Felicidad Para Cada Corazón",
      "about-subtitle": "Panadería Senties",
      "about-title": "El Corazón de Nuestra Panadería",
      "about-lead": "Nuestra panadería está construida sobre el amor por los ingredientes honestos, las técnicas tradicionales y la alegría de compartir pan fresco en cada hogaza, pastel y postre.",
      "about-desc": "Nuestra panadería fue creada para compartir bondades recién horneadas, momentos significativos y felicidad con todos.",
      "about-stat-label-1": "Clientes Felices",
      "about-stat-desc-1": "Horneado con cuidado y amado por todos",
      "about-stat-label-2": "Satisfacción del Cliente",
      "about-stat-desc-2": "Sabores frescos que a los clientes les encantan",
      "about-stat-label-3": "Reseñas de Cinco Estrellas",
      "about-stat-desc-3": "Los clientes nos califican con cinco estrellas",
      "products-title": "Nuestros Productos Distintivos Hechos Con Pasión",
      "process-title": "Nuestro Proceso Detrás de Cada Horneado Perfecto",
      "services-title": "Servicios de Nuestra Panadería",
      "testimonials-title": "Verdaderamente Calificado por Gente Como Tú",
      "menu-title": "Deliciosas Delicias Frescas Esperando Ser Disfrutadas",
      "footer-title": "¿A QUÉ ESTÁS ESPERANDO?",
      "footer-subtitle": "Estamos Listos Cuando Tú lo Estés.",
      "footer-btn": "Ordenar Ahora"
    }
  };

  const nameTranslations = {
    en: {
      "Sourdough": "Sourdough",
      "Custard Puff": "Custard Puff",
      "Round Bread": "Round Bread",
      "Honey Cake": "Honey Cake",
      "Sweet Tart": "Sweet Tart",
      "Choco Donut": "Choco Donut",
      "Sugar Cookie": "Sugar Cookie",
      "Cinnamon Roll": "Cinnamon Roll",
      "Caramel Crunch": "Caramel Crunch",
      "Sourdough Circle": "Sourdough Circle",
      "Heritage Loaf": "Heritage Loaf",
      "Golden White": "Golden White",
      "Mixed Seed Loaf": "Mixed Seed Loaf",
      "Harvest Loaf": "Harvest Loaf",
      "View Items": "View Items",
      "Explore More": "Explore More",
      "Best Seller": "Best Seller"
    },
    es: {
      "Sourdough": "Masa Madre",
      "Custard Puff": "Bocadito de Crema",
      "Round Bread": "Pan Redondo",
      "Honey Cake": "Pastel de Miel",
      "Sweet Tart": "Tarta Dulce",
      "Choco Donut": "Dona de Chocolate",
      "Sugar Cookie": "Galleta de Azúcar",
      "Cinnamon Roll": "Rol de Canela",
      "Caramel Crunch": "Crujiente de Caramelo",
      "Sourdough Circle": "Círculo de Masa Madre",
      "Heritage Loaf": "Hogaza Herencia",
      "Golden White": "Pan Blanco Dorado",
      "Mixed Seed Loaf": "Pan de Semillas Mixtas",
      "Harvest Loaf": "Hogaza de Cosecha",
      "View Items": "Ver Artículos",
      "Explore More": "Explorar Más",
      "Best Seller": "Más Vendido"
    }
  };

  const pricingData = {
    en: {
      "Sourdough": { original: "$10.00", sale: "$9.00" },
      "Custard Puff": { original: "$9.00", sale: "$8.00" },
      "Round Bread": { original: "$12.00", sale: "$10.00" },
      "Honey Cake": { original: "$13.00", sale: "$12.00" },
      "Sweet Tart": { original: "$14.00", sale: "$13.00" },
      "Choco Donut": { original: "$5.50", sale: "$4.50" },
      "Sugar Cookie": { original: "$4.00", sale: "$3.00" },
      "Cinnamon Roll": { original: "$10.00", sale: "$9.00" },
      "Caramel Crunch": { original: "$5.00", sale: "$4.00" },
      "Sourdough Circle": "$8.00",
      "Heritage Loaf": "$8.50",
      "Golden White": "$4.50",
      "Mixed Seed Loaf": "$7.50",
      "Harvest Loaf": "$9.00"
    },
    es: {
      "Sourdough": { original: "$2.000", sale: "$1.800" },
      "Custard Puff": { original: "$1.800", sale: "$1.600" },
      "Round Bread": { original: "$2.400", sale: "$2.000" },
      "Honey Cake": { original: "$2.600", sale: "$2.400" },
      "Sweet Tart": { original: "$2.800", sale: "$2.600" },
      "Choco Donut": { original: "$1.200", sale: "$1.000" },
      "Sugar Cookie": { original: "$3.000", sale: "$2.800" },
      "Cinnamon Roll": { original: "$2.000", sale: "$1.800" },
      "Caramel Crunch": { original: "$1.000", sale: "$800" },
      "Sourdough Circle": "$1.600",
      "Heritage Loaf": "$1.700",
      "Golden White": "$900",
      "Mixed Seed Loaf": "$1.500",
      "Harvest Loaf": "$1.800"
    }
  };

  const processTranslations = {
    en: {
      "Fresh Bakes": "Fresh Bakes",
      "Baked Daily Fresh": "Baked Daily Fresh",
      "Artisan Bread": "Artisan Bread",
      "Pure Grain Goodness": "Pure Grain Goodness",
      "Pure Baking": "Pure Baking",
      "Baked With Love": "Baked With Love",
      "Baked Bliss": "Baked Bliss",
      "Fresh Sweet Joy": "Fresh Sweet Joy"
    },
    es: {
      "Fresh Bakes": "Horneados Frescos",
      "Baked Daily Fresh": "Horneado Fresco Diario",
      "Artisan Bread": "Pan Artesanal",
      "Pure Grain Goodness": "Pura Bondad de Grano",
      "Pure Baking": "Horneado Puro",
      "Baked With Love": "Horneado con Amor",
      "Baked Bliss": "Felicidad Horneada",
      "Fresh Sweet Joy": "Fresco Dulce Placer"
    }
  };

  const servicesTranslations = {
    en: {
      "Daily Treats": { title: "Daily Treats", desc: "Enjoy fresh croissants, buns, and sweet goodies baked new every single morning." },
      "Bakery Catering": { title: "Bakery Catering", desc: "Bring sweet delights and premium artisan platters to your special celebrations." },
      "Pastry Creations": { title: "Pastry Creations", desc: "Savor beautifully crafted tarts, cookies, and rolls made by our top pastry chefs." },
      "Premium Bakes": { title: "Premium Bakes", desc: "Indulge in our signature custom cakes and premium breads baked to absolute perfection." }
    },
    es: {
      "Daily Treats": { title: "Delicias Diarias", desc: "Disfrute de croissants, bollos y dulces frescos horneados cada mañana." },
      "Bakery Catering": { title: "Catering de Panadería", desc: "Lleve dulces delicias y bandejas artesanales premium a sus celebraciones." },
      "Pastry Creations": { title: "Creaciones de Pastelería", desc: "Saborée tarta, galletas y rollos hechos por nuestros pasteleros estrella." },
      "Premium Bakes": { title: "Horneados Premium", desc: "Deléitese con pasteles personalizados y panes premium horneados a la perfección." }
    }
  };

  const testimonialTranslations = {
    en: [
      "I'm not usually a dessert person, but that chocolate almond croissant changed my life. Unreal!",
      "Fast delivery, super fresh, and piping hot! Their combo bread box is a weekend ritual for me.",
      "The best sourdough crust in town — crispy on the outside, soft inside. I dream about their olive rosemary sourdough!",
      "Tried the cinnamon rolls and now I can't go back to regular rolls. It's dangerously good.",
      "Authentic flavors, premium packaging, and warm service. A true neighborhood gem!"
    ],
    es: [
      "No suelo ser de postres, pero ese croissant de chocolate y almendras cambió mi vida. ¡Increíble!",
      "¡Entrega rápida, súper fresco y calientito! Su caja de pan combinada es mi ritual de fin de semana.",
      "La mejor corteza de masa madre de la ciudad: crujiente por fuera, suave por dentro. ¡Sueño con su masa madre de aceitunas y romero!",
      "Probé los rollos de canela y ahora no puedo volver a los normales. Es peligrosamente bueno.",
      "¡Sabores auténticos, empaque premium y servicio cálido. ¡Una verdadera joya del vecindario!"
    ]
  };

  function updatePricingAndTexts(lang) {
    // 1. Translate Product Cards names and prices
    document.querySelectorAll('.product-item-card, .featured-card').forEach(card => {
      const titleEl = card.querySelector('.product-item-title, .featured-card-title');
      let nameKey = '';
      if (titleEl) {
        const origName = titleEl.getAttribute('data-orig') || titleEl.textContent.trim();
        if (!titleEl.getAttribute('data-orig')) {
          titleEl.setAttribute('data-orig', origName);
        }
        nameKey = origName;
        titleEl.textContent = nameTranslations[lang][origName] || origName;
      }
      
      const origPriceEl = card.querySelector('.original-price');
      const salePriceEl = card.querySelector('.sale-price');
      
      if (pricingData[lang] && pricingData[lang][nameKey]) {
        if (origPriceEl) origPriceEl.textContent = pricingData[lang][nameKey].original;
        if (salePriceEl) salePriceEl.textContent = pricingData[lang][nameKey].sale;
      }
      
      const badge = card.querySelector('.badge-seller');
      if (badge) {
        const origBadge = badge.getAttribute('data-orig') || badge.textContent.trim();
        if (!badge.getAttribute('data-orig')) badge.setAttribute('data-orig', origBadge);
        badge.textContent = nameTranslations[lang][origBadge] || origBadge;
      }
      
      const btn = card.querySelector('.btn-outline, .btn-primary');
      if (btn && btn.classList.contains('btn-outline')) {
        const origBtn = btn.getAttribute('data-orig') || btn.textContent.trim();
        if (!btn.getAttribute('data-orig')) btn.setAttribute('data-orig', origBtn);
        btn.textContent = (lang === 'en') ? 'View Details' : 'Ver Detalles';
      }
    });

    // 2. Daily Breads Menu List Items
    document.querySelectorAll('.menu-list-item').forEach(item => {
      const nameEl = item.querySelector('.menu-list-item-name');
      const priceEl = item.querySelector('.menu-list-item-price');
      if (nameEl) {
        const origName = nameEl.getAttribute('data-orig') || nameEl.textContent.trim();
        if (!nameEl.getAttribute('data-orig')) nameEl.setAttribute('data-orig', origName);
        nameEl.textContent = nameTranslations[lang][origName] || origName;
        
        if (priceEl && pricingData[lang] && pricingData[lang][origName]) {
          priceEl.textContent = pricingData[lang][origName];
        }
      }
    });

    // 3. Menu cards headings
    document.querySelectorAll('.menu-card').forEach(card => {
      const heading = card.querySelector('.card-heading, h3');
      if (heading && !card.classList.contains('menu-card-list')) {
        const origHeading = heading.getAttribute('data-orig') || heading.innerHTML.trim();
        if (!heading.getAttribute('data-orig')) heading.setAttribute('data-orig', origHeading);
        
        if (lang === 'es') {
          if (origHeading.includes('Transforming Dough')) {
            heading.textContent = 'Transformando la Masa en Dulce Alegría Cada Día';
          } else if (origHeading.includes('Freshly Baked')) {
            heading.innerHTML = 'Recién Horneado,<br>Siempre Tuyo';
          } else if (origHeading.includes('Fresh Delights')) {
            heading.innerHTML = 'Delicias Frescas,<br>Siempre Aquí';
          }
        } else {
          if (origHeading.includes('Transforming Dough')) {
            heading.textContent = 'Transforming Dough Into Sweet Joy Every Day';
          } else if (origHeading.includes('Freshly Baked')) {
            heading.innerHTML = 'Freshly Baked,<br>Always Yours';
          } else if (origHeading.includes('Fresh Delights')) {
            heading.innerHTML = 'Fresh Delights,<br>Always Here';
          }
        }
      }
      
      const link = card.querySelector('.menu-btn span, .card-link');
      if (link) {
        const origLink = link.getAttribute('data-orig') || link.textContent.trim();
        if (!link.getAttribute('data-orig')) link.setAttribute('data-orig', origLink);
        link.textContent = nameTranslations[lang][origLink] || origLink;
      }
    });

    // 4. Services Accordion Cards
    document.querySelectorAll('.services-card').forEach(card => {
      const titleEl = card.querySelector('.card-title');
      const descEl = card.querySelector('.card-desc');
      if (titleEl) {
        const origTitle = titleEl.getAttribute('data-orig') || titleEl.textContent.trim();
        if (!titleEl.getAttribute('data-orig')) titleEl.setAttribute('data-orig', origTitle);
        
        if (servicesTranslations[lang] && servicesTranslations[lang][origTitle]) {
          titleEl.textContent = servicesTranslations[lang][origTitle].title;
          if (descEl) descEl.textContent = servicesTranslations[lang][origTitle].desc;
        }
      }
    });

    // 5. Process Steps
    document.querySelectorAll('.process-col-new').forEach(col => {
      const titleEl = col.querySelector('.process-heading-new');
      const descEl = col.querySelector('.process-desc-new');
      if (titleEl) {
        const origTitle = titleEl.getAttribute('data-orig') || titleEl.textContent.trim();
        if (!titleEl.getAttribute('data-orig')) titleEl.setAttribute('data-orig', origTitle);
        
        titleEl.textContent = processTranslations[lang][origTitle] || origTitle;
        
        if (descEl) {
          const origDesc = descEl.getAttribute('data-orig') || descEl.textContent.trim();
          if (!descEl.getAttribute('data-orig')) descEl.setAttribute('data-orig', origDesc);
          descEl.textContent = processTranslations[lang][origDesc] || origDesc;
        }
      }
    });

    // 6. Testimonials bulletin board notes
    const notes = document.querySelectorAll('.bulletin-board .sticky-note p, .bulletin-board .polaroid-card p');
    notes.forEach((note, index) => {
      if (index < testimonialTranslations[lang].length) {
        note.textContent = testimonialTranslations[lang][index];
      }
    });
  }

  function updateLanguage(lang) {
    const langText = document.querySelector('.lang-btn .lang-text');
    const langFlag = document.querySelector('.lang-btn .lang-flag');
    if (lang === 'en') {
      langText.textContent = 'EN';
      langFlag.textContent = '🇬🇧';
    } else {
      langText.textContent = 'ES';
      langFlag.textContent = '🇪🇸';
    }
    
    document.querySelectorAll('[data-translate]').forEach(el => {
      const key = el.getAttribute('data-translate');
      if (translations[lang] && translations[lang][key]) {
        if (key === 'footer-title') {
          if (lang === 'en') {
            el.innerHTML = '<span class="unified-highlight-blue">WHAT ARE</span><br>YOU WAITING FOR?';
          } else {
            el.innerHTML = '<span class="unified-highlight-blue">¿A QUÉ</span><br>ESTÁS ESPERANDO?';
          }
        } else {
          el.textContent = translations[lang][key];
        }
      }
    });

    updatePricingAndTexts(lang);
  }

  const langSelector = document.querySelector('.lang-selector');
  const langBtn = document.getElementById('langBtn');
  const langOptions = document.querySelectorAll('.lang-option');

  if (langBtn && langSelector) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langSelector.classList.toggle('open');
    });

    langOptions.forEach(option => {
      option.addEventListener('click', () => {
        const lang = option.getAttribute('data-lang');
        updateLanguage(lang);
        langSelector.classList.remove('open');
      });
    });

    document.addEventListener('click', () => {
      langSelector.classList.remove('open');
    });
  }

  // Mobile Product Carousel Navigation Arrows
  const prevBtn = document.querySelector('.prev-arrow');
  const nextBtn = document.querySelector('.next-arrow');
  const productsGrid = document.querySelector('.products-grid');

  if (prevBtn && nextBtn && productsGrid) {
    prevBtn.addEventListener('click', () => {
      productsGrid.scrollBy({ left: -280, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      productsGrid.scrollBy({ left: 280, behavior: 'smooth' });
    });
  }

  // Mobile Process Carousel Navigation Arrows
  const prevProcessBtn = document.querySelector('.prev-process-arrow');
  const nextProcessBtn = document.querySelector('.next-process-arrow');
  const processGrid = document.querySelector('.process-grid-new');

  if (prevProcessBtn && nextProcessBtn && processGrid) {
    prevProcessBtn.addEventListener('click', () => {
      processGrid.scrollBy({ left: -280, behavior: 'smooth' });
    });
    nextProcessBtn.addEventListener('click', () => {
      processGrid.scrollBy({ left: 280, behavior: 'smooth' });
    });
  }
});

