document.addEventListener("DOMContentLoaded", () => {
  // === Fungsionalitas Sidebar ===
  const sidebar = document.getElementById("sidebar");
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const sidebarClose = document.getElementById("sidebar-close");
  const sidebarOverlay = document.getElementById("sidebar-overlay");

  const openSidebar = (e) => {
    if (e) e.preventDefault();
    if (sidebar && sidebarOverlay) {
      sidebar.classList.add("active");
      sidebarOverlay.classList.add("active");
      document.body.classList.add("body-no-scroll");
    }
  };

  const closeSidebar = () => {
    if (sidebar && sidebarOverlay) {
      sidebar.classList.remove("active");
      sidebarOverlay.classList.remove("active");
      document.body.classList.remove("body-no-scroll");
    }
  };

  if (hamburgerMenu) hamburgerMenu.addEventListener("click", openSidebar);
  if (sidebarClose) sidebarClose.addEventListener("click", closeSidebar);
  if (sidebarOverlay) sidebarOverlay.addEventListener("click", closeSidebar);
  
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebar && sidebar.classList.contains("active")) {
      closeSidebar();
    }
  });

  // === Fungsionalitas Dark/Light Mode ===
  const themeToggleButtons = document.querySelectorAll("#theme-toggle, #sidebar-theme-toggle");
  const htmlElement = document.documentElement;

  const applyTheme = (theme) => {
    htmlElement.setAttribute("data-theme", theme);
    localStorage.setItem("cirebon-theme", theme);
    const isDark = theme === "dark";
    const newText = isDark ? "Light Mode" : "Dark Mode";
    themeToggleButtons.forEach((btn) => {
      if (btn) btn.textContent = newText;
    });
  };

  const savedTheme = localStorage.getItem("cirebon-theme") || "light";
  applyTheme(savedTheme);

  themeToggleButtons.forEach((button) => {
    if (button) {
      button.addEventListener("click", () => {
        const newTheme =
          htmlElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        applyTheme(newTheme);
      });
    }
  });

  // === Animasi Candi (Hanya untuk Halaman Home) ===
  const candiGroup = document.querySelector(".candi-group");
  if (candiGroup) {
    setTimeout(() => {
      candiGroup.classList.add("animate-in");
    }, 500);
  }

  // === Fungsionalitas Accordion/FAQ ===
  const faqQuestions = document.querySelectorAll(".faq-question");
  if (faqQuestions.length > 0) {
    faqQuestions.forEach((button) => {
      button.addEventListener("click", () => {
        const faqItem = button.closest(".faq-item");
        if (faqItem) {
          const isExpanded = faqItem.classList.contains("active");
          button.setAttribute("aria-expanded", !isExpanded);
          faqItem.classList.toggle("active");
        }
      });
    });
  }

// Intersection Observer untuk animasi muncul + stagger delay
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('animate');
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

// Observe judul & setiap souvenir-item
document.querySelectorAll('#oleh-oleh .section-title, #oleh-oleh .souvenir-item')
  .forEach((el, idx) => {
    observer.observe(el);
    // Delay bertahap hanya untuk souvenir-item
    if (el.classList.contains('souvenir-item')) {
      el.style.transitionDelay = `${idx * 0.3}s`;
    }
  });
  
  // === Fungsionalitas Tombol Scroll to Top ===
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  if (scrollToTopBtn) {
    window.addEventListener("scroll", () => {
      const scrollPosition =
        document.body.scrollTop || document.documentElement.scrollTop;
      if (scrollPosition > 300) {
        if (scrollToTopBtn.style.display !== "flex") {
          scrollToTopBtn.style.display = "flex";
        }
        scrollToTopBtn.classList.add("visible");
      } else {
        scrollToTopBtn.classList.remove("visible");
      }
    });

    scrollToTopBtn.addEventListener("transitionend", () => {
      if (!scrollToTopBtn.classList.contains("visible")) {
        scrollToTopBtn.style.display = "none";
      }
    });

    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // === Fungsionalitas Animasi Reveal Saat Scroll ===
  const revealElements = document.querySelectorAll(".reveal");
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  }
});