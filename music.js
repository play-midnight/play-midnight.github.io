document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'music.html') {
        if (isLoggedIn !== 'true') {
            window.location.href = 'index.html';
        }
    }
    
    // Music search functionality
    const searchInput = document.getElementById('musicSearchInput');
    const searchButton = document.getElementById('musicSearchBtn');
    
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            performSearch();
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            // Create YouTube search URL
            const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
            // Open in new tab
            window.open(youtubeSearchUrl, '_blank');
            
            // Optional: Clear the search input after searching
            // searchInput.value = '';
        }
    }
    
    // Genre tag click handlers
    const genreTags = document.querySelectorAll('.genre-tag');
    if (genreTags.length > 0) {
        genreTags.forEach(tag => {
            tag.addEventListener('click', function() {
                const genre = this.getAttribute('data-genre');
                if (genre) {
                    searchInput.value = genre;
                    performSearch();
                }
            });
        });
    }
    
    // Playlist card click handlers
    const playlistCards = document.querySelectorAll('.playlist-card');
    if (playlistCards.length > 0) {
        playlistCards.forEach(card => {
            card.addEventListener('click', function() {
                const playlist = this.getAttribute('data-playlist');
                if (playlist) {
                    searchInput.value = playlist;
                    performSearch();
                }
            });
        });
    }
    
    // Add animation to elements
    const elements = document.querySelectorAll('.music-header, .music-search-container, .genre-tag, .playlist-card');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.5s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 + (index * 30));
    });
    
    // Add hover effects to elements
    const hoverElements = document.querySelectorAll('.genre-tag, .playlist-card');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = this.classList.contains('playlist-card') ? 'translateY(-5px)' : 'translateY(-3px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});
