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

// Fix for "twitching" for the upper section
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const section = entry.target;
        // Add or remove the visible class only if more than half of the section is visible
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            section.classList.add('visible'); // Show the section
        } else {
            if (!section.classList.contains('no-reset')) { // If class is 'no-reset', do not delete
                section.classList.remove('visible'); // Remove the class when the section leaves
            }
        }
    });
}, { threshold: [0.3] }); // Triggered at 30% visibility

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


// Find the required section
const nextSection = document.querySelector('section#hemispheres').nextElementSibling;

// Create a container for slides
const sliderContainer = document.createElement('div');
sliderContainer.classList.add('slider-container');

// Add HTML for slides
sliderContainer.innerHTML = `
    <button class="slider-btn prev">&#10094;</button>
    <div class="slider">
        <div class="slide" style="background-image: url('images/newgrange.jpg');"></div>
        <div class="slide" style="background-image: url('images/inti-raymi.webp');"></div>
        <div class="slide" style="background-image: url('images/modranicht.jpg');"></div>
        <div class="slide" style="background-image: url('images/koliada.jpg');"></div>
    </div>
    <button class="slider-btn next">&#10095;</button>
    <div class="slider-dots">
        <span class="slider-dot active"></span>
        <span class="slider-dot"></span>
        <span class="slider-dot"></span>
        <span class="slider-dot"></span>
    </div>
`;

// Add a slider to the end of the selected section
nextSection.appendChild(sliderContainer);

// Logic for slides
const slider = sliderContainer.querySelector('.slider');
const slides = sliderContainer.querySelectorAll('.slide');
const prevBtn = sliderContainer.querySelector('.prev');
const nextBtn = sliderContainer.querySelector('.next');
const dots = sliderContainer.querySelectorAll('.slider-dot');

let currentIndex = 0;

// Updating slides and indicators
function updateSlider(index) {
    slider.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// Forward button
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider(currentIndex);
});

// Back button
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider(currentIndex);
});

// Indicators
dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        currentIndex = i;
        updateSlider(currentIndex);
    });
});

// Create a button and add it to the DOM
const backToTopButton = document.createElement('div');
backToTopButton.id = 'backToTop';
backToTopButton.innerHTML = '&#8593;'; // Up arrow
document.body.appendChild(backToTopButton);

// Add a click handler for scrolling up
backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Show the button when scrolling down
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) { // If you scrolled down 200px
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});
