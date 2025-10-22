document.addEventListener("DOMContentLoaded", function() {
    const adIframe = document.getElementById('ad-placeholder');
    if (!adIframe) {
        return; // No iframe found, do nothing
    }

    // Array of all available ad content
    const allAds = [
        webdevAuthAdContent,
        hubworldAdContent,
        googleDevelopersAdContent
    ];

    // Select a random ad
    const adContent = allAds[Math.floor(Math.random() * allAds.length)];

    const basePath = typeof page_level !== 'undefined' && page_level === 1 ? '../' : './';

    // Adjust the stylesheet path to be relative to the ads folder
    const correctedAdContent = adContent.replace('href="style.css"', `href="${basePath}ads/style.css"`);
    adIframe.srcdoc = correctedAdContent;

    adIframe.onload = function() {
        try {
            const iframeDoc = adIframe.contentDocument || adIframe.contentWindow.document;
            if (!iframeDoc) {
                throw new Error("Cannot access iframe content.");
            }

            // Auto-resize iframe to fit its content
            const adContainer = iframeDoc.querySelector('.ad-container');
            if (adContainer) {
                // Use a small delay to ensure all content (like images) has loaded before calculating height
                setTimeout(() => {
                    adIframe.style.height = adContainer.scrollHeight + 'px';
                }, 100);
            }

            initializeAd(iframeDoc, adIframe);
        } catch (error) {
            console.error('Error initializing ad in iframe:', error);
        }
    };
});

function initializeAd(iframeDoc, adIframe) {
    const adContainer = iframeDoc.querySelector('.ad-container');
    if (!adContainer) return;

    // Close button functionality
    const closeButton = adContainer.querySelector('.ad-close-button');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            adIframe.style.display = 'none';
        });
    }

    // Collapsible "Learn More" functionality
    const collapsibleButton = adContainer.querySelector('.collapsible');
    if (collapsibleButton) {
        collapsibleButton.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            content.classList.toggle('visible'); // Toggle visibility class
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
            // Recalculate iframe height after expanding/collapsing
            setTimeout(() => {
                adIframe.style.height = adContainer.scrollHeight + 'px';
            }, 100);
        });
    }
}
