// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const currentPage = window.location.pathname.split('/').pop();
    
    // Redirect logic
    if (currentPage === 'index.html' || currentPage === '') {
        if (isLoggedIn === 'true') {
            window.location.href = 'home.html';
        }
    } else if (currentPage === 'home.html' || currentPage === 'games.html') {
        if (isLoggedIn !== 'true') {
            window.location.href = 'index.html';
        }
    }
    
    // Login form handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('errorMessage');
            const loginBox = document.querySelector('.login-box');
            
            if (password === 'midnight') {
                errorMessage.textContent = '';
                sessionStorage.setItem('isLoggedIn', 'true');
                
                // Show success animation before redirect
                loginBox.style.borderColor = 'rgba(46, 213, 115, 0.6)';
                loginBox.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(46, 213, 115, 0.4)';
                
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 800);
            } else {
                errorMessage.textContent = 'Incorrect password. Please try again.';
                loginBox.classList.add('shake');
                
                // Remove shake class after animation completes
                setTimeout(() => {
                    loginBox.classList.remove('shake');
                }, 500);
            }
        });
    }
    
    // Logout button handling
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            sessionStorage.removeItem('isLoggedIn');
            window.location.href = 'index.html';
        });
    }
    
    // Game modal handling
    const playButtons = document.querySelectorAll('.play-btn');
    const newTabButtons = document.querySelectorAll('.new-tab-btn');
    const gameModal = document.getElementById('gameModal');
    const gameFrame = document.getElementById('gameFrame');
    const gameTitle = document.getElementById('gameTitle');
    const closeGame = document.querySelector('.close-game');
    
    if (playButtons.length > 0) {
        playButtons.forEach(button => {
            button.addEventListener('click', function() {
                const gameUrl = this.getAttribute('data-game');
                const gameName = this.closest('.game-info').querySelector('h4').textContent;
                
                gameFrame.src = gameUrl;
                gameTitle.textContent = gameName;
                gameModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });
    }
    
    if (newTabButtons.length > 0) {
        newTabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const gameUrl = this.getAttribute('data-url');
                window.open(gameUrl, '_blank');
            });
        });
    }
    
    if (closeGame) {
        closeGame.addEventListener('click', function() {
            gameModal.style.display = 'none';
            gameFrame.src = '';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal when clicking outside of it
    if (gameModal) {
        window.addEventListener('click', function(e) {
            if (e.target === gameModal) {
                gameModal.style.display = 'none';
                gameFrame.src = '';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.game-card, .login-box');
    if (cards.length > 0) {
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(6, 188, 251, 0.3)';
                this.style.borderColor = 'rgba(6, 188, 251, 0.4)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
                this.style.borderColor = '';
            });
        });
    }
    
    // Add smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    if (anchorLinks.length > 0) {
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.getAttribute('href') !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        window.scrollTo({
                            top: target.offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
});