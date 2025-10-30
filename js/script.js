/* ========================================
   GLOBAL INITIALIZATION
   ======================================== */
console.log("FastBooks Robles - Sistema cargando...");

// Load Header and Footer
document.addEventListener("DOMContentLoaded", function() {
    loadHeaderAndFooter();
    initializeThemeSwitch();
    initializeWeather();
    initializeMobileMenu();
    initializeScrollEffects();
    initializeContactForm();
    console.log("Sistema cargado completamente");
});

/* ========================================
   LOAD HEADER AND FOOTER
   ======================================== */
function loadHeaderAndFooter() {
    // Load Header
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
            // Re-initialize mobile menu after header is loaded
            initializeMobileMenu();
        })
        .catch(error => console.error('Error loading header:', error));

    // Load Footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
}

/* ========================================
   THEME SWITCH (Dark/Light Mode)
   ======================================== */
function initializeThemeSwitch() {
    console.log("Inicializando modo de tema...");
    
    const themeSwitch = document.getElementById("themeSwitch");
    const body = document.body;

    // Apply saved theme
    if (localStorage.getItem("dark-mode") === "true") {
        body.classList.add("dark-mode");
    }

    if (themeSwitch) {
        themeSwitch.addEventListener("click", () => {
            const isDarkMode = body.classList.toggle("dark-mode");
            localStorage.setItem("dark-mode", isDarkMode);
            console.log("Modo cambiado:", isDarkMode ? "oscuro" : "claro");
        });
    }
    
    console.log("Modo de tema cargado");
}

/* ========================================
   WEATHER WIDGET
   ======================================== */
function initializeWeather() {
    console.log("Cargando widget del clima...");
    
    window.addEventListener('load', () => {
        let lon;
        let lat;

        const temperaturaValor = document.getElementById('temperatura-valor');
        const temperaturaDescripcion = document.getElementById('temperatura-descripcion');
        const ubicacion = document.getElementById('ubicacion');
        const iconoAnimado = document.getElementById('icono-animado');

        if (!temperaturaValor || !temperaturaDescripcion || !ubicacion || !iconoAnimado) {
            console.log("Elementos del clima no encontrados en esta página");
            return;
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                posicion => {
                    lon = posicion.coords.longitude;
                    lat = posicion.coords.latitude;

                    // OpenWeatherMap API
                    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=06b0aa497f5d58b03a71b43a81254e44`;

                    fetch(url)
                        .then(response => response.json())
                        .then(data => {
                            console.log("Datos del clima:", data);
                            
                            const temp = Math.round(data.main.temp);
                            temperaturaValor.textContent = `${temp} °C`;

                            const desc = data.weather[0].description;
                            temperaturaDescripcion.textContent = desc.toUpperCase();
                            ubicacion.textContent = data.name;

                            // Set weather icon
                            switch (data.weather[0].main) {
                                case 'Thunderstorm':
                                    iconoAnimado.src = './assets/weather/thunder.svg';
                                    break;
                                case 'Drizzle':
                                    iconoAnimado.src = './assets/weather/rainy-2.svg';
                                    break;
                                case 'Rain':
                                    iconoAnimado.src = './assets/weather/rainy-7.svg';
                                    break;
                                case 'Snow':
                                    iconoAnimado.src = './assets/weather/snowy-6.svg';
                                    break;
                                case 'Clear':
                                    iconoAnimado.src = './assets/weather/day.svg';
                                    break;
                                case 'Atmosphere':
                                    iconoAnimado.src = './assets/weather/weather.svg';
                                    break;
                                case 'Clouds':
                                    iconoAnimado.src = './assets/weather/cloudy-day-1.svg';
                                    break;
                                default:
                                    iconoAnimado.src = './assets/weather/cloudy-day-1.svg';
                            }
                        })
                        .catch(error => {
                            console.error("Error obteniendo datos del clima:", error);
                        });
                },
                error => {
                    console.error("Error obteniendo geolocalización:", error);
                }
            );
        } else {
            console.log("Geolocalización no disponible");
        }
    });
    
    console.log("Widget del clima cargado");
}

/* ========================================
   MOBILE MENU
   ======================================== */
function initializeMobileMenu() {
    console.log("Inicializando menú móvil...");

    // Use setTimeout to ensure header is loaded
    setTimeout(() => {
        const menuButton = document.querySelector(".link-col-mobile");
        const closeButton = document.querySelector(".close-button p");
        const mobileOverlay = document.querySelector(".mobile-overlay");
        const mobileMenu = document.querySelector(".mobile-menu");

        if (!menuButton || !closeButton || !mobileOverlay || !mobileMenu) {
            console.log("Elementos del menú móvil no encontrados aún");
            return;
        }

        menuButton.addEventListener("click", function() {
            mobileOverlay.classList.add("show");
            mobileMenu.classList.add("show");
            console.log("Menú móvil abierto");
        });

        closeButton.addEventListener("click", function() {
            mobileOverlay.classList.remove("show");
            mobileMenu.classList.remove("show");
            console.log("Menú móvil cerrado");
        });

        // Close menu when clicking outside
        mobileOverlay.addEventListener("click", function(event) {
            if (event.target === mobileOverlay) {
                mobileOverlay.classList.remove("show");
                mobileMenu.classList.remove("show");
                console.log("Menú móvil cerrado (click fuera)");
            }
        });

        console.log("Menú móvil inicializado");
    }, 100);
}

/* ========================================
   SCROLL EFFECTS
   ======================================== */
function initializeScrollEffects() {
    console.log("Inicializando efectos de scroll...");

    // Hide/Show header on scroll
    let prevScroll = window.pageYOffset;
    window.onscroll = () => {
        let curScroll = window.pageYOffset;
        const headerElement = document.getElementsByClassName("header")[0];
        
        if (headerElement) {
            if (prevScroll > curScroll) {
                headerElement.style.top = "0";
            } else {
                headerElement.style.top = "-25vh";
            }
        }
        
        prevScroll = curScroll <= 0 ? 0 : curScroll;
        
        // Check visibility for sections with animations
        checkSectionVisibility();
    };

    // Section visibility animations
    function checkSectionVisibility() {
        const sections = document.querySelectorAll('.hero-section, .about-section, .features-section, .team-section');

        sections.forEach(function(section) {
            const rect = section.getBoundingClientRect();
            const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;
            const isAboveView = rect.bottom < 0;
            const isBelowView = rect.top > window.innerHeight;

            if (isInView) {
                section.classList.add('visible');
                section.classList.remove('hidden');
            }

            if (isAboveView || isBelowView) {
                section.classList.add('hidden');
            }
        });
    }

    // Initial check
    checkSectionVisibility();
    
    console.log("Efectos de scroll cargados");
}

/* ========================================
   CONTACT FORM
   ======================================== */
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) {
        console.log("Formulario de contacto no encontrado en esta página");
        return;
    }

    console.log("Inicializando formulario de contacto...");

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const asunto = document.getElementById('asunto').value;
        const mensaje = document.getElementById('mensaje').value;

        // Simulate form submission
        console.log("Formulario enviado:", {
            nombre,
            email,
            telefono,
            asunto,
            mensaje
        });

        // Show success message
        const formMessage = document.getElementById('formMessage');
        formMessage.textContent = '¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.';
        formMessage.className = 'form-message success';

        // Reset form
        contactForm.reset();

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.className = 'form-message';
            formMessage.textContent = '';
        }, 5000);
    });

    console.log("Formulario de contacto inicializado");
}

/* ========================================
   UTILITY FUNCTIONS
   ======================================== */

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Button click handlers
document.addEventListener('DOMContentLoaded', function() {
    // Handle "COMENZAR" button on home page
    const botonDemo = document.querySelector('.boton-demo');
    if (botonDemo) {
        botonDemo.addEventListener('click', function() {
            console.log("Botón COMENZAR clickeado");
            window.location.href = 'contact.html';
        });
    }
});

console.log("Script principal cargado");
