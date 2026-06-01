/* ============================================================
   RC ULTRA — LANDING PAGE CLONE
   GSAP ScrollTrigger Animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Wait for GSAP to load
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not loaded yet, retrying...');
    setTimeout(() => initApp(), 500);
    return;
  }
  initApp();
});

function initApp() {
  // Register ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // ==================== LOADER ====================
  initLoader();

  // ==================== SCROLL PROGRESS ====================
  initScrollProgress();

  // ==================== POPULATE CHARACTER SET ====================
  populateCharacterSets();

  // ==================== SECTION ANIMATIONS ====================
  initHeroAnimations();
  initComparisonAnimations();
  initDesignSpaceAnimation();
  initBodyTextReveals();
  initMorphAnimations();
  initStoryAnimations();
  initProcessAnimations();
  initAxesAnimations();
  initOverviewAnimations();
  initCreditsAnimations();
  initFamilyOverviewRows();

  // ==================== INTERACTIVE ELEMENTS ====================
  initCharacterSetInteraction();
}

/* ==================== LOADER ==================== */
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  const tl = gsap.timeline({
    delay: 1.8,
    onComplete: () => {
      document.body.classList.remove('loading');
      loader.style.pointerEvents = 'none';
      // Refresh ScrollTrigger after loader is gone
      ScrollTrigger.refresh();
    }
  });

  tl.to('.loader-title', {
    duration: 0.4,
    scale: 0.95,
    opacity: 0.8,
    ease: 'power2.in'
  })
  .to(loader, {
    duration: 0.6,
    yPercent: -100,
    ease: 'power3.inOut'
  })
  .set(loader, { display: 'none' });
}

/* ==================== SCROLL PROGRESS ==================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  gsap.to(progressBar, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3
    }
  });
}

/* ==================== HERO ANIMATIONS ==================== */
function initHeroAnimations() {
  const heroTitle = document.getElementById('hero-title');
  if (!heroTitle) return;

  // Hero title reveal
  gsap.fromTo(heroTitle, 
    { opacity: 0, y: 80, scale: 0.95 },
    {
      opacity: 1, y: 0, scale: 1,
      duration: 1.2,
      ease: 'power3.out',
      delay: 2.5, // After loader
    }
  );

  // Parallax on hero title during scroll
  gsap.to(heroTitle, {
    yPercent: -30,
    ease: 'none',
    scrollTrigger: {
      trigger: '#intro',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  // Intro description
  const introDesc = document.getElementById('intro-desc');
  if (introDesc) {
    gsap.fromTo(introDesc,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: introDesc,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }
}

/* ==================== COMPARISON ANIMATIONS ==================== */
function initComparisonAnimations() {
  const section = document.getElementById('comparison-section');
  if (!section) return;

  // Fade in headers
  const headers = section.querySelectorAll('.comparison-header .text-caption');
  gsap.fromTo(headers,
    { opacity: 0, y: 20 },
    {
      opacity: 1, y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Scale in comparison words
  const words = section.querySelectorAll('.comparison-word');
  gsap.fromTo(words,
    { opacity: 0, scale: 0.8 },
    {
      opacity: 1, scale: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Animate font-weight on scroll for RC Ultra comparison words
  const gtWords = section.querySelectorAll('.comparison-word.gt-ultra');
  gtWords.forEach(word => {
    gsap.fromTo(word,
      { fontWeight: 300 },
      {
        fontWeight: 800,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: 1
        }
      }
    );
  });
}

/* ==================== DESIGN SPACE ANIMATION ==================== */
function initDesignSpaceAnimation() {
  const container = document.getElementById('design-space');
  const letter = document.getElementById('design-space-letter');
  if (!container || !letter) return;

  // Reveal
  gsap.fromTo(container,
    { opacity: 0, scale: 0.9 },
    {
      opacity: 1, scale: 1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Animate the letter's weight and style as user scrolls
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top 70%',
      end: 'bottom 20%',
      scrub: 1
    }
  });

  tl.to(letter, {
    fontWeight: 900,
    duration: 0.5,
    ease: 'none'
  })
  .to(letter, {
    fontStyle: 'italic',
    rotateZ: -3,
    duration: 0.3,
    ease: 'none'
  })
  .to(letter, {
    fontWeight: 100,
    scale: 1.2,
    duration: 0.5,
    ease: 'none'
  })
  .to(letter, {
    fontWeight: 600,
    fontStyle: 'normal',
    rotateZ: 0,
    scale: 1,
    duration: 0.5,
    ease: 'none'
  });
}

/* ==================== BODY TEXT REVEALS ==================== */
function initBodyTextReveals() {
  // Find all reveal-up elements
  const revealUpEls = document.querySelectorAll('.reveal-up');
  revealUpEls.forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Find all reveal-scale elements
  const revealScaleEls = document.querySelectorAll('.reveal-scale');
  revealScaleEls.forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1, scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Find all reveal-fade elements
  const revealFadeEls = document.querySelectorAll('.reveal-fade');
  revealFadeEls.forEach(el => {
    gsap.fromTo(el,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
}

/* ==================== MORPH ANIMATIONS ==================== */
function initMorphAnimations() {
  // 3-Axis morph: "Welcome to that something"
  const morphWelcome = document.getElementById('morph-welcome');
  if (morphWelcome) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#morph-3axes',
        start: 'top 70%',
        end: 'bottom 30%',
        scrub: 1
      }
    });

    // Cycle through weights
    tl.fromTo(morphWelcome, 
      { fontWeight: 100 },
      { fontWeight: 900, duration: 1, ease: 'none' }
    )
    .to(morphWelcome, {
      fontStyle: 'italic',
      duration: 0.5,
      ease: 'none'
    })
    .to(morphWelcome, {
      fontWeight: 400,
      fontStyle: 'normal',
      duration: 1,
      ease: 'none'
    });

    // Animate the labels
    const labels = ['label-weight', 'label-contrast', 'label-italic'];
    labels.forEach((id, i) => {
      const label = document.getElementById(id);
      if (!label) return;
      
      ScrollTrigger.create({
        trigger: '#morph-3axes',
        start: 'top 70%',
        end: 'bottom 30%',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const third = 1/3;
          if (i === 0) {
            label.style.opacity = progress < third ? 1 : 0.3;
          } else if (i === 1) {
            label.style.opacity = (progress >= third && progress < 2*third) ? 1 : 0.3;
          } else {
            label.style.opacity = progress >= 2*third ? 1 : 0.3;
          }
        }
      });
    });
  }
}

/* ==================== STORY ANIMATIONS ==================== */
function initStoryAnimations() {
  // Morph words: Spike, Raged, Scarf — pingpong weight animation
  const morphContainers = ['morph-spike', 'morph-raged', 'morph-scarf'];
  
  morphContainers.forEach(id => {
    const container = document.getElementById(id);
    if (!container) return;
    
    const word = container.querySelector('.morph-word');
    if (!word) return;

    // Scrub weight on scroll
    gsap.fromTo(word,
      { fontWeight: 300 },
      {
        fontWeight: 900,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1
        }
      }
    );

    // Toggle station labels
    const labels = container.querySelectorAll('.morph-stations label');
    if (labels.length >= 2) {
      ScrollTrigger.create({
        trigger: container,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          labels[0].style.opacity = p < 0.5 ? 1 : 0.3;
          labels[1].style.opacity = p >= 0.5 ? 1 : 0.3;
        }
      });
    }
  });

  // Design & Craft text animation
  const designCraftText = document.getElementById('design-craft-text');
  if (designCraftText) {
    const words = designCraftText.querySelectorAll('div');
    gsap.fromTo(words,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#design-craft-anim',
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Weight morph on scroll
    gsap.fromTo(words[0],
      { fontWeight: 300 },
      {
        fontWeight: 700,
        ease: 'none',
        scrollTrigger: {
          trigger: '#design-craft-anim',
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: 1
        }
      }
    );
    gsap.fromTo(words[2],
      { fontWeight: 700 },
      {
        fontWeight: 300,
        ease: 'none',
        scrollTrigger: {
          trigger: '#design-craft-anim',
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: 1
        }
      }
    );
  }
}

/* ==================== PROCESS ANIMATIONS ==================== */
function initProcessAnimations() {
  // Letter 'a' drawing animation
  const drawingSection = document.getElementById('drawing-a-section');
  const drawingLetter = document.getElementById('drawing-letter-a');
  
  if (drawingSection && drawingLetter) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: drawingSection,
        start: 'top 80%',
        end: 'bottom 30%',
        scrub: 1
      }
    });

    tl.fromTo(drawingLetter, 
      { opacity: 0, scale: 0.3, fontWeight: 100, rotateZ: -10 },
      { opacity: 1, scale: 1, fontWeight: 400, rotateZ: 0, duration: 1, ease: 'power2.out' }
    )
    .to(drawingLetter, {
      fontWeight: 900,
      scale: 1.05,
      duration: 0.5,
      ease: 'none'
    })
    .to(drawingLetter, {
      fontWeight: 400,
      scale: 1,
      duration: 0.5,
      ease: 'none'
    });
  }

  // Calligraphy morph
  const calligraphyMorph = document.getElementById('morph-calligraphy');
  if (calligraphyMorph) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#morph-calligraphy-section',
        start: 'top 75%',
        end: 'bottom 25%',
        scrub: 1
      }
    });

    tl.fromTo(calligraphyMorph,
      { fontWeight: 900 },
      { fontWeight: 100, duration: 1, ease: 'none' }
    )
    .to(calligraphyMorph, {
      fontStyle: 'italic',
      duration: 0.3,
      ease: 'none'
    })
    .to(calligraphyMorph, {
      fontWeight: 400,
      fontStyle: 'normal',
      duration: 0.7,
      ease: 'none'
    });

    // Animate station labels
    const labels = document.querySelectorAll('#morph-calligraphy-section .morph-stations label');
    if (labels.length >= 3) {
      ScrollTrigger.create({
        trigger: '#morph-calligraphy-section',
        start: 'top 75%',
        end: 'bottom 25%',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          labels[0].style.opacity = p < 0.33 ? 1 : 0.3;
          labels[1].style.opacity = (p >= 0.33 && p < 0.66) ? 1 : 0.3;
          labels[2].style.opacity = p >= 0.66 ? 1 : 0.3;
        }
      });
    }
  }

  // Geometric construction SVG
  const geoSvg = document.getElementById('geo-svg');
  if (geoSvg) {
    const geoEls = geoSvg.querySelectorAll('.geo-el');
    const geoLetters = geoSvg.querySelectorAll('.geo-letter');

    // Reveal construction lines
    gsap.fromTo(geoEls,
      { opacity: 0, scale: 0.8 },
      {
        opacity: (i) => [0.3, 0.2, 0.15, 0.15, 0.15, 0.15, 0.3, 0.2, 0.15][i] || 0.15,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#geo-construction',
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Draw letters with stroke
    gsap.fromTo(geoLetters,
      { strokeDasharray: '600', strokeDashoffset: '600' },
      {
        strokeDashoffset: 0,
        duration: 1.5,
        stagger: 0.3,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: '#geo-construction',
          start: 'top 65%',
          end: 'bottom 40%',
          scrub: 1
        }
      }
    );
  }
}

/* ==================== AXES ANIMATIONS ==================== */
function initAxesAnimations() {
  // Contrast axis — animate weights on scroll
  const axisContrast = document.getElementById('axis-contrast');
  if (axisContrast) {
    const words = axisContrast.querySelectorAll('.axis-demo-word');
    
    words.forEach((word, i) => {
      const startWeight = parseInt(getComputedStyle(word).fontWeight) || 400;
      
      // Animate weight cycle on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: axisContrast,
          start: 'top 70%',
          end: 'bottom 20%',
          scrub: 1
        }
      });

      tl.to(word, {
        fontWeight: 900,
        duration: 0.5,
        ease: 'none',
        delay: i * 0.1
      })
      .to(word, {
        fontWeight: startWeight,
        duration: 0.5,
        ease: 'none'
      });
    });
  }

  // Sage italic animation
  const sageContainer = document.getElementById('sage-italics-anim');
  if (sageContainer) {
    const sageWords = sageContainer.querySelectorAll('.sage-word');
    gsap.fromTo(sageWords,
      { opacity: 0, x: -30 },
      {
        opacity: 1, x: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sageContainer,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }

  // Ultra axis
  const axisUltra = document.getElementById('axis-ultra');
  if (axisUltra) {
    const words = axisUltra.querySelectorAll('.axis-demo-word');
    
    words.forEach((word, i) => {
      const startWeight = parseInt(getComputedStyle(word).fontWeight) || 400;
      
      gsap.to(word, {
        fontWeight: 900,
        letterSpacing: '-0.05em',
        ease: 'none',
        scrollTrigger: {
          trigger: axisUltra,
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: 1
        }
      });
    });
  }
}

/* ==================== OVERVIEW ANIMATIONS ==================== */
function initOverviewAnimations() {
  // Full family specimen columns stagger
  const subfamilyCols = document.querySelectorAll('.subfamily-column');
  gsap.fromTo(subfamilyCols,
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#full-family',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Animate weight samples within each column
  const weightSamples = document.querySelectorAll('.weight-sample');
  gsap.fromTo(weightSamples,
    { opacity: 0, x: -20 },
    {
      opacity: 1, x: 0,
      duration: 0.4,
      stagger: 0.05,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#full-family',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    }
  );
}

/* ==================== FAMILY OVERVIEW ROWS ==================== */
function initFamilyOverviewRows() {
  const rows = document.querySelectorAll('.family-overview-row');
  
  rows.forEach((row, i) => {
    gsap.fromTo(row,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: row,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Subtle weight animation on the large sample
    const largeSample = row.querySelector('.sample-large');
    if (largeSample) {
      const currentWeight = parseInt(largeSample.style.fontWeight) || 400;
      
      gsap.fromTo(largeSample,
        { fontWeight: Math.max(100, currentWeight - 200) },
        {
          fontWeight: currentWeight,
          ease: 'none',
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
            end: 'bottom 50%',
            scrub: 1
          }
        }
      );
    }
  });
}

/* ==================== CREDITS ANIMATIONS ==================== */
function initCreditsAnimations() {
  // Credits blocks
  const creditsBlocks = document.querySelectorAll('.credits-block');
  creditsBlocks.forEach(block => {
    gsap.fromTo(block,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: block,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Minisite links stagger
  const minisiteLinks = document.querySelectorAll('.minisite-link-item');
  gsap.fromTo(minisiteLinks,
    { opacity: 0, scale: 0.9 },
    {
      opacity: 1, scale: 1,
      duration: 0.4,
      stagger: 0.06,
      ease: 'back.out(1.2)',
      scrollTrigger: {
        trigger: '#minisite-grid',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Character set batch animation
  const charBoxes = document.querySelectorAll('.char-box');
  if (charBoxes.length > 0) {
    ScrollTrigger.batch(charBoxes, {
      onEnter: (elements) => {
        gsap.fromTo(elements,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1, scale: 1,
            duration: 0.4,
            stagger: 0.02,
            ease: 'power2.out'
          }
        );
      },
      start: 'top 90%'
    });
  }
}

/* ==================== POPULATE CHARACTER SETS ==================== */
function populateCharacterSets() {
  // Basic Latin
  const basicLatin = document.getElementById('charset-basic');
  if (basicLatin) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    chars.split('').forEach(ch => {
      const box = document.createElement('div');
      box.className = 'char-box';
      box.textContent = ch;
      box.setAttribute('data-char', ch);
      basicLatin.appendChild(box);
    });
  }

  // Numerals & Currencies
  const numsGrid = document.getElementById('charset-nums');
  if (numsGrid) {
    const chars = '0123456789$¢£¥€';
    chars.split('').forEach(ch => {
      const box = document.createElement('div');
      box.className = 'char-box';
      box.textContent = ch;
      box.setAttribute('data-char', ch);
      numsGrid.appendChild(box);
    });
  }

  // Punctuation
  const punctGrid = document.getElementById('charset-punct');
  if (punctGrid) {
    const chars = '.,;:…-!?¡¿\'""()[]{}@&#%*+−±×÷=<>≈≥≤≠°→↗↑↖←↙↓↘↔';
    Array.from(chars).forEach(ch => {
      const box = document.createElement('div');
      box.className = 'char-box';
      box.textContent = ch;
      box.setAttribute('data-char', ch);
      punctGrid.appendChild(box);
    });
  }
}

/* ==================== CHARACTER SET INTERACTION ==================== */
function initCharacterSetInteraction() {
  const zoomed = document.getElementById('char-zoomed');
  if (!zoomed) return;

  document.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('char-box')) {
      const char = e.target.getAttribute('data-char') || e.target.textContent;
      zoomed.textContent = char;
      
      // Subtle animation on the zoomed char
      gsap.fromTo(zoomed,
        { scale: 0.9, opacity: 0.5 },
        { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  });
}
