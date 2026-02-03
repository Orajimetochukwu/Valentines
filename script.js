// ========== Particle Background Effect ==========
function initParticles(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 120)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    init();
    animate();

    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Initialize particles for both pages
initParticles('particleCanvas');

// ========== Floating Hearts Animation ==========
function createHeart(container) {
    const heart = document.createElement('div');
    const hearts = ['❤️', '💕', '💖', '💗', '💝'];
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.position = 'fixed';
    heart.style.fontSize = Math.random() * 30 + 20 + 'px';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = '100%';
    heart.style.opacity = Math.random() * 0.4 + 0.3 + '';
    heart.style.zIndex = '1';
    heart.style.pointerEvents = 'none';

    const duration = Math.random() * 3 + 4;
    const drift = Math.random() * 100 - 50;

    heart.style.animation = `floatUp ${duration}s linear`;

    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            to {
                top: -10%;
                transform: translateX(${drift}px) rotate(${Math.random() * 360}deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    container.appendChild(heart);

    setTimeout(() => {
        heart.remove();
        style.remove();
    }, duration * 1000);
}

// Create hearts periodically for both pages
const heartsContainers = document.querySelectorAll('.hearts-background');
heartsContainers.forEach(container => {
    setInterval(() => createHeart(container), 600);
});

// ========== Rose Petals Animation ==========
function createRosePetal(container) {
    const petal = document.createElement('div');
    petal.innerHTML = '🌸';
    petal.style.position = 'fixed';
    petal.style.fontSize = Math.random() * 20 + 15 + 'px';
    petal.style.left = Math.random() * 100 + '%';
    petal.style.top = '-50px';
    petal.style.opacity = Math.random() * 0.4 + 0.3 + '';
    petal.style.zIndex = '1';
    petal.style.pointerEvents = 'none';

    const duration = Math.random() * 5 + 5;
    const drift = Math.random() * 200 - 100;
    const rotation = Math.random() * 720 + 360;

    const style = document.createElement('style');
    style.textContent = `
        @keyframes petalFall {
            to {
                top: 100%;
                transform: translateX(${drift}px) rotate(${rotation}deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    petal.style.animation = `petalFall ${duration}s ease-in-out`;

    container.appendChild(petal);

    setTimeout(() => {
        petal.remove();
        style.remove();
    }, duration * 1000);
}

// Create rose petals periodically
const petalContainers = document.querySelectorAll('.rose-petals');
petalContainers.forEach(container => {
    setInterval(() => createRosePetal(container), 800);
});

// ========== Sparkles Effect ==========
function createSparkle(container) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'absolute';
    sparkle.style.fontSize = Math.random() * 15 + 10 + 'px';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.opacity = '0';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '10';

    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkleAnim {
            0%, 100% {
                opacity: 0;
                transform: scale(0) rotate(0deg);
            }
            50% {
                opacity: 1;
                transform: scale(1) rotate(180deg);
            }
        }
    `;
    document.head.appendChild(style);

    sparkle.style.animation = 'sparkleAnim 1.5s ease-in-out';

    container.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
        style.remove();
    }, 1500);
}

// Create sparkles around the content
const sparkleContainers = document.querySelectorAll('.sparkles');
sparkleContainers.forEach(container => {
    setInterval(() => createSparkle(container), 400);
});

// ========== Button Interactions ==========
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionPage = document.getElementById('questionPage');
const answerPage = document.getElementById('answerPage');

// When "Yes" is clicked
yesBtn.addEventListener('click', () => {
    // Add a special animation before transitioning
    yesBtn.style.transform = 'scale(1.3)';
    yesBtn.style.transition = 'transform 0.3s ease';

    setTimeout(() => {
        questionPage.classList.add('hidden');
        answerPage.classList.remove('hidden');
        createConfetti();
        createFireworks();
        initParticles('particleCanvas2');
    }, 300);
});

// Make "No" button run away on hover
noBtn.addEventListener('mouseenter', () => {
    moveNoButton();
});

// For mobile - make "No" button run away on touch
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

function moveNoButton() {
    const maxX = window.innerWidth - noBtn.offsetWidth - 100;
    const maxY = window.innerHeight - noBtn.offsetHeight - 100;

    const randomX = Math.max(50, Math.random() * maxX);
    const randomY = Math.max(50, Math.random() * maxY);

    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.transition = 'all 0.3s ease';
}

// ========== Confetti Effect ==========
function createConfetti() {
    const colors = ['#ff6b9d', '#ffc371', '#667eea', '#764ba2', '#f093fb', '#f5576c'];
    const shapes = ['circle', 'square'];

    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            const shape = shapes[Math.floor(Math.random() * shapes.length)];

            confetti.style.position = 'fixed';
            confetti.style.width = Math.random() * 15 + 5 + 'px';
            confetti.style.height = confetti.style.width;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-20px';
            confetti.style.opacity = '1';
            confetti.style.borderRadius = shape === 'circle' ? '50%' : '0';
            confetti.style.zIndex = '1000';

            const duration = Math.random() * 3 + 2;
            const drift = Math.random() * 300 - 150;
            const rotation = Math.random() * 720 + 360;

            const style = document.createElement('style');
            style.textContent = `
                @keyframes confettiFall {
                    to {
                        top: 100%;
                        transform: translateX(${drift}px) rotate(${rotation}deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);

            confetti.style.animation = `confettiFall ${duration}s ease-out`;

            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
                style.remove();
            }, duration * 1000);
        }, i * 20);
    }
}

// ========== Fireworks Effect ==========
function createFireworks() {
    const colors = ['#ff6b9d', '#ffc371', '#667eea', '#764ba2', '#f093fb', '#f5576c'];

    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * (window.innerHeight / 2) + 100;

            for (let j = 0; j < 30; j++) {
                const particle = document.createElement('div');
                particle.style.position = 'fixed';
                particle.style.width = '8px';
                particle.style.height = '8px';
                particle.style.borderRadius = '50%';
                particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                particle.style.zIndex = '1000';
                particle.style.pointerEvents = 'none';

                const angle = (Math.PI * 2 * j) / 30;
                const velocity = Math.random() * 100 + 50;
                const vx = Math.cos(angle) * velocity;
                const vy = Math.sin(angle) * velocity;

                const style = document.createElement('style');
                style.textContent = `
                    @keyframes firework-${i}-${j} {
                        to {
                            transform: translate(${vx}px, ${vy}px);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);

                particle.style.animation = `firework-${i}-${j} 1s ease-out forwards`;

                document.body.appendChild(particle);

                setTimeout(() => {
                    particle.remove();
                    style.remove();
                }, 1000);
            }
        }, i * 600);
    }
}

// ========== Mouse Interaction - Create hearts on click ==========
document.addEventListener('click', (e) => {
    // Only on the question page
    if (!questionPage.classList.contains('hidden')) {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '💖';
                heart.style.position = 'fixed';
                heart.style.left = e.clientX + 'px';
                heart.style.top = e.clientY + 'px';
                heart.style.fontSize = Math.random() * 20 + 15 + 'px';
                heart.style.pointerEvents = 'none';
                heart.style.zIndex = '1000';

                const angle = (Math.PI * 2 * i) / 5;
                const distance = 50;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance - 50;

                const style = document.createElement('style');
                style.textContent = `
                    @keyframes clickHeart {
                        to {
                            transform: translate(${tx}px, ${ty}px);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);

                heart.style.animation = 'clickHeart 1s ease-out forwards';

                document.body.appendChild(heart);

                setTimeout(() => {
                    heart.remove();
                    style.remove();
                }, 1000);
            }, i * 50);
        }
    }
});

// ========== Add floating animation to Yes button ==========
setInterval(() => {
    if (!questionPage.classList.contains('hidden')) {
        yesBtn.style.animation = 'none';
        setTimeout(() => {
            yesBtn.style.animation = 'pulse 0.5s ease';
        }, 10);
    }
}, 3000);

// Add pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
`;
document.head.appendChild(pulseStyle);
