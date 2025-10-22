document.addEventListener("DOMContentLoaded", function() {
    // Create and append the Bootstrap Icons stylesheet
    const bootstrapIconsLink = document.createElement('link');
    bootstrapIconsLink.rel = 'stylesheet';
    bootstrapIconsLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css';
    document.head.appendChild(bootstrapIconsLink);

    // Determine the base path based on the page's level in the directory structure
    const basePath = typeof page_level !== 'undefined' && page_level === 1 ? '../' : './';

    // Function to set the theme based on user preference
    function setTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // If no theme is saved, use the browser's preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
    }

    // Load header and footer, then set up the theme toggle and fix nav links
    Promise.all([
        fetch(`${basePath}header.html`).then(response => response.text()),
        fetch(`${basePath}footer.html`).then(response => response.text())
    ]).then(([headerData, footerData]) => {
        const headerElement = document.getElementById('header');
        if (headerElement) {
            headerElement.innerHTML = headerData;

            // After loading the header, prepend the base path to all nav links
            const navLinks = headerElement.querySelectorAll('nav a');
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                // Only modify relative links, not javascript:void(0)
                if (href && !href.startsWith('javascript')) {
                    link.setAttribute('href', `${basePath}${href}`);
                }
            });
        }

        const footerElement = document.getElementById('footer');
        if (footerElement) {
            footerElement.innerHTML = footerData;
        }

        // Now that the footer is loaded, we can safely add the event listener
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            // Set the toggle to the correct state
            themeToggle.checked = document.body.classList.contains('dark-mode');

            themeToggle.addEventListener('change', () => {
                const newTheme = themeToggle.checked ? 'dark' : 'light';
                setTheme(newTheme);
                localStorage.setItem('theme', newTheme);
            });
        }
    }).catch(error => {
        console.error('Error loading header or footer:', error);
    });
});

(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "ttb5qp2ru8");
