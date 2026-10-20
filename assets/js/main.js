/* 
    1 ==> Menu Icon
    2 ==> Menu
    3 ==> Client Logo Slider
    4 ==> Pricing Table
    5 ==> Accordion
    6 ==> Number Counter Up
    7 ==> Isotop
    8 ==> Home V2 Testimonial Sider
    9 ==> Footer Menu
    10 ==> Deomo Marque Slider
    11 ==> Scroll To Top Button + Scroll Progress
    12 ==> Sticky Header
    13 ==> Preloadr
    14 ==> Lenis smooth scrolling
*/

// Menu Icon
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.main-menu ul li').forEach(function (listItem) {
    const subMenu = listItem.querySelector('.sub-menu, .mega-menu');
    if (subMenu) {
      const anchor = listItem.querySelector('button');
      if (anchor) {
        const svgIcon = `
                    <svg class="fill-current" width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.264139 0.267679C0.433317 0.0962844 0.662742 0 0.901961 0C1.14118 0 1.37061 0.0962844 1.53978 0.267679L6.00545 4.7932L10.4711 0.267679C10.6413 0.101142 10.8691 0.00899045 11.1057 0.0110735C11.3422 0.0131565 11.5685 0.109307 11.7358 0.278816C11.903 0.448325 11.9979 0.677629 12 0.917342C12.002 1.15705 11.9111 1.388 11.7468 1.56042L6.64327 6.73232C6.47409 6.90372 6.24467 7 6.00545 7C5.76623 7 5.5368 6.90372 5.36762 6.73232L0.264139 1.56042C0.0950107 1.38898 0 1.15648 0 0.914052C0 0.671626 0.0950107 0.439126 0.264139 0.267679Z"/>
                    </svg>`;
        anchor.insertAdjacentHTML('beforeend', svgIcon);
      }
    }
  });
});


// Menu
function menuToggle() {
  const menuToggleBtn = document.querySelector('.menuToggle');
  const mainMenu = document.querySelector('.main-menu');
  if (!(menuToggleBtn && mainMenu)) return;

  // ---------------------------
  // Mega-menu inner dropdowns
  // ---------------------------
  function enhanceMegaMenu(mainMenuEl) {
    const megaContainers = mainMenuEl.querySelectorAll('.mega-menu');

    megaContainers.forEach((mega) => {
      // Prevent parent <li> delegation from firing for clicks inside mega
      mega.addEventListener('click', (e) => e.stopPropagation(), { passive: true });

      const items = mega.querySelectorAll('.megamenu-item');

      items.forEach((item) => {
        const btn = item.querySelector('.megamenu-item-toogle');
        const list = item.querySelector('.mega-menu-list');
        if (!btn || !list) return;

        // Initial state for smooth accordion
        list.style.overflow = 'hidden';
        if (!item.classList.contains('active')) {
          list.style.display = 'none';
          list.style.height = '0';
        }

        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();

          const isActive = item.classList.contains('active');

          // Close siblings within the same mega container (accordion behavior)
          items.forEach((sib) => {
            if (sib === item) return;
            sib.classList.remove('active');
            const sibList = sib.querySelector('.mega-menu-list');
            if (sibList) {
              sibList.style.height = sibList.scrollHeight + 'px';
              void sibList.getBoundingClientRect(); // force reflow
              sibList.style.height = '0';
              setTimeout(() => { sibList.style.display = 'none'; }, 300);
            }
          });

          // Toggle current
          if (!isActive) {
            item.classList.add('active');
            list.style.display = 'block';
            const h = list.scrollHeight + 'px';
            list.style.height = '0';
            requestAnimationFrame(() => { list.style.height = h; });
            setTimeout(() => { list.style.height = ''; }, 300);
          } else {
            item.classList.remove('active');
            list.style.height = list.scrollHeight + 'px';
            void list.getBoundingClientRect();
            list.style.height = '0';
            setTimeout(() => { list.style.display = 'none'; }, 300);
          }
        }, { passive: false });
      });
    });
  }

  // ---------------------------
  // Hamburger toggle (open/close main menu)
  // ---------------------------
  menuToggleBtn.addEventListener('click', () => {
    menuToggleBtn.classList.toggle('is-active');
    mainMenu.classList.toggle('menu-active');
    document.body.classList.toggle('menu-overlay');

    // Reset ALL submenus (top-level + mega siblings)
    mainMenu.querySelectorAll('li').forEach((li) => {
      li.classList.remove('active');
      const subMenus = li.querySelectorAll('.sub-menu, .mega-menu');
      subMenus.forEach((sub) => {
        sub.style.height = '0';
        setTimeout(() => (sub.style.display = 'none'), 300);
      });
    });
  });

  // ---------------------------
  // Top-level submenu delegation (excludes clicks inside .mega-menu)
  // ---------------------------
  mainMenu.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;

    // Ignore if click happens inside a mega-menu; that is handled by enhanceMegaMenu()
    if (li.closest('.mega-menu')) return;

    // Does this li have a standard dropdown?
    if (li.querySelector('.sub-menu, .mega-menu')) {
      const subMenu = li.querySelector('.sub-menu, .mega-menu');
      if (!subMenu) return;

      // Toggle current li
      if (!li.classList.contains('active')) {
        li.classList.add('active');
        subMenu.style.display = 'block';
        const height = subMenu.scrollHeight + 'px';
        subMenu.style.height = '0';
        setTimeout(() => (subMenu.style.height = height), 10);
        setTimeout(() => (subMenu.style.height = ''), 300);
      } else {
        li.classList.remove('active');
        subMenu.style.height = subMenu.scrollHeight + 'px';
        setTimeout(() => (subMenu.style.height = '0'), 10);
        setTimeout(() => (subMenu.style.display = 'none'), 300);
      }

      // Close other siblings (top-level only)
      const siblings = li.parentElement?.querySelectorAll(':scope > li') || [];
      siblings.forEach((item) => {
        if (item === li) return;
        item.classList.remove('active');
        const otherSubMenus = item.querySelectorAll(':scope > .sub-menu, :scope > .mega-menu');
        otherSubMenus.forEach((sub) => {
          sub.style.height = '0';
          setTimeout(() => (sub.style.display = 'none'), 300);
        });
      });
    }
  });

  // ---------------------------
  // Close menu on outside click
  // ---------------------------
  document.addEventListener('click', (e) => {
    const clickedInsideMenu = mainMenu.contains(e.target);
    const clickedToggle = menuToggleBtn.contains(e.target);
    if (clickedInsideMenu || clickedToggle) return;

    menuToggleBtn.classList.remove('is-active');
    mainMenu.classList.remove('menu-active');
    document.body.classList.remove('menu-overlay');

    // Reset everything
    mainMenu.querySelectorAll('li').forEach((li) => {
      li.classList.remove('active');
      const subMenus = li.querySelectorAll('.sub-menu, .mega-menu');
      subMenus.forEach((sub) => {
        sub.style.height = '0';
        setTimeout(() => (sub.style.display = 'none'), 300);
      });
    });
  });

  enhanceMegaMenu(mainMenu);
}
menuToggle();

// Client Logo Slider
function initLogoSlider(selector, options = {}) {
  const defaults = {
    spaceBetween: 50,
    centeredSlides: true,
    speed: 2000,
    slidesPerView: 'auto',
    loop: true,
    allowTouchMove: false,
    observer: true,
    observeParents: true,
    autoplay: {
      delay: 1,
      disableOnInteraction: false,
      pauseOnMouseEnter: false
    }
  };

  const cfg = Object.assign({}, defaults, options);
  const swiper = new Swiper(selector, cfg);

  // lightweight debounce
  const debounce = (fn, wait = 120) => {
    let t;
    return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), wait); };
  };

  const restart = () => {
    try {
      swiper.update?.();
      swiper.loopFix?.();
      if (swiper.autoplay) {
        swiper.autoplay.stop?.();
        swiper.autoplay.start?.();
      }
    } catch (e) { }
  };

  const safeRestart = debounce(restart, 120);

  window.addEventListener('resize', safeRestart);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') restart();
  });
  setTimeout(restart, 50);
  return swiper;
}
const logoSlider = initLogoSlider('.logo-auto-slider');


// Pricing Table
document.addEventListener("DOMContentLoaded", () => {
  const e = document.getElementById("priceToggle");
  if (!e) return;
  const t = document.querySelectorAll(".price");
  const s = document.querySelectorAll(".period");
  const o = ["$19", "$49", "$99"];
  const l = ["$190", "$490", "$990"];

  e.addEventListener("change", () => {
    const i = e.checked;
    t.forEach((el, idx) => {
      el.textContent = i ? l[idx] : o[idx];
    });
    s.forEach(el => {
      el.textContent = i ? "/year" : "/mo";
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const e = document.getElementById("priceToggle2");
  if (!e) return;
  const t = document.querySelectorAll(".price2");
  const s = document.querySelectorAll(".period2");
  const o = ["Free", "$49", "$99"];
  const l = ["Free", "$490", "$990"];

  e.addEventListener("change", () => {
    const i = e.checked;
    t.forEach((el, idx) => {
      el.textContent = i ? l[idx] : o[idx];
    });
    s.forEach(el => {
      el.textContent = i ? "/year" : "/mo";
    });
  });
});

// Accordion
const faqHeads = document.querySelectorAll('.faq-head');
faqHeads.forEach((faqHead) => {
  faqHead.addEventListener('click', function () {
    const parent = this.parentElement;
    const faqBody = parent.querySelector('.faq-body');

    document.querySelectorAll('.faq-wrapper .single-faq').forEach((faq) => {
      if (faq !== parent) {
        faq.classList.remove('active');
        const body = faq.querySelector('.faq-body');
        if (body) {
          body.style.height = body.scrollHeight + 'px';
          setTimeout(() => {
            body.style.height = '0';
          }, 10);
          setTimeout(() => (body.style.display = 'none'), 300);
        }
      }
    });

    if (parent.classList.contains('active')) {
      parent.classList.remove('active');
      faqBody.style.height = faqBody.scrollHeight + 'px';
      setTimeout(() => {
        faqBody.style.height = '0';
      }, 10);
      setTimeout(() => (faqBody.style.display = 'none'), 300);
    } else {
      parent.classList.add('active');
      faqBody.style.display = 'block';
      const height = faqBody.scrollHeight + 'px';
      faqBody.style.height = '0';
      setTimeout(() => {
        faqBody.style.height = height;
      }, 10);
      setTimeout(() => (faqBody.style.height = ''), 300);
    }
  });
});

// Number Counter Up
function initCounterUp(selector = '.counter', threshold = 0.5, duration = 1000) {
  const counters = document.querySelectorAll(selector);

  const startCounting = (counter) => {
    const target = +counter.getAttribute('data-target');
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * target);
      counter.innerText = value.toLocaleString();

      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounting(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold });

  counters.forEach(counter => observer.observe(counter));
}
document.addEventListener('DOMContentLoaded', () => {
  initCounterUp('.counter', 0.5, 1500);
});

// Isotop + GSAP Animation
(function () {
  const grid = document.getElementById('integration-grid');
  if (!grid) return;

  const items = Array.from(grid.querySelectorAll('.integration-card'));
  const filters = document.getElementById('filters');

  function matches(el, cat) {
    if (cat === '*') return true;
    const cats = (el.getAttribute('data-cat') || '').trim().split(/\s+/);
    return cats.includes(cat);
  }

  function applyFilter(cat) {
    let i = 0;

    items.forEach(el => {
      if (matches(el, cat)) {
        el.style.display = 'block';

        gsap.fromTo(el,
          { y: 40, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power2.out", delay: i * 0.05 }
        );

        i++;

      } else {
        el.style.display = 'none';
        gsap.killTweensOf(el);
      }
    });
  }

  if (filters) {
    filters.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-filter]');
      if (!btn) return;

      filters.querySelectorAll('.integration-button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      applyFilter(btn.dataset.filter);
    });
  }

  applyFilter('*');
})();

// Home V2 Testimonial Sider
new Swiper('.testimonial-slider', {
  loop: true,
  speed: 1000,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  slidesPerView: 3,
  paginationClickable: true,
  spaceBetween: 20,
  autoHeight: true,
  breakpoints: {
    1920: {
      slidesPerView: 3,
    },
    1028: {
      slidesPerView: 2,
    },
    640: {
      slidesPerView: 1,
    }
  },
  navigation: {
    nextEl: ".tmnl-slider-next",
    prevEl: ".tmnl-slider-prev",
  },
});


// Footer Menu
document.addEventListener('DOMContentLoaded', function () {
  const menuToggles = document.querySelectorAll('.footer-menu-toggle');
  const menuLists = document.querySelectorAll('.footer-menu-list');

  function isMobile() {
    return window.matchMedia("(max-width: 640px)").matches;
  }

  menuToggles.forEach((menuToggle, index) => {
    menuToggle.addEventListener('click', function () {
      if (!isMobile()) return;

      const correspondingMenuList = menuLists[index];

      menuToggle.classList.toggle('active');
      correspondingMenuList.classList.toggle('active');

      menuToggles.forEach((otherMenuToggle, otherIndex) => {
        if (otherIndex !== index) {
          otherMenuToggle.classList.remove('active');
          menuLists[otherIndex].classList.remove('active');
        }
      });
    });
  });

  window.addEventListener('resize', function () {
    if (!isMobile()) {
      menuToggles.forEach(btn => btn.classList.remove('active'));
      menuLists.forEach(list => list.classList.remove('active'));
    }
  });
});


// Deomo Marque Slider
const marqueeSliderEl = document.querySelector('.marquee-slider');
if (marqueeSliderEl) {
  const marqueeSwiper = new Swiper('.marquee-slider', {
    slidesPerView: 'auto',
    spaceBetween: 0,
    loop: true,
    freeMode: true,
    freeModeMomentum: false,
    animationSpeed: 1000,
    speed: 4000,
    allowTouchMove: true,
    grabCursor: true,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    }
  });

  // marqueeSwiper.el.addEventListener("mouseenter", () => {
  //   marqueeSwiper.autoplay.stop();
  //   marqueeSwiper.setTranslate(marqueeSwiper.getTranslate());
  // });

  // marqueeSwiper.el.addEventListener("mouseleave", () => {
  //   marqueeSwiper.autoplay.start();
  // });
}

// Scroll To Top Button + Scroll Progress
function scrollToTop() {
  const progress = document.getElementById('progress')
  const scrollProgress = document.querySelector('.progress')
  const targetElement = document.documentElement

  progress.addEventListener('click', () => {
    ScrollSmoother.get().scrollTo(0, true);
  });
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY
    const scrollHeight = targetElement.scrollHeight - window.innerHeight
    const scrollValue = Math.round((scrollTop * 100) / scrollHeight)

    if (scrollTop > 100) {
      scrollProgress.classList.add('setvissible')
      scrollProgress.style.background = `conic-gradient(#4F46E5 ${scrollValue}% , #fafafa ${scrollValue}%)`
    } else {
      scrollProgress.classList.remove('setvissible')
      scrollProgress.style.background = `conic-gradient(#4F46E5 0%, #fafafa 0%)`
    }
  })
}
scrollToTop()
function raf(time) {
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);


const smoother = ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 2,
  effects: true,
  smoothTouch: 0.8,
});


function initAnimations() {
  /**
   * ALL EXISTING ANIMATION CODES GO HERE
   * 1.1-> animation Global variable 
   * 1.2-> sticky card 
   * 1.3-> Reuseable Heading animation script  
   * 1.4-> Multiple glass card section    
   * 1.5-> Newsletter glass card section    
   * 2.1-> Demo Animation Script    
   * 2.2-> Choose US animation script  
   * 3.1-> home version one Hero animation
   * 3.2-> home version one Team animation
   * 3.3-> home version one Team animation
   * 3.4-> home version one App animation
   * 4.1-> home version Two Hero animation
   * 4.2-> home version Two review animation
   * 4.3-> home version Two Testimonial animation
   * 5.1-> home version Three Hero animation
   * 5.2-> home version Three Workflow circle rotation
   * 5.3-> home version Three Integrations map
   * 5.4-> home version Three Testimonial
   * 5.5-> home version Three Final CTA
   * 7.1-> Features Helped row sequence
   * 7.2-> Features Smarter card polish
   * etc...
   */
  //----------------------------------------------
  //1.1=>animation Global variable 
  //----------------------------------------------
  const sharedFrom = { y: 60, opacity: 0, filter: "blur(16px)" };
  const sharedTo = { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power3.out" };
  //----------------------------------------------
  //1.2=>sticky card animation start here
  //----------------------------------------------
  let mm = gsap.matchMedia();

  mm.add("(min-width: 767px)", () => {

    const cards = gsap.utils.toArray(".sticky-card");
    const offset = 70;

    cards.forEach((card, index) => {

      // ✅ If index is 0 or 1 → no offset
      const startOffset = index < 2
        ? 80
        : 80 + (index - 1) * offset;
      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: `top top+=${startOffset}`,
          endTrigger: ".process-end",
          end: "top top+=300",
          pin: true,
          pinSpacing: false,
          scrub: true,
        },
      });

    });

    // Home V3 — pin left title while extended cards scroll
    const extendedSection = document.querySelector("[data-extended-section]");
    const extendedSticky = document.querySelector("[data-extended-sticky]");
    if (extendedSection && extendedSticky) {
      ScrollTrigger.create({
        trigger: extendedSticky,
        start: "top top+=96",
        endTrigger: extendedSection,
        end: "bottom bottom",
        pin: true,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });
    }

  });

  //----------------------------------------------
  // 5.2=> home version Three Workflow circle rotation
  // LOCKED (approved): scrub rotate, pin start "center center",
  // rotate .workflow-dome-surface — do not retune without QA.
  //----------------------------------------------
  gsap.matchMedia().add("(min-width: 1024px)", () => {
    const pin = document.querySelector("[data-workflow-pin]");
    const wheel = document.querySelector("[data-workflow-wheel]");
    const steps = gsap.utils.toArray("[data-workflow-step]");
    const inners = gsap.utils.toArray("[data-workflow-step-inner]");

    if (!pin || !wheel || !steps.length) return;

    steps.forEach((step, i) => {
      gsap.set(step, {
        rotation: i * 90,
        transformOrigin: "50% 50%",
        force3D: true,
      });
    });

    // Flex-centered half-dome box; rotate the circle surface around its true center
    const dome = wheel.querySelector(".workflow-dome-surface");
    gsap.set(wheel, { x: 0, y: 0, force3D: true });
    if (dome) {
      gsap.set(dome, {
        transformOrigin: "50% 50%",
        force3D: true,
      });
    }

    inners.forEach((inner) => {
      inner._parts = {
        label: inner.querySelector("[data-step-label]"),
        number: inner.querySelector("[data-step-number]"),
        line: inner.querySelector("[data-step-line]"),
        title: inner.querySelector("[data-step-title]"),
        desc: inner.querySelector("[data-step-desc]"),
      };
      gsap.set(inner, { autoAlpha: 0 });
    });

    // Smooth falloff: only the step near the top is readable
    const paintSteps = (progress) => {
      const head = progress * 3; // 0 → 3 across four steps
      inners.forEach((inner, i) => {
        const parts = inner._parts || {};
        const dist = Math.abs(head - i);
        // tight window so off-angle steps never show
        const t = gsap.utils.clamp(0, 1, 1 - dist * 1.55);
        const easeT = t * t * (3 - 2 * t); // smoothstep

        gsap.set(inner, { autoAlpha: easeT > 0.02 ? 1 : 0 });

        if (parts.label) {
          gsap.set(parts.label, {
            autoAlpha: easeT,
            y: (1 - easeT) * 18,
            filter: `blur(${(1 - easeT) * 10}px)`,
          });
        }
        if (parts.number) {
          gsap.set(parts.number, {
            autoAlpha: easeT,
            y: (1 - easeT) * 22,
            scale: 0.82 + easeT * 0.18,
            filter: `blur(${(1 - easeT) * 12}px)`,
          });
        }
        if (parts.line) {
          gsap.set(parts.line, {
            autoAlpha: easeT,
            scaleY: easeT,
            transformOrigin: "top center",
          });
        }
        if (parts.title) {
          gsap.set(parts.title, {
            autoAlpha: easeT,
            y: (1 - easeT) * 36,
            filter: `blur(${(1 - easeT) * 14}px)`,
          });
        }
        if (parts.desc) {
          gsap.set(parts.desc, {
            autoAlpha: Math.max(0, easeT * 1.05 - 0.08),
            y: (1 - easeT) * 42,
            filter: `blur(${(1 - easeT) * 16}px)`,
          });
        }
      });
    };

    paintSteps(0);

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: pin,
        // Center in viewport while scrubbing — keeps default heading→circle gap tight
        start: "center center",
        end: () => "+=" + Math.round(window.innerHeight * 4.5),
        pin: true,
        scrub: 0.65,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => paintSteps(self.progress),
      },
    });

    // Rotate the full circle (not the clipped half-box) so steps stay correct
    tl.to(dome || wheel, {
      rotation: -270,
      ease: "none",
    }, 0);
  });

  //----------------------------------------------
  // 5.3=> Integrations map — premium connection choreography
  // LOCKED (approved): Desktop L/R + SVG draw/flow; Mobile stacked + beams.
  // Do not retune timing, matchMedia breakpoint (769), or path targets without QA.
  //----------------------------------------------
  gsap.utils.toArray("[data-integrations-map]").forEach((map) => {
    const hub = map.querySelector("[data-integrations-hub]");
    const glow = map.querySelector("[data-integrations-glow]");
    const beams = gsap.utils.toArray(map.querySelectorAll(".integrations-mobile-beam"));
    const leftIcons = gsap.utils.toArray(
      map.querySelectorAll('[data-integrations-col="left"] [data-integrations-icon]')
    );
    const rightIcons = gsap.utils.toArray(
      map.querySelectorAll('[data-integrations-col="right"] [data-integrations-icon]')
    );
    const allIcons = [...leftIcons, ...rightIcons];
    const paths = gsap.utils.toArray(map.querySelectorAll("[data-integrations-lines] path"));
    if (!hub) return;

    const basePaths = [];
    const dashPaths = [];
    paths.forEach((path) => {
      if ((path.getAttribute("stroke") || "").toLowerCase() === "white") {
        dashPaths.push(path);
      } else {
        basePaths.push(path);
      }
    });

    gsap.matchMedia().add(
      {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        isDesktop: "(min-width: 769px)",
      },
      (context) => {
        const { reduceMotion, isDesktop } = context.conditions;

        if (reduceMotion) {
          gsap.set([hub, glow, ...allIcons, ...basePaths, ...dashPaths, ...beams], {
            clearProps: "all",
          });
          return;
        }

        if (isDesktop) {
          basePaths.forEach((path) => {
            let len = 0;
            try {
              len = path.getTotalLength();
            } catch (e) {
              len = 500;
            }
            if (!len || !isFinite(len)) len = 500;
            gsap.set(path, {
              strokeDasharray: len,
              strokeDashoffset: len,
              opacity: 0.9,
            });
          });
          gsap.set(dashPaths, { opacity: 0 });
        }

        gsap.set(hub, { scale: 0.72, opacity: 0 });
        gsap.set(glow, { scale: 0.55, opacity: 0 });

        if (isDesktop) {
          gsap.set(leftIcons, { x: -48, opacity: 0, filter: "blur(8px)" });
          gsap.set(rightIcons, { x: 48, opacity: 0, filter: "blur(8px)" });
        } else {
          gsap.set(leftIcons, { y: -28, opacity: 0, filter: "blur(6px)" });
          gsap.set(rightIcons, { y: 28, opacity: 0, filter: "blur(6px)" });
          gsap.set(beams, { scaleY: 0, opacity: 0, transformOrigin: "center top" });
        }

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: map,
            start: "top 80%",
            once: true,
            invalidateOnRefresh: true,
          },
        });

        tl.to(hub, { scale: 1, opacity: 1, duration: 0.8 }, 0)
          .to(glow, { scale: 1, opacity: 0.6, duration: 0.95, ease: "power2.out" }, 0.04);

        if (isDesktop) {
          tl.to(
            leftIcons,
            { x: 0, opacity: 1, filter: "blur(0px)", duration: 0.65, stagger: 0.06 },
            0.12
          )
            .to(
              rightIcons,
              { x: 0, opacity: 1, filter: "blur(0px)", duration: 0.65, stagger: 0.06 },
              0.12
            )
            .to(
              basePaths,
              {
                strokeDashoffset: 0,
                duration: 1.1,
                stagger: 0.04,
                ease: "power2.inOut",
              },
              0.22
            )
            .to(dashPaths, { opacity: 1, duration: 0.4, ease: "power1.out" }, 0.75);
        } else {
          tl.to(
            leftIcons,
            { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.6, stagger: 0.05 },
            0.1
          )
            .to(beams, { scaleY: 1, opacity: 1, duration: 0.45, stagger: 0.08 }, 0.2)
            .to(
              rightIcons,
              { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.6, stagger: 0.05 },
              0.28
            );
        }

        tl.eventCallback("onComplete", () => {
          gsap.set([hub, ...allIcons], { opacity: 1, clearProps: "filter" });
        });

        tl.add(() => {
          gsap.to(hub, {
            scale: 1.04,
            duration: 2.6,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });

          gsap.to(glow, {
            opacity: 0.85,
            scale: 1.08,
            duration: 2.6,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });

          if (isDesktop && dashPaths.length) {
            gsap.to(dashPaths, {
              strokeDashoffset: "-=78",
              duration: 1.35,
              ease: "none",
              repeat: -1,
            });

            gsap.to(allIcons, {
              y: -4,
              duration: 2.2,
              ease: "sine.inOut",
              stagger: { each: 0.14, repeat: -1, yoyo: true },
            });
          } else if (beams.length) {
            gsap.to(beams, {
              opacity: 0.45,
              duration: 1.4,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              stagger: 0.15,
            });
          }
        }, "+=0.05");

        requestAnimationFrame(() => ScrollTrigger.refresh());
      }
    );
  });

  //----------------------------------------------
  //1.3=>Reuseable Heading animation script  
  //----------------------------------------------
  const demoHeading = document.querySelectorAll('[data-section-title]');

  if (demoHeading.length) {
    demoHeading.forEach(section => {
      const subtitle = section.querySelector('[data-subtitle]');
      const title = section.querySelector('[data-title]');
      const excerpt = section.querySelector('[data-excerpt]');

      const tl = gsap.timeline({ paused: true });

      if (subtitle) {
        tl.fromTo(
          subtitle,
          { ...sharedFrom, scale: 0.8 },
          { ...sharedTo, scale: 1 },
          0
        );
      }

      if (title) {
        tl.fromTo(title, sharedFrom, { ...sharedTo }, "-=0.6");
      }

      if (excerpt) {
        tl.fromTo(excerpt, sharedFrom, { ...sharedTo }, "-=0.6");
      }

      // ScrollTrigger attached separately to timeline
      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        end: "top 40%",
        animation: tl,
        toggleActions: "play none none none",
        invalidateOnRefresh: true,
        // markers: true,
      });
    });

    // In case layout shifts (fonts/images load), refresh triggers
    ScrollTrigger.refresh();
  }
  //----------------------------------------------
  //1.4=> Multiple glass card section  
  //----------------------------------------------
  const sttrWrapper = document.querySelectorAll('[data-sttr-wrapper]');
  if (sttrWrapper.length) {
    sttrWrapper.forEach(sttrWrapper => {
      const sttrCards = sttrWrapper.querySelectorAll('[data-sttr-card]');
      const tl = gsap.timeline({ paused: true });
      if (sttrCards) {
        sttrCards.forEach(sttrCard => {
          tl.fromTo(sttrCard, { y: 100, opacity: 0, filter: "blur(16px)" }, {
            y: 0, opacity: 1, filter: "blur(0px)", ease: "power3.out",
            duration: 0.6,
            stagger: 0.04,
          }, "-=0.4");
        })
      }
      // ScrollTrigger attached separately to timeline
      ScrollTrigger.create({
        trigger: sttrWrapper,
        start: "top 80%",
        end: "top 40%",
        animation: tl,
        toggleActions: "play none none none",
        invalidateOnRefresh: true,
        //markers: true,
      });
      // In case layout shifts (fonts/images load), refresh triggers
      ScrollTrigger.refresh();
    })

  }
  //----------------------------------------------
  //1.5=> Newsletter CTA — same choreography as Home V3 Final CTA (5.5)
  // gsap.set first; paused TL + ScrollTrigger (works on Features/About/etc.)
  //----------------------------------------------
  const newsletterWrapper = document.querySelectorAll("[data-newsletter-wrapper]");
  if (newsletterWrapper.length) {
    newsletterWrapper.forEach((panel) => {
      const title = panel.querySelector("[data-news-title]");
      const excerpt = panel.querySelector("[data-news-excerpt]");
      const buttons = gsap.utils.toArray(panel.querySelectorAll("[data-news-btn]"));
      const video = panel.querySelector("[data-news-video]");
      const shape = panel.querySelector("[data-news-shape]");
      const glows = gsap.utils.toArray(panel.querySelectorAll("[data-news-glow]"));

      gsap.matchMedia().add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          isMotion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduceMotion } = context.conditions;
          const bits = [panel, title, excerpt, ...buttons, video, shape, ...glows].filter(
            Boolean
          );

          if (reduceMotion) {
            gsap.set(bits, { clearProps: "all" });
            return;
          }

          // Mirror Home V3 CTA (5.5) initial state — no pre-flash
          gsap.set(panel, { y: 40, opacity: 0 });
          if (title) gsap.set(title, { y: 32, opacity: 0, filter: "blur(12px)" });
          if (excerpt) gsap.set(excerpt, { y: 24, opacity: 0, filter: "blur(10px)" });
          if (buttons.length) gsap.set(buttons, { y: 20, opacity: 0, scale: 0.96 });
          if (video) gsap.set(video, { opacity: 0, x: 48 });
          if (shape) gsap.set(shape, { opacity: 0, y: 24 });
          if (glows.length) gsap.set(glows, { opacity: 0 });

          const tl = gsap.timeline({
            paused: true,
            defaults: { ease: "power3.out" },
          });

          tl.to(panel, { y: 0, opacity: 1, duration: 0.7 }, 0);
          if (glows.length) {
            tl.to(glows, { opacity: 1, duration: 0.9, ease: "power2.out", stagger: 0.05 }, 0.05);
          }
          if (video) {
            tl.to(video, { opacity: 1, x: 0, duration: 0.9, ease: "power2.out" }, 0.05);
          }
          if (shape) {
            tl.to(shape, { opacity: 1, y: 0, duration: 0.85 }, 0.08);
          }
          if (title) {
            tl.to(
              title,
              { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.75 },
              0.1
            );
          }
          if (excerpt) {
            tl.to(
              excerpt,
              { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.65 },
              0.22
            );
          }
          if (buttons.length) {
            tl.to(
              buttons,
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.55,
                stagger: 0.1,
                ease: "power2.out",
              },
              0.38
            );
          }

          tl.eventCallback("onComplete", () => {
            gsap.set([title, excerpt].filter(Boolean), { clearProps: "filter" });
          });

          ScrollTrigger.create({
            trigger: panel,
            start: "top 80%",
            end: "top 40%",
            animation: tl,
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          });
        }
      );
    });

    ScrollTrigger.refresh();
  }

  //----------------------------------------------
  //6.1=> About — Journey full-bleed horizontal scrub
  // Track is 100vw (outside container). Progress line draws with scrub.
  //----------------------------------------------
  const aboutJourney = document.querySelector("[data-about-journey]");
  if (aboutJourney) {
    const pin = aboutJourney.querySelector("[data-journey-pin]");
    const track = aboutJourney.querySelector("[data-journey-track]");
    const scroll = aboutJourney.querySelector("[data-journey-scroll]");
    const progressLine = aboutJourney.querySelector("[data-journey-progress]");
    const axisLayer = aboutJourney.querySelector(".journey-axis-layer");
    const items = gsap.utils.toArray(
      aboutJourney.querySelectorAll("[data-journey-item]")
    );

    if (pin && track && scroll && items.length) {
      gsap.matchMedia().add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          isMotion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduceMotion } = context.conditions;

          const alignAxis = () => {
            if (!axisLayer || !items[0]) return;
            const anchor = items[0].querySelector("[data-journey-axis-anchor]");
            if (!anchor) return;
            const top =
              anchor.getBoundingClientRect().top -
              scroll.getBoundingClientRect().top;
            axisLayer.style.top = `${Math.max(0, top)}px`;
          };

          if (reduceMotion) {
            gsap.set(scroll, { clearProps: "transform" });
            if (progressLine) gsap.set(progressLine, { scaleX: 1 });
            items.forEach((item) => item.classList.add("is-active"));
            alignAxis();
            return;
          }

          const getDistance = () =>
            Math.max(0, scroll.scrollWidth - track.clientWidth);

          items[0]?.classList.add("is-active");
          if (progressLine) {
            gsap.set(progressLine, {
              scaleX: 0.06,
              transformOrigin: "left center",
            });
          }

          // Soft content enter — axis/progress stay full-opacity (no broken line look)
          items.forEach((item, i) => {
            const copy = item.querySelector("[data-journey-copy]");
            const media = item.querySelector("[data-journey-media]");
            if (i === 0) {
              gsap.set([copy, media].filter(Boolean), { opacity: 1, y: 0 });
            } else {
              gsap.set([copy, media].filter(Boolean), { opacity: 0.55, y: 18 });
            }
          });

          const scrubTween = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: pin,
              start: "top top+=96",
              end: () => "+=" + (getDistance() * 1.15 + window.innerHeight * 0.35),
              pin: true,
              scrub: 0.85,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onRefresh: alignAxis,
            },
          });

          scrubTween.to(scroll, { x: () => -getDistance() }, 0);
          if (progressLine) {
            scrubTween.to(progressLine, { scaleX: 1 }, 0);
          }

          alignAxis();
          requestAnimationFrame(alignAxis);

          items.forEach((item, i) => {
            const copy = item.querySelector("[data-journey-copy]");
            const media = item.querySelector("[data-journey-media]");

            ScrollTrigger.create({
              trigger: item,
              containerAnimation: scrubTween,
              start: "left 70%",
              end: "left 30%",
              onEnter: () => {
                items.forEach((el) => el.classList.remove("is-active"));
                item.classList.add("is-active");
              },
              onEnterBack: () => {
                items.forEach((el) => el.classList.remove("is-active"));
                item.classList.add("is-active");
              },
            });

            if (copy || media) {
              gsap
                .timeline({
                  scrollTrigger: {
                    trigger: item,
                    containerAnimation: scrubTween,
                    start: "left 90%",
                    end: "left 45%",
                    scrub: true,
                  },
                })
                .to(
                  copy || item,
                  { y: 0, opacity: 1, ease: "none", duration: 1 },
                  0
                )
                .to(
                  media || item,
                  { y: 0, opacity: 1, ease: "none", duration: 1 },
                  0.05
                );
            }

            if (i === 0) {
              gsap.set([copy, media].filter(Boolean), { y: 0, opacity: 1 });
            }
          });

          const imgs = scroll.querySelectorAll("img");
          let pending = imgs.length;
          const refresh = () => {
            alignAxis();
            ScrollTrigger.refresh();
          };
          if (!pending) {
            requestAnimationFrame(refresh);
          } else {
            imgs.forEach((img) => {
              if (img.complete) {
                if (--pending === 0) refresh();
              } else {
                img.addEventListener(
                  "load",
                  () => {
                    if (--pending === 0) refresh();
                  },
                  { once: true }
                );
              }
            });
          }

          window.addEventListener("resize", alignAxis);
          return () => window.removeEventListener("resize", alignAxis);
        }
      );
    }
  }

  //----------------------------------------------
  //6.2=> About — Team grid (photo + meta cascade)
  //----------------------------------------------
  const aboutTeamGrid = document.querySelector("[data-about-team-grid]");
  if (aboutTeamGrid) {
    const cards = gsap.utils.toArray(
      aboutTeamGrid.querySelectorAll("[data-team-card]")
    );

    gsap.matchMedia().add(
      {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        isMotion: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { reduceMotion } = context.conditions;
        if (reduceMotion) {
          gsap.set(cards, { clearProps: "all" });
          return;
        }

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: aboutTeamGrid,
            start: "top 80%",
            once: true,
            invalidateOnRefresh: true,
          },
        });

        cards.forEach((card, i) => {
          const photo = card.querySelector("img");
          const meta = card.querySelector("[data-team-meta]");
          const at = i * 0.08;

          gsap.set(card, { y: 56, opacity: 0, filter: "blur(12px)" });
          tl.to(
            card,
            { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.7 },
            at
          );

          if (photo) {
            gsap.set(photo, { scale: 1.08 });
            tl.to(photo, { scale: 1, duration: 0.9, ease: "power2.out" }, at);
          }
          if (meta) {
            gsap.set(meta, { y: 16, opacity: 0 });
            tl.to(meta, { y: 0, opacity: 1, duration: 0.5 }, at + 0.18);
          }
        });

        tl.eventCallback("onComplete", () => {
          gsap.set(cards, { clearProps: "filter" });
        });
      }
    );
  }

  //----------------------------------------------
  //7.1=> Features — Helped rows (media → copy sequence)
  // Scoped per row so hooks never collide with other pages.
  //----------------------------------------------
  const featuresHelpedRows = gsap.utils.toArray("[data-features-helped-row]");
  if (featuresHelpedRows.length) {
    gsap.matchMedia().add(
      {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        isMotion: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { reduceMotion } = context.conditions;

        featuresHelpedRows.forEach((row) => {
          const media = row.querySelector("[data-helped-media]");
          const title = row.querySelector("[data-helped-title]");
          const excerpt = row.querySelector("[data-helped-excerpt]");
          const line = row.querySelector("[data-helped-line]");
          const list = row.querySelector("[data-helped-list]");
          const stats = row.querySelector("[data-helped-stats]");
          const listItems = list
            ? gsap.utils.toArray(list.querySelectorAll("li"))
            : [];
          const statBlocks = stats
            ? gsap.utils.toArray(stats.querySelectorAll("[data-lists]"))
            : [];
          const bits = [
            media,
            title,
            excerpt,
            line,
            list,
            ...listItems,
            stats,
            ...statBlocks,
          ].filter(Boolean);

          if (reduceMotion) {
            gsap.set(bits, { clearProps: "all" });
            return;
          }

          if (media) {
            gsap.set(media, {
              y: 44,
              opacity: 0,
              filter: "blur(12px)",
              scale: 0.96,
            });
          }
          gsap.set([title, excerpt, line].filter(Boolean), {
            y: 32,
            opacity: 0,
            filter: "blur(10px)",
          });
          if (listItems.length) {
            gsap.set(listItems, { y: 20, opacity: 0 });
          } else if (list) {
            gsap.set(list, { y: 20, opacity: 0 });
          }
          if (statBlocks.length) {
            gsap.set(statBlocks, { y: 24, opacity: 0 });
          } else if (stats) {
            gsap.set(stats, { y: 24, opacity: 0 });
          }

          const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: row,
              start: "top 78%",
              once: true,
              invalidateOnRefresh: true,
            },
          });

          if (media) {
            tl.to(
              media,
              {
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                scale: 1,
                duration: 0.85,
              },
              0
            );
          }
          if (title) {
            tl.to(
              title,
              { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.7 },
              0.12
            );
          }
          if (excerpt) {
            tl.to(
              excerpt,
              { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.65 },
              0.22
            );
          }
          if (line) {
            tl.to(
              line,
              { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.55 },
              0.3
            );
          }
          if (listItems.length) {
            tl.to(
              listItems,
              { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
              0.38
            );
          } else if (list) {
            tl.to(list, { y: 0, opacity: 1, duration: 0.55 }, 0.38);
          }
          if (statBlocks.length) {
            tl.to(
              statBlocks,
              { y: 0, opacity: 1, duration: 0.55, stagger: 0.1 },
              0.4
            );
          } else if (stats) {
            tl.to(stats, { y: 0, opacity: 1, duration: 0.55 }, 0.4);
          }

          tl.eventCallback("onComplete", () => {
            gsap.set([media, title, excerpt, line].filter(Boolean), {
              clearProps: "filter",
            });
          });
        });
      }
    );
  }

  //----------------------------------------------
  //7.2=> Features — Smarter cards (icon → title → body)
  //----------------------------------------------
  const featuresSmarter = document.querySelector("[data-features-smarter]");
  if (featuresSmarter) {
    const cards = gsap.utils.toArray(
      featuresSmarter.querySelectorAll("[data-smarter-card]")
    );

    gsap.matchMedia().add(
      {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        isMotion: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { reduceMotion } = context.conditions;

        if (reduceMotion) {
          gsap.set(cards, { clearProps: "all" });
          return;
        }

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: featuresSmarter,
            start: "top 80%",
            once: true,
            invalidateOnRefresh: true,
          },
        });

        cards.forEach((card, i) => {
          const icon = card.querySelector("[data-smarter-icon]");
          const title = card.querySelector("[data-smarter-title]");
          const line = card.querySelector("[data-smarter-line]");
          const desc = card.querySelector("[data-smarter-desc]");
          const at = i * 0.08;

          gsap.set(card, { y: 48, opacity: 0, filter: "blur(12px)" });
          tl.to(
            card,
            { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.65 },
            at
          );

          if (icon) {
            gsap.set(icon, { scale: 0.7, opacity: 0 });
            tl.to(
              icon,
              { scale: 1, opacity: 1, duration: 0.45, ease: "power2.out" },
              at + 0.08
            );
          }
          if (title) {
            gsap.set(title, { y: 14, opacity: 0 });
            tl.to(title, { y: 0, opacity: 1, duration: 0.4 }, at + 0.16);
          }
          if (line) {
            gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
            tl.to(line, { scaleX: 1, duration: 0.4 }, at + 0.22);
          }
          if (desc) {
            gsap.set(desc, { y: 12, opacity: 0 });
            tl.to(desc, { y: 0, opacity: 1, duration: 0.4 }, at + 0.28);
          }
        });

        tl.eventCallback("onComplete", () => {
          gsap.set(cards, { clearProps: "filter" });
        });
      }
    );
  }

  //----------------------------------------------
  //2.1=> Demo Animation Script  
  //----------------------------------------------
  const demoHero = document.querySelector('.demo-banner');

  if (demoHero) {
    const header = document.querySelector('.header-wrapper');
    const title = demoHero.querySelector('h1');
    const excerpt = demoHero.querySelector('p');
    const sttrCard = demoHero.querySelectorAll('.sttr-card');
    const marquee = demoHero.querySelectorAll('[data-slider-animi]');

    const tl = gsap.timeline({ paused: true });

    if (title) {
      tl.fromTo(title, sharedFrom, { ...sharedTo }, 0);
    }

    if (excerpt) {
      tl.fromTo(excerpt, sharedFrom, { ...sharedTo }, "-=0.6");
    }
    if (sttrCard) {
      sttrCard.forEach(sttrCard => {
        tl.fromTo(sttrCard, sharedFrom, {
          ...sharedTo,
          stagger: 0.05,
        }, "-=0.6");
      })
    }
    if (header) {
      tl.fromTo(
        header,
        { y: -100, opacity: 0, filter: "blur(16px)" },
        { y: 0, opacity: 1, duration: 0.6, filter: "blur(0px)", ease: "power3.out" },
        "-=0.8"
      );
    }
    if (marquee) {
      tl.fromTo(
        marquee,
        { y: 100, scale: 0.85, origin: "top center", opacity: 0, filter: "blur(16px)" },
        { y: 0, scale: 1, opacity: 1, duration: 1.2, filter: "blur(0px)", ease: "power3.out" },
        "-=0.8"
      );
    }
    // ScrollTrigger attached separately to timeline
    ScrollTrigger.create({
      trigger: demoHero,
      start: "top 80%",
      end: "top 40%",
      animation: tl,
      toggleActions: "play none none none",
      invalidateOnRefresh: true,
      // markers: true,
    });
    // In case layout shifts (fonts/images load), refresh triggers
    ScrollTrigger.refresh();
  }
  //----------------------------------------------
  //2.2=> Choose US animation script  
  //----------------------------------------------
  const chooseUs = document.querySelector('.choose-us');

  if (chooseUs) {
    const ChooseSttrCards = chooseUs.querySelectorAll('.c-sttr-card');

    const tl = gsap.timeline({ paused: true });
    if (ChooseSttrCards) {
      ChooseSttrCards.forEach(sttrCard => {
        tl.fromTo(sttrCard, { y: 100, opacity: 0, filter: "blur(16px)" }, {
          y: 0, opacity: 1, filter: "blur(0px)", ease: "power3.out",
          duration: 0.6,
          stagger: 0.03,
        }, "-=0.3");
      })
    }
    // ScrollTrigger attached separately to timeline
    ScrollTrigger.create({
      trigger: chooseUs,
      start: "top 80%",
      end: "top 40%",
      animation: tl,
      toggleActions: "play none none none",
      invalidateOnRefresh: true,
      //markers: true,
    });
    // In case layout shifts (fonts/images load), refresh triggers
    ScrollTrigger.refresh();
  }
  //----------------------------------------------
  //3.1=>home version one Hero animation
  //----------------------------------------------
  const homeV1Hero = document.querySelector('[data-hero-section]');

  if (homeV1Hero) {
    const header = document.querySelector('.header-wrapper');
    const bgShape = homeV1Hero.querySelector('[data-bg-shape]');
    const subtitle = homeV1Hero.querySelector('[data-subtitle]');
    const title = homeV1Hero.querySelector('[data-title]');
    const excerpt = homeV1Hero.querySelector('[data-excerpt]');
    const button = homeV1Hero.querySelector('[data-button]');
    const thumbnail = homeV1Hero.querySelector('[data-thumbnail]');

    const tl = gsap.timeline({ paused: true });

    if (subtitle) {
      tl.fromTo(subtitle,
        sharedFrom, { ...sharedTo, delay: 0.4 }, 0);
    }
    if (title) {
      tl.fromTo(title, sharedFrom, { ...sharedTo }, "-=0.6");
    }
    if (excerpt) {
      tl.fromTo(excerpt, sharedFrom, { ...sharedTo }, "-=0.6");
    }
    if (bgShape) {
      tl.fromTo(bgShape, {
        ...sharedFrom,
        scale: 0.8,
        transformOrigin: "bottom left",
        y: 100
      }, {
        ...sharedTo,
        scale: 1,
        duration: 0.8,
        y: 0
      }, "-=0.6");
    }
    if (button) {
      tl.fromTo(button, sharedFrom, {
        ...sharedTo,
      }, "-=0.6");
    }

    if (thumbnail) {
      tl.fromTo(thumbnail, sharedFrom, {
        ...sharedTo,
      }, "-=0.6");
    }
    if (header) {
      tl.fromTo(
        header,
        { y: -100, opacity: 0, filter: "blur(16px)" },
        { y: 0, opacity: 1, duration: 0.6, filter: "blur(0px)", ease: "power3.out" },
        "-=0.8"
      );
    }
    // ScrollTrigger attached separately to timeline
    ScrollTrigger.create({
      trigger: homeV1Hero,
      start: "top 80%",
      end: "top 40%",
      animation: tl,
      toggleActions: "play none none none",
      invalidateOnRefresh: true,
      //markers: true,
    });
    // In case layout shifts (fonts/images load), refresh triggers
    ScrollTrigger.refresh();
  }
  //----------------------------------------------
  //3.2=> home version one Team animation
  //----------------------------------------------

  const homeV1Trail = document.querySelector('[data-container="trail-section"]');
  if (homeV1Trail) {
    const thumbnail = homeV1Trail.querySelector('[data-video]');
    const title = homeV1Trail.querySelector('[data-title]');
    const excerpt = homeV1Trail.querySelector('[data-excerpt]');
    const topLine = homeV1Trail.querySelector('[data-line-top]');
    const list = homeV1Trail.querySelector('[data-list]');
    const bottomLine = homeV1Trail.querySelector('[data-line-bottom]');
    const button = homeV1Trail.querySelector('[data-button]');

    const tl = gsap.timeline({ paused: true });

    const trailFrom = { y: 100, opacity: 0, filter: "blur(16px)" };
    const trailTo = { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "back" };
    if (title) {
      tl.fromTo(title, {
        ...trailFrom
      }, {
        ...trailTo
      }, 0);
    }
    if (thumbnail) {
      tl.fromTo(thumbnail, {
        ...trailFrom,
        scale: 0.8,
        transformOrigin: "bottom left",
        y: 100
      }, {
        ...trailTo,
        scale: 1,
        duration: 0.8,
        y: 0
      }, "-=0.6");
    }
    if (excerpt) {
      tl.fromTo(excerpt, {
        ...trailFrom
      }, {
        ...trailTo
      }, "-=0.6");
    }
    if (topLine) {
      tl.fromTo(topLine, {
        ...trailFrom
      }, {
        ...trailTo
      }, "-=0.6");
    }
    if (list) {
      tl.fromTo(list, {
        ...trailFrom
      }, {
        ...trailTo
      }, "-=0.6");
    }
    if (bottomLine) {
      tl.fromTo(bottomLine, {
        ...trailFrom
      }, {
        ...trailTo
      }, "-=0.6");
    }
    if (button) {
      tl.fromTo(button, {
        ...trailFrom
      }, {
        ...trailTo
      }, "-=0.6");
    }


    // ScrollTrigger attached separately to timeline
    ScrollTrigger.create({
      trigger: homeV1Trail,
      start: "top 80%",
      end: "top 40%",
      animation: tl,
      toggleActions: "play none none none",
      invalidateOnRefresh: true,
      //markers: true,
    });
    // In case layout shifts (fonts/images load), refresh triggers
    ScrollTrigger.refresh();
  }
  //----------------------------------------------
  //3.3=> home version one Team animation
  //----------------------------------------------

  const processArea = document.querySelector('[data-container="process-area"]');
  if (processArea) {
    const title = processArea.querySelector('[data-title]');
    const excerpt = processArea.querySelector('[data-excerpt]');
    const cards = processArea.querySelectorAll('[data-card]');
    const tl = gsap.timeline({ paused: true });

    const trailFrom = { x: -100, opacity: 0, filter: "blur(16px)" };
    const trailTo = { x: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "back" };
    if (title) {
      tl.fromTo(title, {
        ...trailFrom
      }, {
        ...trailTo
      }, 0);
    }
    if (excerpt) {
      tl.fromTo(excerpt, {
        ...trailFrom
      }, {
        ...trailTo
      }, "-=0.6");
    }
    if (cards.length) {
      cards.forEach(card => {
        tl.fromTo(card, {
          ...sharedFrom
        }, {
          ...sharedTo
        }, "-=0.6");
      })
    }

    // ScrollTrigger attached separately to timeline
    ScrollTrigger.create({
      trigger: processArea,
      start: "top 80%",
      end: "top 40%",
      animation: tl,
      toggleActions: "play none none none",
      invalidateOnRefresh: true,
      //markers: true,
    });
    // In case layout shifts (fonts/images load), refresh triggers
    ScrollTrigger.refresh();
  }
  //----------------------------------------------
  // 3.4=> home version one App animation
  //----------------------------------------------

  const appSection = document.querySelector('[data-container="apps-section"]');
  if (appSection) {
    const title = appSection.querySelector('[data-title]');
    const excerpt = appSection.querySelector('[data-excerpt]');
    const button = appSection.querySelector('[data-button]');
    const thumbnail = appSection.querySelector('[data-thumbnail]');
    const bgShape = appSection.querySelector('[data-bg-shape]');
    const glowShape = appSection.querySelector('[data-glow-shape]');
    const tl = gsap.timeline({ paused: true });

    const trailFrom = { x: -100, opacity: 0, filter: "blur(16px)" };
    const trailTo = { x: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "back" };

    tl.fromTo(appSection, {
      y: 100, opacity: 0, filter: "blur(16px)"
    }, {
      y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "back"
    }, 0);

    if (title) {
      tl.fromTo(title, {
        ...trailFrom
      }, {
        ...trailTo
      }, "-=0.6");
    }
    if (excerpt) {
      tl.fromTo(excerpt, {
        ...trailFrom
      }, {
        ...trailTo
      }, "-=0.6");
    }
    if (button) {
      tl.fromTo(button, {
        ...trailFrom
      }, {
        ...trailTo
      }, "-=0.6");
    }
    if (thumbnail) {
      tl.fromTo(thumbnail, {
        x: 100, opacity: 0, filter: "blur(16px)", scale: 0.7, transformOrigin: "top right"
      }, {
        x: 0, opacity: 1, filter: "blur(0px)", scale: 1, duration: 0.8, ease: "back"
      }, "-=0.6");
    }
    if (bgShape) {
      tl.fromTo(bgShape, {
        y: 100, opacity: 0, filter: "blur(16px)"
      }, {
        y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power3.out"
      }, "-=0.6");
    }
    if (glowShape) {
      tl.fromTo(glowShape, {
        x: 100, opacity: 0, filter: "blur(16px)"
      }, {
        x: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power3.out"
      }, "-=0.6");
    }

    // ScrollTrigger attached separately to timeline
    ScrollTrigger.create({
      trigger: appSection,
      start: "top 80%",
      end: "top 40%",
      animation: tl,
      toggleActions: "play none none none",
      invalidateOnRefresh: true,
      //markers: true,
    });
    // In case layout shifts (fonts/images load), refresh triggers
    ScrollTrigger.refresh();
  }
  //----------------------------------------------
  // 4.1=> home version Two Hero animation
  //----------------------------------------------
  const h4HeroSection = document.querySelector('[data-container="homeV2-hero"]');
  if (h4HeroSection) {
    const header = document.querySelector('.header-wrapper');
    const subTitle = h4HeroSection.querySelector('[data-subtitle]');
    const title = h4HeroSection.querySelector('[data-title]');
    const excerpt = h4HeroSection.querySelector('[data-excerpt]');
    const button = h4HeroSection.querySelector('[data-button]');
    const listItems = h4HeroSection.querySelectorAll('[data-list] li');
    const thumbnail = h4HeroSection.querySelector('[data-thumbnail]');
    const video = h4HeroSection.querySelector('[data-video]');

    const tl = gsap.timeline({ paused: true });

    const trailFrom = { x: -100, opacity: 0, filter: "blur(16px)" };
    const trailTo = { x: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "back" };

    if (subTitle) {
      tl.fromTo(subTitle,
        trailFrom, { ...trailTo, delay: 0.4 }, 0);
    }
    if (title) {
      tl.fromTo(title, trailFrom, { ...trailTo }, "-=0.6");
    }
    if (excerpt) {
      tl.fromTo(excerpt, trailFrom, { ...trailTo }, "-=0.6");
    }
    if (button) {
      tl.fromTo(button, trailFrom, { ...trailTo }, "-=0.6");
    }
    if (listItems.length) {
      listItems.forEach(listItem => {
        tl.fromTo(listItem, trailFrom, { ...trailTo, stagger: 0.05 }, "-=0.6");
      })
    }
    if (video) {
      tl.fromTo(video, {
        y: 100, opacity: 0, filter: "blur(100px)", scale: 0.8, transformOrigin: "bottom left"
      }, {
        y: 0, opacity: 1, filter: "blur(0px)", scale: 1, duration: 0.8, ease: "power3.out"
      }, "-=1");
    }
    if (thumbnail) {
      tl.fromTo(thumbnail, {
        x: 100, opacity: 0, filter: "blur(16px)"
      }, {
        x: 0, opacity: 1, filter: "blur(0px)", scale: 1, duration: 0.8, ease: "power3.out",
      }, "-=0.4");
    }
    if (header) {
      tl.fromTo(
        header,
        { y: -100, opacity: 0, filter: "blur(16px)" },
        { y: 0, opacity: 1, duration: 0.6, filter: "blur(0px)", ease: "power3.out" },
        "-=0.8"
      );
    }
    // ScrollTrigger attached separately to timeline
    ScrollTrigger.create({
      trigger: h4HeroSection,
      start: "top 80%",
      end: "top 40%",
      animation: tl,
      toggleActions: "play none none none",
      invalidateOnRefresh: true,
      //markers: true,
    });
    // In case layout shifts (fonts/images load), refresh triggers
    ScrollTrigger.refresh();
  }
  //----------------------------------------------
  // 4.2=> home version Two review animation
  //----------------------------------------------
  const H2review = document.querySelector('[data-container="review-section"]');
  if (H2review) {
    const thumbnail = H2review.querySelector('[data-video]');
    const title = H2review.querySelector('[data-title]');
    const excerpt = H2review.querySelector('[data-excerpt]');
    const topLine = H2review.querySelector('[data-line-top]');
    const lists = H2review.querySelectorAll('[data-lists]');
    const bottomLine = H2review.querySelector('[data-line-bottom]');
    const button = H2review.querySelector('[data-button]');

    const tl = gsap.timeline({ paused: true });

    const trailFrom = { y: 100, opacity: 0, filter: "blur(16px)" };
    const trailTo = { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "back" };
    if (title) {
      tl.fromTo(title, {
        ...trailFrom
      }, {
        ...trailTo
      }, 0);
    }
    if (thumbnail) {
      tl.fromTo(thumbnail, {
        ...trailFrom,
        scale: 0.8,
        transformOrigin: "bottom left",
        y: 100
      }, {
        ...trailTo,
        scale: 1,
        duration: 0.8,
        y: 0
      }, "-=0.6");
    }
    if (excerpt) {
      tl.fromTo(excerpt, {
        ...trailFrom
      }, {
        ...trailTo
      }, "-=0.6");
    }
    if (topLine) {
      tl.fromTo(topLine, {
        ...trailFrom
      }, {
        ...trailTo
      }, "-=0.6");
    }
    if (lists.length) {
      lists.forEach(list => {
        tl.fromTo(list, {
          ...trailFrom
        }, {
          ...trailTo,
          stagger: 0.05
        }, "-=0.6");
      })
    }
    if (bottomLine) {
      tl.fromTo(bottomLine, {
        ...trailFrom
      }, {
        ...trailTo
      }, "-=0.6");
    }
    if (button) {
      tl.fromTo(button, {
        ...trailFrom
      }, {
        ...trailTo
      }, "-=0.6");
    }


    // ScrollTrigger attached separately to timeline
    ScrollTrigger.create({
      trigger: H2review,
      start: "top 80%",
      end: "top 40%",
      animation: tl,
      toggleActions: "play none none none",
      invalidateOnRefresh: true,
      //markers: true,
    });
    // In case layout shifts (fonts/images load), refresh triggers
    ScrollTrigger.refresh();
  }
  //----------------------------------------------
  //4.3=> home version Two Testimonial animation
  //----------------------------------------------

  const H2Testimonial = document.querySelector('[data-container="testimonial-section"]');
  if (H2Testimonial) {
    const subtitle = H2Testimonial.querySelector('[data-subtitle]');
    const title = H2Testimonial.querySelector('[data-title]');
    const excerpt = H2Testimonial.querySelector('[data-excerpt]');
    const review = H2Testimonial.querySelector('[data-review]');
    const Testimonial = H2Testimonial.querySelector('[data-testimonial]');
    const button = H2Testimonial.querySelector('[data-button]');

    const tl = gsap.timeline({ paused: true });

    const trailFrom = { y: 100, opacity: 0, filter: "blur(16px)" };
    const trailTo = { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "back" };
    if (subtitle) {
      tl.fromTo(subtitle, {
        ...trailFrom,
        scale: 0.8,
        transformOrigin: "bottom left",
      }, {
        ...trailTo,
        scale: 1,
        duration: 0.8,
      }, 0);
    }
    if (title) {
      tl.fromTo(title, {
        ...trailFrom,
        scale: 0.8,
        transformOrigin: "bottom left",
        y: 100
      }, {
        ...trailTo,
        scale: 1,
        duration: 0.8,
        y: 0
      }, "-=0.6");
    }
    if (excerpt) {
      tl.fromTo(excerpt, {
        ...trailFrom
      }, {
        ...trailTo
      }, "-=0.6");
    }
    if (review) {
      tl.fromTo(review, {
        ...trailFrom
      }, {
        ...trailTo
      }, "-=0.6");
    }
    if (Testimonial) {
      tl.fromTo(Testimonial, {
        ...trailFrom
      }, {
        ...trailTo
      }, "-=0.6");
    }
    if (button) {
      tl.fromTo(button, {
        ...trailFrom
      }, {
        ...trailTo
      }, "-=0.6");
    }


    // ScrollTrigger attached separately to timeline
    ScrollTrigger.create({
      trigger: H2Testimonial,
      start: "top 80%",
      end: "top 40%",
      animation: tl,
      toggleActions: "play none none none",
      invalidateOnRefresh: true,
      //markers: true,
    });
    // In case layout shifts (fonts/images load), refresh triggers
    ScrollTrigger.refresh();
  }

  //----------------------------------------------
  // 5.5=> home version Three Final CTA
  // gsap.set buttons/copy first — no flash before tween
  //----------------------------------------------
  const h3Cta = document.querySelector("[data-home-v3-cta]");
  if (h3Cta) {
    const panel = h3Cta.querySelector("[data-cta-panel]");
    const title = h3Cta.querySelector("[data-cta-title]");
    const excerpt = h3Cta.querySelector("[data-cta-excerpt]");
    const buttons = gsap.utils.toArray(h3Cta.querySelectorAll("[data-cta-btn]"));
    const shape = h3Cta.querySelector("[data-cta-shape]");
    const glow = h3Cta.querySelector("[data-cta-glow]");

    gsap.matchMedia().add(
      {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        isMotion: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { reduceMotion } = context.conditions;
        const bits = [panel, title, excerpt, ...buttons, shape, glow].filter(Boolean);

        if (reduceMotion) {
          gsap.set(bits, { clearProps: "all" });
          return;
        }

        if (panel) gsap.set(panel, { y: 40, opacity: 0 });
        if (title) gsap.set(title, { y: 32, opacity: 0, filter: "blur(12px)" });
        if (excerpt) gsap.set(excerpt, { y: 24, opacity: 0, filter: "blur(10px)" });
        if (buttons.length) gsap.set(buttons, { y: 20, opacity: 0, scale: 0.96 });
        if (shape) gsap.set(shape, { opacity: 0, y: 24 });
        if (glow) gsap.set(glow, { opacity: 0 });

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: panel || h3Cta,
            start: "top 80%",
            once: true,
            invalidateOnRefresh: true,
          },
        });

        if (panel) tl.to(panel, { y: 0, opacity: 1, duration: 0.7 }, 0);
        if (glow) tl.to(glow, { opacity: 1, duration: 0.9, ease: "power2.out" }, 0.05);
        if (shape) tl.to(shape, { opacity: 1, y: 0, duration: 0.85 }, 0.08);
        if (title) {
          tl.to(
            title,
            { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.75 },
            0.1
          );
        }
        if (excerpt) {
          tl.to(
            excerpt,
            { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.65 },
            0.22
          );
        }
        if (buttons.length) {
          tl.to(
            buttons,
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.55,
              stagger: 0.1,
              ease: "power2.out",
            },
            0.38
          );
        }

        tl.eventCallback("onComplete", () => {
          gsap.set([title, excerpt].filter(Boolean), { clearProps: "filter" });
        });
      }
    );
  }

  //----------------------------------------------
  // 5.4=> home version Three Testimonial — premium reveal
  // Title centered; nav centered on mobile; cards stagger (inner, not slide).
  //----------------------------------------------
  const h3Testimonial = document.querySelector('[data-container="homeV3-testimonial"]');
  if (h3Testimonial) {
    const subtitle = h3Testimonial.querySelector("[data-subtitle]");
    const title = h3Testimonial.querySelector("[data-title]");
    const excerpt = h3Testimonial.querySelector("[data-excerpt]");
    const nav = h3Testimonial.querySelector("[data-button]");
    const navBtns = nav
      ? gsap.utils.toArray(nav.querySelectorAll(".related-prev, .related-next"))
      : [];
    // Animate card shells — never the .swiper-slide (preserves Swiper transforms)
    const cards = gsap.utils.toArray(
      h3Testimonial.querySelectorAll(".testimonial-trusted-slider .swiper-slide > div")
    );
    const shape = document.querySelector(
      "[data-home-v3-testimonial] .testimonial-shape"
    );

    gsap.matchMedia().add(
      {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        isMotion: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { reduceMotion } = context.conditions;

        if (reduceMotion) {
          gsap.set(
            [subtitle, title, excerpt, nav, ...navBtns, ...cards, shape].filter(Boolean),
            { clearProps: "all" }
          );
          return;
        }

        const easeOut = "power3.out";
        const tl = gsap.timeline({
          defaults: { ease: easeOut },
          scrollTrigger: {
            trigger: h3Testimonial,
            start: "top 78%",
            once: true,
            invalidateOnRefresh: true,
          },
        });

        if (subtitle) {
          gsap.set(subtitle, {
            y: 28,
            opacity: 0,
            filter: "blur(12px)",
            scale: 0.92,
            transformOrigin: "center center",
          });
          tl.to(
            subtitle,
            { y: 0, opacity: 1, filter: "blur(0px)", scale: 1, duration: 0.7 },
            0
          );
        }

        if (title) {
          gsap.set(title, {
            y: 40,
            opacity: 0,
            filter: "blur(14px)",
            transformOrigin: "center center",
          });
          tl.to(
            title,
            { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.85 },
            0.08
          );
        }

        if (excerpt) {
          gsap.set(excerpt, { y: 28, opacity: 0, filter: "blur(10px)" });
          tl.to(
            excerpt,
            { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.7 },
            0.18
          );
        }

        if (navBtns.length) {
          gsap.set(navBtns, { y: 20, opacity: 0, scale: 0.82 });
          tl.to(
            navBtns,
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.55,
              stagger: 0.08,
              ease: "power2.out",
            },
            0.28
          );
        }

        if (cards.length) {
          gsap.set(cards, {
            y: 56,
            opacity: 0,
            filter: "blur(12px)",
            scale: 0.97,
            transformOrigin: "center bottom",
          });
          tl.to(
            cards,
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              scale: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out",
            },
            0.36
          );
        }

        if (shape) {
          gsap.set(shape, { opacity: 0 });
          tl.to(shape, { opacity: 1, duration: 1.1, ease: "power2.out" }, 0.5);
        }

        tl.eventCallback("onComplete", () => {
          gsap.set(
            [subtitle, title, excerpt, ...navBtns, ...cards].filter(Boolean),
            { clearProps: "filter" }
          );
        });
      }
    );
  }

  //----------------------------------------------
  // 5.1=> home version Three Hero animation
  //----------------------------------------------
  const h3HeroSection = document.querySelector('[data-container="homeV3-hero"]');
  if (h3HeroSection) {
    const header = document.querySelector('.header-wrapper');
    const subTitle = h3HeroSection.querySelector('[data-subtitle]');
    const title = h3HeroSection.querySelector('[data-title]');
    const excerpt = h3HeroSection.querySelector('[data-excerpt]');
    const button = h3HeroSection.querySelector('[data-button]');
    const listItems = h3HeroSection.querySelectorAll('[data-list] li');
    const thumbnail = h3HeroSection.querySelector('[data-thumbnail]');

    const tl = gsap.timeline({ paused: true });
    const trailFrom = { x: -100, opacity: 0, filter: "blur(16px)" };
    const trailTo = { x: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "back" };

    if (subTitle) {
      tl.fromTo(subTitle, trailFrom, { ...trailTo, delay: 0.4 }, 0);
    }
    if (title) {
      tl.fromTo(title, trailFrom, { ...trailTo }, "-=0.6");
    }
    if (excerpt) {
      tl.fromTo(excerpt, trailFrom, { ...trailTo }, "-=0.6");
    }
    if (button) {
      tl.fromTo(button, trailFrom, { ...trailTo }, "-=0.6");
    }
    if (listItems.length) {
      listItems.forEach(listItem => {
        tl.fromTo(listItem, trailFrom, { ...trailTo, stagger: 0.05 }, "-=0.6");
      });
    }
    if (thumbnail) {
      tl.fromTo(thumbnail, {
        x: 100, opacity: 0, filter: "blur(16px)"
      }, {
        x: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power3.out",
      }, "-=0.4");
    }
    if (header) {
      tl.fromTo(
        header,
        { y: -100, opacity: 0, filter: "blur(16px)" },
        { y: 0, opacity: 1, duration: 0.6, filter: "blur(0px)", ease: "power3.out" },
        "-=0.8"
      );
    }

    ScrollTrigger.create({
      trigger: h3HeroSection,
      start: "top 80%",
      end: "top 40%",
      animation: tl,
      toggleActions: "play none none none",
      invalidateOnRefresh: true,
    });
    ScrollTrigger.refresh();
  }

}
const p = document.querySelector("#revealStroke");
if (p) {
  gsap.fromTo("#revealStroke",
    { drawSVG: "0% 0%" },
    {
      drawSVG: "0% 100%",
      duration: 2,
      ease: "power2.inOut",
      repeat: -1,
      repeatDelay: 0.4,
      onRepeat: () => {
        // erase line before next loop
        gsap.set("#revealStroke", { drawSVG: "0% 0%" });
      }
    }
  );
}





document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header-area");
  const bodyTarget = document.querySelector(".header-innerHeight .border-container");

  if (!header || !bodyTarget) return;

  const updatePadding = () => {
    bodyTarget.style.paddingTop = `${header.offsetHeight}px`;
  };

  updatePadding();
  window.addEventListener("resize", updatePadding);

  let lastScrollY = window.scrollY;
  let isHidden = false;

  ScrollTrigger.create({
    onUpdate: (self) => {
      const currentScroll = self.scroll();

      // ✅ Add .scrolled class when scrollY > 0
      if (currentScroll > 0) {
        header.classList.add("sticky-header");
      } else {
        header.classList.remove("sticky-header");
      }

      // ✅ Hide on scroll down
      if (currentScroll > lastScrollY && currentScroll > header.offsetHeight) {
        if (!isHidden) {
          gsap.to(header, {
            y: -header.offsetHeight,
            duration: 0.4,
            ease: "power2.inOut"
          });
          isHidden = true;
        }
      }
      // ✅ Show on scroll up
      else if (currentScroll < lastScrollY) {
        if (isHidden) {
          gsap.to(header, {
            y: 0,
            duration: 0.4,
            ease: "power2.out"
          });
          isHidden = false;
        }
      }

      lastScrollY = currentScroll;
    }
  });

  ScrollTrigger.refresh();
});


// light box popup script
document.addEventListener("DOMContentLoaded", () => {
  const preview = document.getElementById("aboutVideoPreview");
  const modal = document.getElementById("videoModal");
  const closeBtn = document.getElementById("closeVideoModal");
  const modalVideo = document.getElementById("modalVideo");

  if (preview) {
    preview.addEventListener("click", () => {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
      modalVideo.play(); // play on open
      document.body.style.overflow = "hidden"; // prevent scroll
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      modalVideo.pause();
      modalVideo.currentTime = 0;
      document.body.style.overflow = ""; // restore scroll
    });
  }

  // close on overlay click
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeBtn.click();
      }
    });
  }
});


/* ===============================
  FORM VALIDATION
  =============================== */
document.addEventListener("DOMContentLoaded", () => {
  /* ===============================
     CONTACT / DEMO FORM VALIDATION
  =============================== */
  const forms = document.querySelectorAll("form[action='#']");

  forms.forEach((currentForm) => {
    const btn = currentForm.querySelector("button[type='submit']");
    const btnText = btn?.querySelector(".btn-text");
    const loader = btn?.querySelector(".loader");
    const message = currentForm.querySelector("#formMessage");

    if (!btn || !message) return; // skip if missing

    // Helper functions
    function showError(el, errorText, customMessage) {
      el.classList.add("border-red-500");
      el.classList.remove("border-green-500");
      if (errorText) {
        errorText.textContent = customMessage || "This field is required.";
        errorText.classList.remove("hidden");
        errorText.style.display = "block";
        errorText.style.opacity = "1";
      }
    }

    function hideError(el, errorText) {
      el.classList.remove("border-red-500");
      el.classList.add("border-green-500");
      if (errorText) {
        errorText.classList.add("hidden");
        errorText.style.display = "none";
        errorText.style.opacity = "0";
      }
    }

    // Real-time validation
    currentForm.querySelectorAll("input[required], textarea[required], select[required]").forEach((el) => {
      el.addEventListener("input", () => {
        const errorText = document.getElementById(`${el.id}-error`);
        if (el.type === "email") {
          const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (validEmail.test(el.value.trim())) hideError(el, errorText);
        } else if (el.tagName === "SELECT") {
          if (el.value.trim()) hideError(el, errorText);
        } else if (el.value.trim()) hideError(el, errorText);
      });

      // Also validate on change for select elements
      if (el.tagName === "SELECT") {
        el.addEventListener("change", () => {
          const errorText = document.getElementById(`${el.id}-error`);
          if (el.value.trim()) hideError(el, errorText);
        });
      }
    });

    // Submit handler
    currentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;
      message.classList.add("hidden");

      currentForm.querySelectorAll("input[required], textarea[required], select[required]").forEach((el) => {
        const errorText = document.getElementById(`${el.id}-error`);
        const value = el.value.trim();

        if (!value) {
          showError(el, errorText);
          valid = false;
        } else if (el.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          showError(el, errorText, "Please enter a valid email address.");
          valid = false;
        } else {
          hideError(el, errorText);
        }
      });

      if (!valid) return;

      // Loading state
      btn.disabled = true;
      if (loader) loader.classList.remove("hidden");
      if (btnText) btnText.textContent = "Sending...";

      // Collect form data
      const formData = {
        fullName: currentForm.querySelector("#name")?.value || "",
        location: currentForm.querySelector("#location-input")?.value || "",
        email: currentForm.querySelector("#email-input")?.value || "",
        phoneNumber: currentForm.querySelector("#phone-number")?.value || "",
        projectName: currentForm.querySelector("#project-name")?.value || "",
        message: currentForm.querySelector("#message")?.value || "",
      };

      // ============================================
      // EMAILJS CONFIGURATION
      // ============================================
      // Step 1: Go to https://www.emailjs.com/ and create a free account
      // Step 2: Create an Email Service (Gmail, Outlook, etc.)
      // Step 3: Create an Email Template with these variables:
      //         {{fullName}}, {{location}}, {{email}}, {{phoneNumber}}, 
      //         {{projectName}}, {{message}}
      // Step 4: Get your Public Key from Account > General
      // Step 5: Replace the values below with your credentials
      // ============================================
      const EMAILJS_SERVICE_ID = "service_t64os5u"; // Replace with your EmailJS Service ID
      const EMAILJS_TEMPLATE_ID = "template_ax7f54q"; // Replace with your EmailJS Template ID
      const EMAILJS_PUBLIC_KEY = "Ajll8wdilsvYz8PPr"; // Replace with your EmailJS Public Key

      // Initialize EmailJS if available
      if (typeof emailjs !== "undefined") {
        // Initialize EmailJS with your public key
        emailjs.init(EMAILJS_PUBLIC_KEY);

        // Send email via EmailJS
        emailjs
          .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formData)
          .then(
            () => {
              // Success
              if (loader) loader.classList.add("hidden");
              btn.disabled = false;
              if (btnText) btnText.textContent = "Send";

              // Success message
              message.textContent = "✅ Message sent successfully! We'll contact you soon.";
              message.className =
                "sm:col-span-2 mt-3 text-center text-sm text-green-400 transition-opacity duration-300";
              message.classList.remove("hidden");

              // Reset form
              currentForm.reset();
              currentForm.querySelectorAll("input, textarea, select").forEach((el) => {
                el.classList.remove("border-green-500", "border-red-500");
              });

              setTimeout(() => message.classList.add("hidden"), 5000);
            },
            (error) => {
              // Error handling
              console.error("EmailJS Error:", error);
              if (loader) loader.classList.add("hidden");
              btn.disabled = false;
              if (btnText) btnText.textContent = "Send";

              message.textContent = "❌ Failed to send. Please try again or contact us directly.";
              message.className =
                "sm:col-span-2 mt-3 text-center text-sm text-red-400 transition-opacity duration-300";
              message.classList.remove("hidden");

              setTimeout(() => message.classList.add("hidden"), 5000);
            }
          );
      } else {
        // Fallback if EmailJS is not loaded
        console.warn("EmailJS is not loaded. Please check the script tag.");
        if (loader) loader.classList.add("hidden");
        btn.disabled = false;
        if (btnText) btnText.textContent = "Send";

        message.textContent = "⚠️ Email service not configured. Please contact support.";
        message.className =
          "sm:col-span-2 mt-3 text-center text-sm text-yellow-400 transition-opacity duration-300";
        message.classList.remove("hidden");

        setTimeout(() => message.classList.add("hidden"), 5000);
      }
    });
  });

  /* ===============================
     PROTECTED PAGE VALIDATION
  =============================== */
  const accessForm = document.getElementById("accessForm");
  const accessInput = document.getElementById("protected-email");
  const accessMsg = document.getElementById("accessMessage");
  const accessBtn = document.getElementById("accessBtn");

  if (accessForm && accessInput && accessBtn && accessMsg) {
    const errorText = document.getElementById(`${accessInput.id}-error`);
    accessForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailValue = accessInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      accessInput.classList.remove("border-green-500", "border-red-500");
      accessMsg.classList.add("hidden");

      if (!emailValue) {
        accessInput.classList.add("border-red-500");
        errorText.textContent = "Email is required.";
        errorText.classList.remove("hidden");
        return;
      } else if (!emailRegex.test(emailValue)) {
        accessInput.classList.add("border-red-500");
        errorText.textContent = "Please enter a valid email address.";
        errorText.classList.remove("hidden");
        return;
      }

      accessInput.classList.add("border-green-500");
      errorText.classList.add("hidden");

      accessBtn.disabled = true;
      accessBtn.textContent = "Verifying...";
      setTimeout(() => {
        accessBtn.disabled = false;
        accessBtn.textContent = "Submit";
        accessMsg.textContent = "✅ Verification email sent!";
        accessMsg.className =
          "mt-3 text-center text-sm text-green-400 transition-opacity duration-300";
        accessForm.reset();
        accessInput.classList.remove("border-green-500");
        setTimeout(() => accessMsg.classList.add("hidden"), 4000);
      }, 1200);
    });

    accessInput.addEventListener("input", () => {
      const value = accessInput.value.trim();
      if (value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        accessInput.classList.remove("border-red-500");
        accessInput.classList.add("border-green-500");
        errorText.classList.add("hidden");
      }
    });
  }
});

/* ===============================
   capabilities-tab-accordion start 
=============================== */
document.addEventListener("DOMContentLoaded", () => {
  const allTabs = document.querySelectorAll(".useCase-card[data-sttr-card]");
  const tabGroups = new Map();

  allTabs.forEach(tab => {
    const parent = tab.parentElement;
    if (!tabGroups.has(parent)) {
      tabGroups.set(parent, []);
    }
    tabGroups.get(parent).push(tab);
  });

  tabGroups.forEach((tabs, tabsWrapper) => {
    const imagesWrapper = tabsWrapper.nextElementSibling;
    if (!imagesWrapper) return;

    const images = imagesWrapper.querySelectorAll("img");
    if (images.length === 0) return;

    // Set up the image container for overlapping images
    imagesWrapper.style.display = "grid";

    images.forEach((img, index) => {
      img.style.gridArea = "1 / 1";
      img.style.transition = "all 0.5s ease-in-out";

      if (index === 0) {
        img.style.opacity = "1";
        img.style.transform = "translateY(0)";
        img.style.zIndex = "2";
        img.style.pointerEvents = "auto";

        // Active tab styling
        tabs[index].classList.remove("border-lineColor/70");
        tabs[index].classList.add("border-tertiary/50");
        tabs[index].classList.add("active");
      } else {
        img.style.opacity = "0";
        img.style.transform = "translateY(15px)";
        img.style.zIndex = "1";
        img.style.pointerEvents = "none";
      }
    });

    tabs.forEach((tab, index) => {
      tab.style.cursor = "pointer";

      tab.addEventListener("click", () => {
        // Reset all tabs
        tabs.forEach(t => {
          t.classList.remove("border-tertiary/50");
          t.classList.add("border-lineColor/70");
          t.classList.remove("active");
        });

        // Set active tab
        tab.classList.add("border-tertiary/50");
        tab.classList.remove("border-lineColor/70");
        tab.classList.add("active");

        // Animate images
        images.forEach((img, i) => {
          if (i === index) {
            img.style.zIndex = "2";
            img.style.opacity = "1";
            img.style.transform = "translateY(0)";
            img.style.pointerEvents = "auto";
          } else {
            img.style.zIndex = "1";
            img.style.opacity = "0";
            img.style.transform = "translateY(35px)";
            img.style.pointerEvents = "none";
          }
        });
      });
    });
  });
});
/* ===============================
   capabilities-tab-accordion end 
=============================== */


/* ===============================
  testimonial-slider start 
=============================== */
if (document.querySelector(".testimonial-trusted-slider")) {
  new Swiper(".testimonial-trusted-slider", {
    slidesPerView: "auto",
    slidesPerGroup: 1,
    spaceBetween: 24,
    speed: 600,
    grabCursor: true,
    watchOverflow: true,
    resistanceRatio: 0.65,
    navigation: {
      nextEl: ".related-next",
      prevEl: ".related-prev",
    },
  });
}
/* ===============================
   testimonial-slider end 
=============================== */
