document.addEventListener('DOMContentLoaded', () => {
            const reveals = document.querySelectorAll('.reveal');

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Ajoute la classe 'active' pour lancer l'animation CSS
                        entry.target.classList.add('active');
                        // Optionnel : arrêter d'observer une fois animé
                        // observer.unobserve(entry.target); 
                    }
                });
            }, {
                threshold: 0.1, // L'élément s'anime quand 10% de sa hauteur est visible
                rootMargin: "0px 0px -50px 0px"
            });

            reveals.forEach(reveal => {
                observer.observe(reveal);
            });

            // Effet parallax très subtil sur la nébuleuse
            const nebula = document.querySelector('.nebula');
            window.addEventListener('scroll', () => {
                const scrolled = window.scrollY;
                nebula.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.1}px))`;
            });

            // Theme toggle
            const themeToggle = document.getElementById('theme-toggle');
            const themeIcon = document.getElementById('theme-icon');
            const themeText = document.getElementById('theme-text');
            const root = document.documentElement;

            const sunPath = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
            const moonPath = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';

            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'light') {
                root.setAttribute('data-theme', 'light');
                themeIcon.innerHTML = moonPath;
                themeText.textContent = 'Mode Sombre';
            }

            themeToggle.addEventListener('click', () => {
                if (root.getAttribute('data-theme') === 'light') {
                    root.removeAttribute('data-theme');
                    localStorage.setItem('theme', 'dark');
                    themeIcon.innerHTML = sunPath;
                    themeText.textContent = 'Mode Clair';
                } else {
                    root.setAttribute('data-theme', 'light');
                    localStorage.setItem('theme', 'light');
                    themeIcon.innerHTML = moonPath;
                    themeText.textContent = 'Mode Sombre';
                }
            });
        });
