document.addEventListener('DOMContentLoaded', function() {
    // Create particles container if it doesn't exist
    let particlesContainer = document.getElementById('particles');
    if (!particlesContainer) {
        particlesContainer = document.createElement('div');
        particlesContainer.id = 'particles';
        document.body.appendChild(particlesContainer);
    }
    
    // Create floating particles
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
    
    // Add animation to titles
    const titles = document.querySelectorAll('.hero-title, .site-title h1');
    titles.forEach(title => {
        title.style.opacity = '0';
        setTimeout(() => {
            title.style.transition = 'opacity 1s ease';
            title.style.opacity = '1';
        }, 300);
    });
    
    // Add animation to game cards
    const gameCards = document.querySelectorAll('.game-card');
    if (gameCards.length > 0) {
        gameCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 + (index * 50));
        });
    }
});

function createParticle(container) {
    const particle = document.createElement('span');
    particle.className = 'particle';
    
    // Random size between 2px and 6px
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    
    // Random animation duration between 15s and 30s
    const duration = Math.random() * 15 + 15;
    particle.style.animationDuration = `${duration}s`;
    
    // Random animation delay
    const delay = Math.random() * 5;
    particle.style.animationDelay = `${delay}s`;
    
    container.appendChild(particle);
    
    // Remove and recreate particle after animation completes
    setTimeout(() => {
        particle.remove();
        createParticle(container);
    }, (duration + delay) * 1000);
}
