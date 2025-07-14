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

    applySavedTheme();
})();
