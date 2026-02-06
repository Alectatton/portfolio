// Simple theme toggle for Bootstrap 5
(function() {
    const html = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    const lightIcon = document.getElementById('theme-icon-light');
    const darkIcon = document.getElementById('theme-icon-dark');

    // Get saved theme, or fall back to system preference
    function getTheme() {
        var saved = localStorage.getItem('theme');
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
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

// Copy email to clipboard
(function() {
    var btn = document.getElementById('copy-email');
    var label = document.getElementById('email-label');
    if (!btn) return;

    btn.addEventListener('click', function() {
        var email = btn.getAttribute('data-email');
        navigator.clipboard.writeText(email).then(function() {
            var original = label.textContent;
            label.classList.add('fade-out');
            setTimeout(function() {
                label.textContent = 'Copied!';
                label.classList.remove('fade-out');
            }, 200);
            setTimeout(function() {
                label.classList.add('fade-out');
                setTimeout(function() {
                    label.textContent = original;
                    label.classList.remove('fade-out');
                }, 200);
            }, 1500);
        });
    });
})();

// Live clock (MST)
(function() {
    var clock = document.getElementById('live-clock');
    if (!clock) return;

    function update() {
        var now = new Date().toLocaleTimeString('en-US', {
            timeZone: 'America/Denver',
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
        clock.textContent = now;
    }

    update();
    setInterval(update, 1000);
})();
