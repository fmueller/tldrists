(function() {

    function applySavedTheme() {
        const theme = localStorage.getItem('colorScheme');
        if (theme === 'dark' || theme === 'light') {
            document.documentElement.setAttribute('data-colorscheme', theme);
        } else {
            document.documentElement.removeAttribute('data-colorscheme');
        }
    }

    window.toggleColorScheme = function() {
        const current = document.documentElement.getAttribute('data-colorscheme');
        if (current === 'dark') {
            document.documentElement.setAttribute('data-colorscheme', 'light');
            localStorage.setItem('colorScheme', 'light');
        } else {
            document.documentElement.setAttribute('data-colorscheme', 'dark');
            localStorage.setItem('colorScheme', 'dark');
        }
    };

    function setupMenuToggle() {
        const menuToggle = document.querySelector('.menu-toggle');
        const menuItems = document.querySelector('.menu-items');

        if (menuToggle && menuItems) {
            menuToggle.addEventListener('click', function() {
                menuItems.classList.toggle('active');
                const isExpanded = menuItems.classList.contains('active');
                menuToggle.setAttribute('aria-expanded', isExpanded);
            });

            // Close the menu when clicking outside
            document.addEventListener('click', function(event) {
                if (!menuToggle.contains(event.target) && !menuItems.contains(event.target)) {
                    menuItems.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }

    applySavedTheme();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupMenuToggle);
    } else {
        setupMenuToggle();
    }
})();
