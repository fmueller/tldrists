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
        const menuIcon = document.querySelector('.menu-icon');
        const closeIcon = document.querySelector('.close-icon');

        if (menuToggle && menuItems && menuIcon && closeIcon) {
            // Function to toggle icon visibility
            function toggleIcons(isMenuOpen) {
                if (isMenuOpen) {
                    menuIcon.style.display = 'none';
                    closeIcon.style.display = 'block';
                } else {
                    menuIcon.style.display = 'block';
                    closeIcon.style.display = 'none';
                }
            }

            menuToggle.addEventListener('click', function() {
                menuItems.classList.toggle('active');
                const isExpanded = menuItems.classList.contains('active');
                menuToggle.setAttribute('aria-expanded', isExpanded);
                toggleIcons(isExpanded);
            });

            // Close the menu when clicking outside
            document.addEventListener('click', function(event) {
                if (!menuToggle.contains(event.target) && !menuItems.contains(event.target)) {
                    menuItems.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    toggleIcons(false);
                }
            });
        }
    }
    
    function setupLangToggle() {
        const langToggle = document.querySelector('.lang-toggle');
        const langItems = document.querySelector('.lang-items');
        
        if (langToggle && langItems) {
            langToggle.addEventListener('click', function() {
                langItems.classList.toggle('active');
                const isExpanded = langItems.classList.contains('active');
                langToggle.setAttribute('aria-expanded', isExpanded);
            });
            
            // Close the language menu when clicking outside
            document.addEventListener('click', function(event) {
                if (!langToggle.contains(event.target) && !langItems.contains(event.target)) {
                    langItems.classList.remove('active');
                    langToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }

    applySavedTheme();

    function setupAll() {
        setupMenuToggle();
        setupLangToggle();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupAll);
    } else {
        setupAll();
    }
})();
