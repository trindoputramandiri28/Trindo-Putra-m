/* ==========================================================
   SCRIPT.JS
   Trindo Putra Mandiri
   BAGIAN 1
   Loading Screen • Sticky Header • Mobile Menu • Smooth Scroll
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ===========================
       LOADING SCREEN
    =========================== */

    const loading = document.getElementById("loading");

    window.addEventListener("load", () => {

        if (loading) {

            loading.style.opacity = "0";

            loading.style.visibility = "hidden";

            loading.style.transition = "0.5s";

            setTimeout(() => {

                loading.remove();

            }, 500);

        }

    });

    /* ===========================
       STICKY HEADER
    =========================== */

    const header = document.querySelector("header");

    function stickyHeader() {

        if (!header) return;

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    stickyHeader();

    window.addEventListener("scroll", stickyHeader);

    /* ===========================
       MOBILE MENU
    =========================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("active");

            const icon = menuToggle.querySelector("i");

            if (icon) {

                if (navMenu.classList.contains("active")) {

                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-times");

                } else {

                    icon.classList.remove("fa-times");
                    icon.classList.add("fa-bars");

                }

            }

        });

        document.querySelectorAll(".nav-menu a").forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("active");

                const icon = menuToggle.querySelector("i");

                if (icon) {

                    icon.classList.remove("fa-times");
                    icon.classList.add("fa-bars");

                }

            });

        });

    }

    /* ===========================
       SMOOTH SCROLL
    =========================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            e.preventDefault();

            window.scrollTo({

                top: target.offsetTop - 80,

                behavior: "smooth"

            });

        });

    });

});

/* ==========================================================
   SCRIPT.JS
   BAGIAN 2
   Counter • Scroll Animation • Active Menu
========================================================== */

/* ===========================
   COUNTER
=========================== */

const counters = document.querySelectorAll(".counter-number");

const startCounter = (counter) => {

    const target = parseInt(counter.getAttribute("data-target")) || 0;

    let current = 0;

    const speed = Math.max(10, Math.floor(target / 100));

    const updateCounter = () => {

        current += speed;

        if (current >= target) {

            counter.innerText = target + "+";

            return;

        }

        counter.innerText = current;

        requestAnimationFrame(updateCounter);

    };

    updateCounter();

};

const counterSection = document.querySelector(".counter");

if (counterSection && counters.length > 0) {

    let counterStarted = false;

    const counterObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting && !counterStarted) {

                counterStarted = true;

                counters.forEach(counter => startCounter(counter));

            }

        });

    }, {

        threshold: 0.4

    });

    counterObserver.observe(counterSection);

}

/* ===========================
   SCROLL ANIMATION
=========================== */

const animatedElements = document.querySelectorAll(

    ".fade-up, .zoom, .card, .service-card, .feature-card"

);

const animationObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

            animationObserver.unobserve(entry.target);

        }

    });

}, {

    threshold: 0.15

});

animatedElements.forEach(item => {

    animationObserver.observe(item);

});

/* ===========================
   ACTIVE MENU
=========================== */

const sections = document.querySelectorAll("section[id]");

const navLinks = document.querySelectorAll(".nav-menu a");

function activeMenu() {

    const scrollY = window.pageYOffset;

    sections.forEach(section => {

        const sectionHeight = section.offsetHeight;

        const sectionTop = section.offsetTop - 120;

        const sectionId = section.getAttribute("id");

        if (

            scrollY >= sectionTop &&

            scrollY < sectionTop + sectionHeight

        ) {

            navLinks.forEach(link => {

                link.classList.remove("active");

            });

            const activeLink = document.querySelector(

                '.nav-menu a[href="#' + sectionId + '"]'

            );

            if (activeLink) {

                activeLink.classList.add("active");

            }

        }

    });

}

window.addEventListener("scroll", activeMenu);

activeMenu();

/* ==========================================================
   SCRIPT.JS
   BAGIAN 3 (FINAL)
   Floating WhatsApp • Back To Top • Optimasi
========================================================== */

/* ===========================
   FLOATING WHATSAPP
=========================== */

const waToggle = document.querySelector(".wa-toggle");
const waPopup = document.querySelector(".wa-popup");

if (waToggle && waPopup) {

    waToggle.addEventListener("click", function (e) {

        e.stopPropagation();

        waPopup.classList.toggle("active");

    });

    document.addEventListener("click", function (e) {

        if (
            !waPopup.contains(e.target) &&
            !waToggle.contains(e.target)
        ) {
            waPopup.classList.remove("active");
        }

    });

}

/* ===========================
   BACK TO TOP
=========================== */

const backToTop = document.getElementById("backToTop");

function toggleBackToTop() {

    if (!backToTop) return;

    if (window.scrollY > 300) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

}

window.addEventListener("scroll", toggleBackToTop);

toggleBackToTop();

if (backToTop) {

    backToTop.addEventListener("click", function () {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/* ===========================
   LAZY IMAGE EFFECT
=========================== */

const images = document.querySelectorAll("img");

images.forEach(function (img) {

    img.setAttribute("loading", "lazy");

});

/* ===========================
   HOVER BUTTON EFFECT
=========================== */

document.querySelectorAll(".btn").forEach(function (button) {

    button.addEventListener("mouseenter", function () {

        this.style.transform = "translateY(-3px)";

    });

    button.addEventListener("mouseleave", function () {

        this.style.transform = "";

    });

});

/* ===========================
   DISABLE DOUBLE SUBMIT
=========================== */

const bookingForm = document.querySelector(".booking form");

if (bookingForm) {

    bookingForm.addEventListener("submit", function () {

        const submitButton = bookingForm.querySelector("button");

        if (submitButton) {

            submitButton.disabled = true;

            submitButton.innerHTML =
                '<i class="fas fa-spinner fa-spin"></i> Mengirim...';

        }

    });

}

/* ===========================
   COPYRIGHT YEAR OTOMATIS
=========================== */

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}

/* ===========================
   KONSOLE
=========================== */

console.log("%cTrindo Putra Mandiri",
    "color:#0B63CE;font-size:20px;font-weight:bold;");

console.log("Website berhasil dimuat.");

/* ==========================================================
   END OF FILE
========================================================== */