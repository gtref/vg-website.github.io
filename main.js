document.addEventListener("DOMContentLoaded", function() {
    // Create and append the Bootstrap Icons stylesheet
    const bootstrapIconsLink = document.createElement('link');
    bootstrapIconsLink.rel = 'stylesheet';
    bootstrapIconsLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css';
    document.head.appendChild(bootstrapIconsLink);

    // Determine the base path based on the page's level in the directory structure
    const basePath = typeof page_level !== 'undefined' && page_level === 1 ? '../' : './';

    // Create and append the favicon link
    const faviconLink = document.createElement('link');
    faviconLink.rel = 'icon';
    faviconLink.href = `${basePath}favicon.ico`;
    document.head.appendChild(faviconLink);

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

    // Load header and footer, then set up the theme toggle
    Promise.all([
        fetch(`${basePath}header.html`).then(response => response.text()),
        fetch(`${basePath}footer.html`).then(response => response.text())
    ]).then(([headerData, footerData]) => {
        const headerElement = document.getElementById('header');
        if (headerElement) {
            headerElement.innerHTML = headerData;
            document.body.classList.add('header-loaded');
            // Add basePath to all links in the header
            const headerLinks = headerElement.querySelectorAll('a, md-text-button, md-menu-item');
            headerLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href && !href.startsWith('http')) {
                    link.setAttribute('href', `${basePath}${href}`);
                }
            });
        }

        const footerElement = document.getElementById('footer');
        if (footerElement) {
            footerElement.innerHTML = footerData;
            // Add basePath to all links in the footer
            const footerLinks = footerElement.querySelectorAll('a');
            footerLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href && !href.startsWith('http')) {
                    link.setAttribute('href', `${basePath}${href}`);
                }
            });
        }

        // Menu logic
        const menuButtons = [
            'houses-button',
            'events-button'
        ];

        menuButtons.forEach(buttonId => {
            const button = document.getElementById(buttonId);
            if (button) {
                const menu = button.nextElementSibling;
                if (menu && menu.tagName.toLowerCase() === 'md-menu') {
                    button.addEventListener('click', () => {
                        menu.open = !menu.open;
                    });
                }
            }
        });

        // Contact form logic
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (event) => {
                event.preventDefault();
                console.log('Form submitted!');
                // Here you would typically send the form data to a server
            });
        }

        // Now that the footer is loaded, we can safely add the event listener
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            // Set the toggle to the correct state
            themeToggle.selected = document.body.classList.contains('dark-mode');

            themeToggle.addEventListener('change', () => {
                const newTheme = themeToggle.selected ? 'dark' : 'light';
                setTheme(newTheme);
                localStorage.setItem('theme', newTheme);
            });
        }
    }).catch(error => {
        console.error('Error loading header or footer:', error);
    });

    // Consent Modal Logic
    const consentStatus = sessionStorage.getItem('clarityConsent');

    function showConsentModal() {
        const modalHTML = `
            <md-dialog id="consent-dialog" open>
                <div slot="headline">Privacy Consent</div>
                <div slot="content">
                    We use Microsoft Clarity for security to make sure that BOT's are not using this site. By clicking "Allow", you consent to the collection of usage data. You can learn more in our privacy policy.
                </div>
                <div slot="actions">
                    <md-text-button id="consent-deny">Deny</md-text-button>
                    <md-filled-button id="consent-allow">Allow</md-filled-button>
                </div>
            </md-dialog>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const dialog = document.getElementById('consent-dialog');
        const allowButton = document.getElementById('consent-allow');
        const denyButton = document.getElementById('consent-deny');

        allowButton.addEventListener('click', () => {
            sessionStorage.setItem('clarityConsent', 'granted');
            window.clarity('consentv2', { ad_Storage: "granted", analytics_Storage: "granted" });
            dialog.close();
        });

        denyButton.addEventListener('click', () => {
            sessionStorage.setItem('clarityConsent', 'denied');
            window.clarity('consentv2', { ad_Storage: "denied", analytics_Storage: "denied" });
            dialog.close();
        });
    }

    if (!consentStatus) {
        showConsentModal();
    } else if (consentStatus === 'granted') {
        window.clarity('consentv2', { ad_Storage: "granted", analytics_Storage: "granted" });
    } else if (consentStatus === 'denied') {
        window.clarity('consentv2', { ad_Storage: "denied", analytics_Storage: "denied" });
    }
});

(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "ttb5qp2ru8");
