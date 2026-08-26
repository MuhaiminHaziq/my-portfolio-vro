'use strict';

// Developer Console Signature (Placed at the very top so it always executes)
console.log(
  "%c Designed & Developed by Muhaimin Haziq %c https://whoszyq.me ",
  "background: #0f172a; color: #22c55e; font-weight: bold; padding: 6px 10px; border-radius: 4px 0 0 4px; font-family: monospace;",
  "background: #1e293b; color: #f8fafc; padding: 6px 10px; border-radius: 0 4px 4px 0; font-family: monospace;"
);

// element toggle function
const elementToggleFunc = function (elem) { elem?.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn?.addEventListener("click", function () { elementToggleFunc(sidebar); });

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer?.classList.toggle("active");
  overlay?.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    if (modalImg) {
      modalImg.src = this.querySelector("[data-testimonials-avatar]")?.src || "";
      modalImg.alt = this.querySelector("[data-testimonials-avatar]")?.alt || "";
    }
    if (modalTitle) modalTitle.innerHTML = this.querySelector("[data-testimonials-title]")?.innerHTML || "";
    if (modalText) modalText.innerHTML = this.querySelector("[data-testimonials-text]")?.innerHTML || "";

    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn?.addEventListener("click", testimonialsModalFunc);
overlay?.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select?.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn?.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form && form.checkValidity()) {
      formBtn?.removeAttribute("disabled");
    } else {
      formBtn?.setAttribute("disabled", "");
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase().trim() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        if (navigationLinks[j]) navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        if (navigationLinks[j]) navigationLinks[j].classList.remove("active");
      }
    }
  });
}

////////

// ==================== DYNAMIC NAVBAR INJECTOR ====================
document.addEventListener('DOMContentLoaded', () => {
  const navPlaceholder = document.getElementById('navbar-placeholder');

  if (navPlaceholder) {
    fetch('navbar.html')
      .then(response => {
        if (!response.ok) throw new Error('Failed to load navbar');
        return response.text();
      })
      .then(htmlContent => {
        // Inject the single navbar HTML
        navPlaceholder.innerHTML = htmlContent;

        // Automatically set active class based on current URL path
        let currentPath = window.location.pathname.split('/').pop();
        if (!currentPath || currentPath === '') currentPath = 'index.html';

        const navLinks = navPlaceholder.querySelectorAll('.navbar-link');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === currentPath) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      })
      .catch(error => console.error('Navbar injection error:', error));
  }
});

// ==================== DYNAMIC SIDEBAR INJECTOR (.html) ====================
document.addEventListener('DOMContentLoaded', () => {
  const sidebarPlaceholder = document.getElementById('sidebar-placeholder');

  if (sidebarPlaceholder) {
    fetch('sidebar.html')
      .then(response => {
        if (!response.ok) throw new Error('Failed to load sidebar.html');
        return response.text();
      })
      .then(htmlContent => {
        sidebarPlaceholder.innerHTML = htmlContent;

        // Re-attach sidebar toggle listener for mobile devices after fetch
        const sidebar = document.querySelector('[data-sidebar]');
        const sidebarBtn = document.querySelector('[data-sidebar-btn]');

        if (sidebar && sidebarBtn) {
          sidebarBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
          });
        }
      })
      .catch(error => console.error('Sidebar injection error:', error));
  }
});
document.addEventListener('DOMContentLoaded', async () => {
  // 1. Device Mute Toggle Handler (?urmom=true / false)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('urmom') === 'true') {
    localStorage.setItem('ignore_message', 'true');
    console.log('off');
  } else if (urlParams.get('urmom') === 'false') {
    localStorage.removeItem('ignore_message');
    console.log('on');
  }

  // 2. Safety & Localhost Filters
  if (
    window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1' ||
    localStorage.getItem('ignore_message') === 'true'
  ) {
    return;
  }

  const relay = 'https://yellow-breeze-fa0c.muhaiminhaziq25.workers.dev';

  const sendToDiscord = (payload) => {
    fetch(relay, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(err => console.error('Telemetry Error:', err));
  };

  // 3. Device Brand & Hardware Model Identifier
  async function getDeviceBrandInfo() {
    const ua = navigator.userAgent || '';

    // Check User-Agent Client Hints (Modern Android & Chromium)
    if (navigator.userAgentData && navigator.userAgentData.getHighEntropyValues) {
      try {
        const hints = await navigator.userAgentData.getHighEntropyValues(['model', 'platform', 'platformVersion']);
        if (hints.model) {
          let brand = 'Android';
          if (/SM-|SAMSUNG/i.test(hints.model)) brand = 'Samsung';
          else if (/Pixel/i.test(hints.model)) brand = 'Google Pixel';
          else if (/Xiaomi|Redmi|POCO/i.test(hints.model)) brand = 'Xiaomi';
          else if (/CPH|OPPO/i.test(hints.model)) brand = 'OPPO';
          else if (/RMX/i.test(hints.model)) brand = 'Realme';
          else if (/V2|vivo/i.test(hints.model)) brand = 'Vivo';
          else if (/ONEPLUS/i.test(hints.model)) brand = 'OnePlus';
          else if (/HWI-|VOG-|ELE-|POT-/i.test(hints.model)) brand = 'Huawei';
          return `${brand} (${hints.model})`;
        }
      } catch (e) {
        // Fallback to User-Agent parsing if permissions fail
      }
    }

    // Apple Devices (iOS / iPadOS)
    if (/iPhone/i.test(ua)) {
      const ratio = window.devicePixelRatio || 1;
      const w = window.screen.width;
      const h = window.screen.height;
      return `Apple iPhone (${w}x${h} @${ratio}x)`;
    }
    if (/iPad/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
      return 'Apple iPad';
    }

    // Android User-Agent Parsing (Legacy / Fallback)
    const androidMatch = ua.match(/Android\s+[\d\.]+;\s+([^;]+)\s+Build/i);
    if (androidMatch && androidMatch[1]) {
      const model = androidMatch[1].trim();
      let brand = 'Android';
      if (/SM-|SAMSUNG/i.test(model)) brand = 'Samsung';
      else if (/Pixel/i.test(model)) brand = 'Google Pixel';
      else if (/Redmi|Mi |POCO/i.test(model)) brand = 'Xiaomi';
      else if (/CPH|OPPO/i.test(model)) brand = 'OPPO';
      else if (/RMX/i.test(model)) brand = 'Realme';
      else if (/V2/i.test(model)) brand = 'Vivo';
      else if (/HUAWEI|HONOR/i.test(model)) brand = 'Huawei / Honor';
      return `${brand} (${model})`;
    }

    // Desktop Platforms
    if (/Windows NT/i.test(ua)) return 'Windows PC';
    if (/Macintosh/i.test(ua)) return 'Apple Mac';
    if (/Linux/i.test(ua)) return 'Linux Machine';

    return navigator.platform || 'Unknown Device';
  }

  const deviceBrand = await getDeviceBrandInfo();

  // 4. App Source & In-App Browser Sniffer
  const ua = navigator.userAgent || '';
  let inAppSource = 'Standard Browser';
  if (ua.includes('Instagram')) inAppSource = 'Instagram In-App';
  else if (ua.includes('LinkedInApp')) inAppSource = 'LinkedIn In-App';
  else if (ua.includes('WhatsApp')) inAppSource = 'WhatsApp Webview';
  else if (ua.includes('FBAN') || ua.includes('FBAV')) inAppSource = 'Facebook In-App';
  else if (ua.includes('musical_ly') || ua.includes('ByteLocale') || ua.includes('TikTok')) inAppSource = 'TikTok In-App';
  else if (ua.includes('Discord')) inAppSource = 'Discord Webview';

  // 5. Referrer Source & Campaign Tagging
  let refSource = document.referrer;
  if (!refSource) {
    refSource = 'Direct Link (e.g. WhatsApp / Typed URL)';
  } else if (refSource.includes('instagram.com')) {
    refSource = 'Instagram Profile / In-App Link';
  } else if (refSource.includes('linkedin.com')) {
    refSource = 'LinkedIn Feed / Profile';
  } else if (refSource.includes('github.com')) {
    refSource = 'GitHub Profile / Repo';
  } else {
    refSource = `[${refSource}](${refSource})`;
  }

  const campaign = urlParams.get('utm_source') || urlParams.get('ref') || urlParams.get('src') || 'None';

  // 6. Visitor Frequency Tracker
  let visitCount = parseInt(localStorage.getItem('site_visit_count') || '0', 10) + 1;
  localStorage.setItem('site_visit_count', visitCount.toString());
  const visitorType = visitCount === 1 ? 'First-Time Visitor' : `Returning (Visit #${visitCount})`;

  // 7. Screen & Form Factor Classification
  const screenW = window.screen.width;
  const screenH = window.screen.height;
  const minDimension = Math.min(screenW, screenH);
  const maxDimension = Math.max(screenW, screenH);
  const isTouch = navigator.maxTouchPoints > 0;

  let deviceFormFactor = "Desktop Monitor";
  if (minDimension < 500 && isTouch) {
    deviceFormFactor = "Smartphone";
  } else if (minDimension >= 500 && maxDimension <= 1024 && isTouch) {
    deviceFormFactor = "Tablet / iPad";
  } else if (screenW >= 1024 && screenW <= 1440 && !isTouch) {
    deviceFormFactor = "Laptop / Small Screen";
  } else if (screenW > 1440 && screenW <= 1920) {
    deviceFormFactor = "Desktop (Full HD)";
  } else if (screenW > 1920) {
    deviceFormFactor = "Ultra-Wide / 4K Monitor";
  } else if (isTouch) {
    deviceFormFactor = "Touch Device / Foldable";
  }

  const screenMetrics = `${deviceFormFactor}\n${screenW}x${screenH} (Viewport: ${window.innerWidth}x${window.innerHeight})`;

  // 8. Hardware, Theme & Network Specs
  const cpuCores = navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency} Cores` : 'Unknown Cores';
  const ramEstimate = navigator.deviceMemory ? `~${navigator.deviceMemory} GB RAM` : 'Unknown RAM';
  const deviceHardware = `${cpuCores} | ${ramEstimate}`;
  const themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'Dark Mode' : 'Light Mode';
  const userLang = `${navigator.language || 'Unknown'} (${Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown TZ'})`;

  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const connSpeed = conn ? `${conn.effectiveType?.toUpperCase() || 'Network'} (~${conn.downlink || '?'} Mbps)` : 'Standard Connection';

  // 9. Fetch IP & Geolocation
  fetch('https://api.ipify.org?format=json')
    .then(res => res.json())
    .then(ipData => {
      const visitorIp = ipData.ip || 'Unknown IP';

      fetch(`https://ipwho.is/${visitorIp}`)
        .then(res => res.json())
        .then(data => {
          const ispName = data.connection?.isp?.toLowerCase() || '';
          if (ispName.includes('ovh') || ispName.includes('amazon') || ispName.includes('digitalocean')) {
            return;
          }

          const payload = {
            embeds: [{
              title: "New Portfolio Visitor",
              color: 3066993, // Emerald green
              fields: [
                { name: "IP Address", value: `\`${visitorIp}\``, inline: true },
                { name: "Location", value: data.success ? `${data.city || 'Unknown'}, ${data.region || ''}, ${data.country || ''}` : "Unknown Location", inline: true },
                { name: "Network / ISP", value: `${data.connection?.isp || 'Unknown ISP'} (${connSpeed})`, inline: true },
                { name: "Device Brand / Model", value: deviceBrand, inline: true },
                { name: "Browser & App", value: inAppSource, inline: true },
                { name: "Hardware Specs", value: deviceHardware, inline: true },
                { name: "Display / Form Factor", value: screenMetrics, inline: true },
                { name: "Referrer Source", value: refSource, inline: true },
                { name: "Campaign / Tag", value: `\`${campaign}\``, inline: true },
                { name: "Visitor Frequency", value: visitorType, inline: true },
                { name: "Locale & Theme", value: `${userLang} | ${themeMode}`, inline: true },
                { name: "Page Visited", value: `\`${window.location.pathname}\``, inline: true },
                { name: "Timestamp", value: new Date().toLocaleString(), inline: true }
              ],
            }]
          };

          sendToDiscord(payload);
        })
        .catch(() => {
          sendFallbackLog(visitorIp);
        });
    })
    .catch(() => {
      sendFallbackLog('Unknown IP');
    });

  function sendFallbackLog(ip) {
    const fallbackPayload = {
      embeds: [{
        title: "⚠️ New Portfolio Visitor (Fallback)",
        color: 15105570, // Orange
        fields: [
          { name: "IP Address", value: `\`${ip}\``, inline: true },
          { name: "Device Brand / Model", value: deviceBrand, inline: true },
          { name: "Browser & App", value: inAppSource, inline: true },
          { name: "Hardware Specs", value: deviceHardware, inline: true },
          { name: "Display / Form Factor", value: screenMetrics, inline: true },
          { name: "Referrer Source", value: refSource, inline: true },
          { name: "Campaign / Tag", value: `\`${campaign}\``, inline: true },
          { name: "Visitor Frequency", value: visitorType, inline: true },
          { name: "Locale & Theme", value: `${userLang} | ${themeMode}`, inline: true },
          { name: "Page Visited", value: `\`${window.location.pathname}\``, inline: true },
          { name: "Timestamp", value: new Date().toLocaleString(), inline: true }
        ],
      }]
    };
    sendToDiscord(fallbackPayload);
  }
});

// ==================== DYNAMIC FOOTER INJECTOR (.html) ====================
document.addEventListener('DOMContentLoaded', () => {
  const footerPlaceholder = document.getElementById('footer-placeholder');

  if (footerPlaceholder) {
    fetch('footer.html')
      .then(response => {
        if (!response.ok) throw new Error('Failed to load footer.html');
        return response.text();
      })
      .then(htmlContent => {
        footerPlaceholder.innerHTML = htmlContent;
      })
      .catch(error => console.error('Footer injection error:', error));
  }
});

// ==================== LIGHTBOX IMAGE PREVIEW ====================
// ==================== GLOBAL LIGHTBOX IMAGE PREVIEW ====================
document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  if (!lightbox) return;

  // Open modal when clicking any image in Dev Dump, Gallery, or Blog cards
  document.addEventListener('click', (e) => {
    const imgTarget = e.target.closest('.dump-img-box img, .gallery-card img, .gallery-item img, .journey-gallery img');
    
    if (imgTarget) {
      lightboxImg.src = imgTarget.src;
      
      // Check for <figcaption> text first; fall back to alt text if not found
      const figureParent = imgTarget.closest('figure, li');
      const figCaption = figureParent ? figureParent.querySelector('figcaption') : null;
      
      lightboxCaption.textContent = figCaption ? figCaption.textContent : (imgTarget.alt || '');
      lightbox.style.display = 'flex';
    }
  });

  // Close modal function
  const closeLightbox = () => {
    lightbox.style.display = 'none';
  };

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

  // Close on tapping dark overlay background
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Close on pressing 'Escape'
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.style.display === 'flex') {
      closeLightbox();
    }
  });
});

// ==================== SCROLL-REVEAL ANIMATIONS ====================
// ==================== UNIFIED SCROLL-REVEAL ANIMATION ====================
document.addEventListener("DOMContentLoaded", () => {
  // Selector targets all animatable elements across Resume, CTF/Events, Dev Dump, and About pages
  const animatedElements = document.querySelectorAll(
    ".timeline, .timeline-item, .skill, .skills-item, .service-item, .clients-item, .blog-post-item, .dump-card"
  );

  if (!animatedElements.length) return;

  const observerOptions = {
    root: null, // Uses viewport
    rootMargin: "0px 0px -40px 0px", // Triggers slightly before element comes fully into view
    threshold: 0.1, // Triggers when 10% of element is visible
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // Runs animation once per scroll
      }
    });
  }, observerOptions);

  animatedElements.forEach((el) => scrollObserver.observe(el));
});

document.addEventListener('DOMContentLoaded', () => {
  const blogGridView = document.getElementById('blog-grid-view');
  const blogDetailView = document.getElementById('blog-detail-view');
  const backBtn = document.getElementById('back-to-blogs');
  const blogCards = document.querySelectorAll('.blog-post-card');

  // ONLY attach single-page interception if #blog-detail-view exists on the page.
  // If #blog-detail-view is missing, standard links (e.g., href="blog1.html") open normally.
  if (blogDetailView && blogGridView) {
    blogCards.forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();

        const title = card.querySelector('.blog-item-title')?.textContent || '';
        const category = card.querySelector('.blog-category')?.textContent || '';
        const date = card.querySelector('time')?.textContent || '';

        const dTitle = document.getElementById('detail-title');
        const dCategory = document.getElementById('detail-category');
        const dDate = document.getElementById('detail-date');

        if (dTitle) dTitle.textContent = title;
        if (dCategory) dCategory.textContent = category;
        if (dDate) dDate.textContent = date;

        blogGridView.style.display = 'none';
        blogDetailView.style.display = 'block';

        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    // Back to Blog List View
    backBtn?.addEventListener('click', () => {
      blogDetailView.style.display = 'none';
      blogGridView.style.display = 'block';
    });
  }
});

const beaconScript = document.createElement('script');
beaconScript.type = 'module';
beaconScript.src = 'https://static.cloudflareinsights.com/beacon.min.js';
beaconScript.setAttribute('data-cf-beacon', JSON.stringify({ token: "2e47a7fe363c491899188ec0f12698ee" }));
document.body.appendChild(beaconScript);