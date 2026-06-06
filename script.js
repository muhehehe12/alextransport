document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Loading Screen ---
    const loadingScreen = document.getElementById("loading-screen");
    setTimeout(() => {
        loadingScreen.style.opacity = "0";
        setTimeout(() => {
            loadingScreen.style.display = "none";
        }, 500);
    }, 800);

    // --- 2. Mobile Menu Logic ---
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        
        const spans = hamburger.querySelectorAll("span");
        spans[0].style.transform = navLinks.classList.contains("active") ? "rotate(45deg) translate(5px, 5px)" : "none";
        spans[1].style.opacity = navLinks.classList.contains("active") ? "0" : "1";
        spans[2].style.transform = navLinks.classList.contains("active") ? "rotate(-45deg) translate(6px, -5px)" : "none";
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            hamburger.querySelectorAll("span").forEach(s => s.style.transform = "none");
            hamburger.querySelectorAll("span")[1].style.opacity = "1";
        });
    });

    // --- 3. Scroll Reveal Animations ---
    const reveals = document.querySelectorAll(".reveal");
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    reveals.forEach(reveal => revealObserver.observe(reveal));

    // --- 4. Language Translations (RO / EN) ---
    const dictionary = {
        ro: {
            "loading": "Se încarcă...",
            "nav-home": "Acasă",
            "nav-services": "Servicii",
            "nav-features": "Avantaje",
            "nav-contact": "Contact",
            "hero-badge": "11 Ani de Experiență",
            "hero-title": "Mutări și Transport la Standarde Premium",
            "hero-subtitle": "Servicii rapide, sigure și complete de relocare în București, Ilfov și oriunde în țară. Disponibilitate 24/7.",
            "hero-cta": "Sună Acum: 073 750 5154",
            "hero-secondary": "Vezi Serviciile",
            "services-title": "Soluții Complete de Transport",
            "srv-1-title": "Mutări Rezidențiale & Firme",
            "srv-1-desc": "Relocare completă pentru apartamente, case și birouri. Inclusiv protecție mobilier, manipulare pe scări și transport sigur.",
            "srv-2-title": "Transport Marfă & Bagaje",
            "srv-2-desc": "Transport rapid de marfă generală, colete, bagaje și materiale de construcții. Intervenții în aceeași zi.",
            "srv-3-title": "Achiziții din Magazine",
            "srv-3-desc": "Preluare și livrare directă din magazine precum IKEA, Dedeman, JYSK, Hornbach, Leroy Merlin și comenzi OLX.",
            "srv-4-title": "Montaj & Demontaj Mobilier",
            "srv-4-desc": "Echipă pregătită pentru asamblarea și dezasamblarea canapelelor, paturilor, dulapurilor și altor obiecte complexe.",
            "srv-5-title": "Transport Electrocasnice",
            "srv-5-desc": "Manipulare atentă pentru frigidere, mașini de spălat, aragazuri și alte obiecte voluminoase sau grele.",
            "srv-6-title": "Debarasare Mobilă Veche",
            "srv-6-desc": "Eliberăm spațiul eficient. Debarasăm apartamente, case, garaje, boxe și pivnițe de obiectele nedorite.",
            "feat-title": "De ce să ne alegi pe noi?",
            "feat-1-title": "Flotă Spațioasă",
            "feat-1-desc": "Utilizăm autoutilitare Vito Maxi Long (XL/XXL), curate, cu volum mare de încărcare și uși laterale.",
            "feat-2-title": "Transparență Totală",
            "feat-2-desc": "Prețuri corecte care pornesc de la 50 LEI, negociabile în funcție de distanță și volum. Fără taxe ascunse.",
            "feat-3-title": "Acoperire Națională",
            "feat-3-desc": "Operăm zilnic în București (Sectoarele 1-6), întreg județul Ilfov și efectuăm curse regulate în toată țara.",
            "contact-title": "Programează Mutarea Ta Azi",
            "contact-desc": "Suntem disponibili 24/7. Contactează-ne pentru o estimare rapidă și gratuită a costurilor de transport.",
            "contact-name": "Alex",
            "contact-role": "Coordonator Transport",
            "contact-availability": "Disponibil pe apel direct sau WhatsApp pentru oferte personalizate.",
            "footer-rights": "Toate drepturile rezervate."
        },
        en: {
            "loading": "Loading...",
            "nav-home": "Home",
            "nav-services": "Services",
            "nav-features": "Features",
            "nav-contact": "Contact",
            "hero-badge": "11 Years of Experience",
            "hero-title": "Premium Moving & Transport Standards",
            "hero-subtitle": "Fast, safe, and complete relocation services in Bucharest, Ilfov, and nationwide. Available 24/7.",
            "hero-cta": "Call Now: 073 750 5154",
            "hero-secondary": "View Services",
            "services-title": "Complete Transport Solutions",
            "srv-1-title": "Residential & Office Moving",
            "srv-1-desc": "Complete relocation for apartments, houses, and offices. Includes furniture protection, stair handling, and safe transport.",
            "srv-2-title": "Freight & Luggage",
            "srv-2-desc": "Fast transport for general freight, parcels, luggage, and construction materials. Same-day interventions.",
            "srv-3-title": "Store Pickups",
            "srv-3-desc": "Direct pickup and delivery from stores like IKEA, Dedeman, JYSK, Hornbach, Leroy Merlin, and OLX orders.",
            "srv-4-title": "Furniture Assembly",
            "srv-4-desc": "Team ready to assemble and disassemble sofas, beds, wardrobes, and other complex items.",
            "srv-5-title": "Appliance Transport",
            "srv-5-desc": "Careful handling for refrigerators, washing machines, stoves, and other bulky or heavy items.",
            "srv-6-title": "Old Furniture Clearance",
            "srv-6-desc": "We clear space efficiently. Clearing out apartments, houses, garages, storage units, and basements.",
            "feat-title": "Why choose us?",
            "feat-1-title": "Spacious Fleet",
            "feat-1-desc": "We use clean Vito Maxi Long (XL/XXL) vans with large cargo volumes and side loading doors.",
            "feat-2-title": "Total Transparency",
            "feat-2-desc": "Fair prices starting at 50 LEI, negotiable based on distance and volume. No hidden fees.",
            "feat-3-title": "Nationwide Coverage",
            "feat-3-desc": "Operating daily in Bucharest (Sectors 1-6), the entire Ilfov county, and regular trips across the country.",
            "contact-title": "Schedule Your Move Today",
            "contact-desc": "We are available 24/7. Contact us for a fast and free transport cost estimation.",
            "contact-name": "Alex",
            "contact-role": "Transport Coordinator",
            "contact-availability": "Available via direct call or WhatsApp for custom quotes.",
            "footer-rights": "All rights reserved."
        }
    };

    const btnEn = document.getElementById("lang-en");
    const btnRo = document.getElementById("lang-ro");
    const translatableElements = document.querySelectorAll("[data-i18n]");

    const switchLanguage = (lang) => {
        translatableElements.forEach(el => {
            const key = el.getAttribute("data-i18n");
            if (dictionary[lang][key]) {
                el.innerText = dictionary[lang][key];
            }
        });

        if (lang === 'en') {
            btnEn.classList.add("active");
            btnRo.classList.remove("active");
            document.documentElement.lang = "en";
        } else {
            btnRo.classList.add("active");
            btnEn.classList.remove("active");
            document.documentElement.lang = "ro";
        }
    };

    btnEn.addEventListener("click", () => switchLanguage('en'));
    btnRo.addEventListener("click", () => switchLanguage('ro'));
});
