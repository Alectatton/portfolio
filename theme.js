// Simple theme toggle for Bootstrap 5
(function() {
    const html = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    const lightIcon = document.getElementById('theme-icon-light');
    const darkIcon = document.getElementById('theme-icon-dark');

    // Get saved theme or default to light
    function getTheme() {
        return localStorage.getItem('theme') || 'light';
    }

    // Set theme
    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // Update icons
        if (theme === 'dark') {
            lightIcon.classList.remove('d-none');
            darkIcon.classList.add('d-none');
        } else {
            darkIcon.classList.remove('d-none');
            lightIcon.classList.add('d-none');
        }
    }

    // Toggle theme
    function toggleTheme() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    }

    // Initialize
    setTheme(getTheme());

    // Add click handler
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
})();

// Scroll spy for nav pills
(function() {
    const pills = document.querySelectorAll('.nav-pill');
    const sections = [];

    pills.forEach(function(pill) {
        const href = pill.getAttribute('href');
        if (href === '#') {
            sections.push({ pill: pill, el: null });
        } else {
            const el = document.querySelector(href);
            if (el) sections.push({ pill: pill, el: el });
        }
    });

    function update() {
        var active = sections[0];
        for (var i = 1; i < sections.length; i++) {
            if (sections[i].el && sections[i].el.getBoundingClientRect().top <= 120) {
                active = sections[i];
            }
        }
        sections.forEach(function(s) { s.pill.classList.remove('active'); });
        if (active) active.pill.classList.add('active');
    }

    window.addEventListener('scroll', update);
    update();
})();
