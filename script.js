// Smooth animation trigger and localStorage for preferences

document.addEventListener('DOMContentLoaded', function() {
    const animateBtn = document.getElementById('animateBtn');
    const animatedImg = document.getElementById('animatedImg');
    const colorPref = document.getElementById('colorPref');
    const savePref = document.getElementById('savePref');

    // Load color preference from localStorage
    const savedColor = localStorage.getItem('favoriteColor');
    if (savedColor) {
        document.body.style.background = `linear-gradient(120deg, ${savedColor} 0%, #e0eafc 100%)`;
        colorPref.value = savedColor;
    }

    // Save color preference
    savePref.addEventListener('click', function() {
        const color = colorPref.value;
        localStorage.setItem('favoriteColor', color);
        document.body.style.background = `linear-gradient(120deg, ${color} 0%, #e0eafc 100%)`;
        // Animation: flash background
        document.body.animate([
            { filter: 'brightness(1.5)' },
            { filter: 'brightness(1)' }
        ], {
            duration: 600,
            easing: 'ease-in-out'
        });
    });

    // Animate image on button click
    animateBtn.addEventListener('click', function() {
        animatedImg.classList.remove('animated');
        // Force reflow to restart animation
        void animatedImg.offsetWidth;
        animatedImg.classList.add('animated');
    });

    // Add event listeners to Buy Now links to save selected book details and redirect
    const buyBtns = document.querySelectorAll('.buyBtn');
    buyBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            // Only handle if data attributes are present (on index.html)
            if (btn.dataset && btn.dataset.title) {
                e.preventDefault();
                localStorage.setItem('selectedBookDetails', JSON.stringify({
                    title: btn.dataset.title,
                    author: btn.dataset.author,
                    img: btn.dataset.img
                }));
                window.location.href = 'book-details.html';
            }
            const card = btn.closest('.book-card');
            if (card) {
                const img = card.querySelector('.book-img');
                if (img) {
                    img.classList.remove('animated');
                    void img.offsetWidth;
                    img.classList.add('animated');
                    img.animate([
                        { transform: 'scale(1)', filter: 'brightness(1)' },
                        { transform: 'scale(1.12)', filter: 'brightness(1.2)' },
                        { transform: 'scale(1)', filter: 'brightness(1)' }
                    ], {
                        duration: 700,
                        easing: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)'
                    });
                }
            }
        });
    });
});
