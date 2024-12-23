// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Animation for revealing sections on scroll
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // Show section when it enters
        } else {
            entry.target.classList.remove('visible'); // Remove class when it exits
        }
    });
}, { threshold: 0.1 }); // Configuration: 10% visibility of section

sections.forEach(section => observer.observe(section));


// Create a container for snowflakes
const snowContainer = document.createElement('div');
snowContainer.style.position = 'fixed';
snowContainer.style.top = '0';
snowContainer.style.left = '0';
snowContainer.style.width = '100vw';
snowContainer.style.height = '100vh';
snowContainer.style.pointerEvents = 'none';
snowContainer.style.overflow = 'hidden';
document.body.appendChild(snowContainer);

// Falling snow
const createSnowflake = () => {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.style.left = Math.random() * 100 + 'vw'; // Random horizontal position
    snowflake.style.animationDuration = Math.random() * 3 + 2 + 's'; // 2-5 seconds
    snowflake.style.opacity = Math.random(); // Snowflake opacity
    snowflake.style.fontSize = Math.random() * 10 + 10 + 'px'; // Snowflake size
    snowflake.innerText = '❄'; // Snowflake character
    snowContainer.appendChild(snowflake);

    setTimeout(() => {
        snowflake.remove(); // Remove snowflake after animation ends
    }, 5000); // Snowflake lifespan
};

// Create snowflakes every 100 ms
setInterval(createSnowflake, 100);


// Add sun to the DOM
const header = document.querySelector('header');
const sun = document.createElement('div');
sun.id = 'sun';
document.body.appendChild(sun);

const sunElement = document.getElementById('sun');

// Set initial position of the sun
let posX = 0; // Initial left position
let posY = header.offsetHeight; // Initial top position below the header
const headerHeight = header.offsetHeight;
const headerWidth = header.offsetWidth;

// Display the sun
sunElement.style.display = 'block';
sunElement.style.left = `${posX}px`;
sunElement.style.top = `${posY}px`;

// Define sun movement
function animateSun() {
    const interval = setInterval(() => {
        if (posX < headerWidth / 2) {
            // Move up and to the right
            posX += 2;
            posY -= 1.5;
        } else if (posX >= headerWidth / 2 && posX < headerWidth) {
            // Move down and to the right
            posX += 2;
            posY += 1.5;
        } else {
            // End movement
            clearInterval(interval);
        }

        // Apply coordinates
        sunElement.style.left = `${posX}px`;
        sunElement.style.top = `${posY}px`;
    }, 20); // Update interval
}

// Start the animation
animateSun();
