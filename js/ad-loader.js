document.addEventListener("DOMContentLoaded", function() {
    const adPlaceholder = document.getElementById('ad-placeholder');
    if (!adPlaceholder) {
        return; // No placeholder found, do nothing
    }

    // Use root-relative paths for robustness
    const currentPage = window.location.pathname;

    let adPath;
    // Use endsWith for more reliable matching, and check for root path
    if (currentPage.endsWith('index.html') || currentPage.endsWith('about.html') || currentPage === '/') {
        adPath = '/ads/webdev-auth.html';
    } else {
        adPath = '/ads/hubworld.html';
    }

    fetch(adPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch ad: ${response.statusText}`);
            }
            return response.text();
        })
        .then(adHtml => {
            adPlaceholder.innerHTML = adHtml;
            initializeAd(adPlaceholder); // Set up interactivity
            adPlaceholder.classList.add('ad-loaded'); // Signal that the ad is ready
        })
        .catch(error => {
            console.error('Error loading ad:', error);
            adPlaceholder.innerHTML = '<p style="text-align:center; color:red;">Advertisement could not be loaded.</p>';
        });
});

function initializeAd(adPlaceholder) {
    const adContainer = adPlaceholder.querySelector('.ad-container');
    if (!adContainer) return;

    // Close button functionality
    const closeButton = adContainer.querySelector('.ad-close-button');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            adContainer.style.display = 'none';
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
        });
    }
}
