document.addEventListener("DOMContentLoaded", function() {
    const adPlaceholder = document.getElementById('ad-placeholder');
    if (!adPlaceholder) {
        return; // No placeholder found, do nothing
    }

    const basePath = typeof page_level !== 'undefined' && page_level === 1 ? '../' : './';
    const currentPage = window.location.pathname.split('/').pop();

    let adPath;
    if (currentPage === 'index.html' || currentPage === 'about.html' || currentPage === '') {
        adPath = `${basePath}ads/webdev-auth.html`;
    } else {
        adPath = `${basePath}ads/hubworld.html`;
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
            adPlaceholder.classList.add('ad-loaded'); // Signal that the ad is ready
        })
        .catch(error => {
            console.error('Error loading ad:', error);
            adPlaceholder.innerHTML = '<p style="text-align:center; color:red;">Advertisement could not be loaded.</p>';
        });
});
