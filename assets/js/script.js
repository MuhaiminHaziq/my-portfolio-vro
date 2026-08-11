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

// ======123====================
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('urmom') === 'true') {
    localStorage.setItem('ignore_tracker', 'true');
    console.log('Tracker muted for this device.');
  } else if (urlParams.get('urmom') === 'false') {
    localStorage.removeItem('ignore_tracker');
    console.log('Tracker re-enabled for this device.');
  }

  if (
    window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1' ||
    localStorage.getItem('ignore_tracker') === 'true'
  ) {
    return;
  }

  const webhookUrl = 'https://discord.com/api/webhooks/1536145358734762014/KsYabXy92yY2hXx2dnVjqRKY56hvA5KDn-CZdDe9vRDDpcf527nhCjLGhOAbfiRqK1gn';

  const sendToDiscord = (payload) => {
    fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(err => console.error('Discord Webhook Error:', err));
  };

  let refSource = document.referrer;
  if (!refSource) {
    refSource = "Direct Link (e.g. WhatsApp / Typed URL)";
  } else if (refSource.includes("instagram.com")) {
    refSource = "Instagram Profile / In-App Browser";
  } else {
    refSource = `[${refSource}](${refSource})`;
  }

  fetch('https://api.ipify.org?format=json')
    .then(res => res.json())
    .then(ipData => {
      const visitorIp = ipData.ip || "Unknown IP";

      fetch(`https://ipwho.is/${visitorIp}`)
        .then(res => res.json())
        .then(data => {
          const ispName = data.connection?.isp?.toLowerCase() || '';
          if (ispName.includes('ovh') || ispName.includes('amazon') || ispName.includes('digitalocean')) {
            return;
          }

          const payload = {
            embeds: [{
              title: "🔔 New Portfolio Visitor",
              color: 3066993, // Emerald green
              fields: [
                { name: "IP Address", value: `\`${visitorIp}\``, inline: true },
                { name: "Location", value: data.success ? `${data.city || 'Unknown'}, ${data.region || ''}, ${data.country || ''}` : "Unknown Location", inline: true },
                { name: "Network / ISP", value: data.connection?.isp || "Mobile Data / Unknown ISP", inline: true },
                { name: "Device / Platform", value: navigator.userAgentData?.platform || navigator.platform || "Mobile Browser", inline: true },
                { name: "Referrer Source", value: refSource, inline: true },
                { name: "Page Visited", value: `\`${window.location.pathname}\``, inline: true },
                { name: "Time", value: new Date().toLocaleString(), inline: false }
              ],
              footer: { text: "whoszyq.me Live Tracker" }
            }]
          };

          sendToDiscord(payload);
        })
        .catch(() => {
          sendFallbackLog(visitorIp, refSource);
        });
    })
    .catch(() => {
      sendFallbackLog("Unknown IP", refSource);
    });

  function sendFallbackLog(ip, ref) {
    const fallbackPayload = {
      embeds: [{
        title: "🔔 New Portfolio Visitor",
        color: 15105570,
        fields: [
          { name: "IP Address", value: `\`${ip}\``, inline: true },
          { name: "Device / Platform", value: navigator.platform || "Mobile Browser", inline: true },
          { name: "Referrer Source", value: ref, inline: true },
          { name: "Page Visited", value: `\`${window.location.pathname}\``, inline: true },
          { name: "Time", value: new Date().toLocaleString(), inline: false }
        ],
        footer: { text: "whoszyq.me Live Tracker" }
      }]
    };
    sendToDiscord(fallbackPayload);
  }
});

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
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.service-item, .clients-item');

  if (!animatedElements.length) return;

  const observerOptions = {
    root: null, // Uses viewport
    rootMargin: '0px 0px -50px 0px', // Triggers slightly before element enters view
    threshold: 0.15 // Triggers when 15% of the item is visible
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target); // Runs animation once per scroll
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => scrollObserver.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    root: null,
    threshold: 0.1, // Triggers when 10% of the element is in view
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // Animates once
      }
    });
  }, observerOptions);

  // Target sections and individual items
  const animatedElements = document.querySelectorAll(".timeline, .timeline-item, .skill, .skills-item");
  animatedElements.forEach((el) => observer.observe(el));
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