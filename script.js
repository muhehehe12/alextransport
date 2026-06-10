/* ============================================
   EXPERT TRANSPORT — script.js
   Dynamic Interactive Functions & Smooth UI Animations
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {

    // 1. DISPARIȚIE INTEGRALĂ LOADER (ECRAN ÎNCĂRCARE)
    window.addEventListener("load", () => {
        const loader = document.getElementById("loader");
        if (loader) {
            loader.classList.add("hidden");
        }
    });

    // Fallback de siguranță pentru loader
    setTimeout(() => {
        const loader = document.getElementById("loader");
        if (loader && !loader.classList.contains("hidden")) {
            loader.classList.add("hidden");
        }
    }, 1200);

    // 2. ADĂUGARE CLASĂ SCROLL PE NAVBAR PENTRU EXPERTMUTARI LOOK
    const navbar = document.getElementById("navbar");
    const handleScrollNavbar = () => {
        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    };
    window.addEventListener("scroll", handleScrollNavbar);
    handleScrollNavbar(); // Verificare inițială la încărcare

    // 3. MENIU MOBIL HAMBURGER (DESCHIDERE / ÎNCHIDERE RESPONSIVĂ)
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("open");
            navLinks.classList.toggle("open");

            // Dezactivează scroll-ul pe body când meniul este deschis complet
            if (navLinks.classList.contains("open")) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "";
            }
        });

        // Închidere automată la click pe oricare link nav
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("open");
                navLinks.classList.remove("open");
                document.body.style.overflow = "";
            });
        });
    }

    // 4. ANIMAȚII SMOOTH REVEAL PE SCROLL (INTERSECTION OBSERVER)
    const revealElements = document.querySelectorAll(".reveal, .reveal-right");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target); // Animă o singură dată pentru performanță
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback dacă browserul este vechi și nu suportă IntersectionObserver
        revealElements.forEach(el => el.classList.add("active"));
    }

    // 5. COUNTER ANIMAT PENTRU STATISTICI (CIFRE CAROUSEL)
    const statNumbers = document.querySelectorAll(".stat-num");

    const animateCounters = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute("data-count"), 10);
            if (isNaN(target)) return;

            let count = 0;
            const duration = 2000; // Durata animației în ms
            const increment = target / (duration / 16); // ~60fps

            const updateCount = () => {
                count += increment;
                if (count < target) {
                    stat.innerText = Math.floor(count);
                    requestAnimationFrame(updateCount);
                } else {
                    stat.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Declanșare counter când secțiunea de statistici devine vizibilă
    const statsBar = document.querySelector(".stats-bar");
    if (statsBar && "IntersectionObserver" in window) {
        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        statsObserver.observe(statsBar);
    } else if (statsBar) {
        animateCounters(); // Fallback imediat
    }

    // 6. LOGICĂ SWITCHER DE LIMBĂ INTELIGENT (ROMÂNĂ / ENGLEZĂ)
    const langToggleBtn = document.getElementById("langToggle");
    const langToggleMobileBtn = document.getElementById("langToggleMobile");

    let currentLang = document.documentElement.getAttribute("data-lang") || "ro";

    const updateLanguageDOM = (lang) => {
        document.documentElement.setAttribute("data-lang", lang);
        currentLang = lang;

        // Actualizează textul pe butoanele de toggle
        if (langToggleBtn) langToggleBtn.innerText = lang === "ro" ? "EN" : "RO";
        if (langToggleMobileBtn) langToggleMobileBtn.innerText = lang === "ro" ? "EN" : "RO";

        // Parcurge toate elementele care au atribute traduse
        const translatableElements = document.querySelectorAll("[data-ro], [data-en]");
        translatableElements.forEach(el => {
            const textRo = el.getAttribute("data-ro");
            const textEn = el.getAttribute("data-en");

            if (lang === "ro" && textRo) {
                // Dacă elementul conține tag-uri HTML precum <br> folosește innerHTML
                if (textRo.includes("<br>") || el.tagName === "H1") {
                    el.innerHTML = textRo;
                } else {
                    el.innerText = textRo;
                }
            } else if (lang === "en" && textEn) {
                if (textEn.includes("<br>") || el.tagName === "H1") {
                    el.innerHTML = textEn;
                } else {
                    el.innerText = textEn;
                }
            }
        });
    };

    const toggleLanguage = () => {
        const nextLang = currentLang === "ro" ? "en" : "ro";
        updateLanguageDOM(nextLang);
    };

    if (langToggleBtn) langToggleBtn.addEventListener("click", toggleLanguage);
    if (langToggleMobileBtn) langToggleMobileBtn.addEventListener("click", toggleLanguage);
});
