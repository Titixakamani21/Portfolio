/* ============================================================
   CURSOR GLOW — smooth follow
   ============================================================ */
const glow = document.querySelector(".cursor-glow");
let glowX = 0, glowY = 0, targetX = 0, targetY = 0;

window.addEventListener("mousemove", (e) => {
  targetX = e.clientX;
  targetY = e.clientY;
});

function animateGlow() {
  glowX += (targetX - glowX) * 0.08;
  glowY += (targetY - glowY) * 0.08;
  if (glow) {
    glow.style.left = `${glowX}px`;
    glow.style.top = `${glowY}px`;
  }
  requestAnimationFrame(animateGlow);
}
animateGlow();

/* ============================================================
   SCROLL REVEAL — with stagger support
   ============================================================ */
const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);

reveals.forEach((el) => revealObserver.observe(el));

/* ============================================================
   MAGNETIC BUTTONS
   ============================================================ */
const magnets = document.querySelectorAll(".magnet");

magnets.forEach((el) => {
  el.addEventListener("mousemove", (e) => {
    const box = el.getBoundingClientRect();
    const x = e.clientX - (box.left + box.width / 2);
    const y = e.clientY - (box.top + box.height / 2);
    el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    el.style.transition = "transform 0.15s ease";
  });

  el.addEventListener("mouseleave", () => {
    el.style.transform = "";
    el.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
  });
});

/* ============================================================
   TILT CARDS
   ============================================================ */
const tiltCards = document.querySelectorAll("[data-tilt]");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 4;
    const rotateX = (0.5 - y / rect.height) * 4;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

/* ============================================================
   CASE STUDY TOGGLE
   ============================================================ */
const caseStudyGrid = document.querySelector("#case-study-grid");
const caseStudyToggle = document.querySelector("#case-study-toggle");

if (caseStudyGrid && caseStudyToggle) {
  caseStudyToggle.addEventListener("click", () => {
    const expanded = caseStudyGrid.classList.toggle("expanded");
    caseStudyToggle.textContent = expanded ? "See Less" : "See All";
    caseStudyToggle.setAttribute("aria-expanded", String(expanded));
  });
}

/* ============================================================
   HEADER SCROLL EFFECT
   ============================================================ */
const header = document.querySelector(".site-header");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;
  if (header) {
    if (currentScroll > 80) {
      header.style.borderColor = "rgba(107, 76, 59, 0.18)";
      header.style.boxShadow = "0 8px 32px rgba(61, 43, 31, 0.08)";
    } else {
      header.style.borderColor = "";
      header.style.boxShadow = "";
    }
  }
  lastScroll = currentScroll;
}, { passive: true });

/* ============================================================
   PARALLAX DECORATIVE ELEMENTS
   ============================================================ */
const decoCircle1 = document.querySelector(".deco-circle-1");
const decoCircle2 = document.querySelector(".deco-circle-2");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  if (decoCircle1) {
    decoCircle1.style.transform = `translateY(${scrollY * 0.04}px)`;
  }
  if (decoCircle2) {
    decoCircle2.style.transform = `translateY(${scrollY * -0.03}px)`;
  }
}, { passive: true });

/* ============================================================
   CONTACT FORM HANDLER
   ============================================================ */
const contactSendBtn = document.querySelector("#contact-send-btn");

if (contactSendBtn) {
  contactSendBtn.addEventListener("click", () => {
    const name = document.querySelector("#contact-name").value.trim();
    const email = document.querySelector("#contact-email").value.trim();
    const message = document.querySelector("#contact-message").value.trim();

    if (!name || !email) {
      alert("Please fill in your name and email.");
      return;
    }

    const subject = encodeURIComponent("New enquiry from " + name);
    const body = encodeURIComponent(
      "Name: " + name + "\nEmail: " + email + "\n\n" + message
    );

    window.location.href =
      "mailto:titixakamani21@gmail.com?subject=" + subject + "&body=" + body;
  });
}