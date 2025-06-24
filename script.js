document.addEventListener('DOMContentLoaded', () => {
    // --- Step 1: EDIT THIS LIST! ---
    // Add or remove any food options you want in this array.
    const foodOptions = [
        "Pizza 🍕", 
        "Tacos 🌮", 
        "Sushi 🍣", 
        "Pasta 🍝",
        "Burgers 🍔", 
        "Salad 🥗",
        "Ramen 🍜",
        "Steak 🥩"
    ];

    // --- No need to edit below this line ---

    const wheel = document.getElementById('wheel');
    const spinBtn = document.getElementById('spin-btn');
    const resultMessage = document.getElementById('result-message');

    let isSpinning = false;
    let currentRotation = 0;
    const segmentAngle = 360 / foodOptions.length;

    // Function to create the wheel segments and labels
    function createWheel() {
        // Clear any existing segments
        wheel.innerHTML = '';
        
        const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6', '#1abc9c', '#e67e22', '#34495e'];
        let gradientParts = [];

        foodOptions.forEach((option, i) => {
            const angle = i * segmentAngle;
            const color = colors[i % colors.length];

            // Create gradient for the wheel background
            gradientParts.push(`${color} ${angle}deg ${angle + segmentAngle}deg`);
            
            // Create and position the label
            const label = document.createElement('div');
            label.textContent = option;
            label.classList.add('segment-label');
            
            const labelAngle = angle + (segmentAngle / 2);
            label.style.transform = `rotate(${labelAngle}deg) translate(0, -110%) rotate(-90deg)`;

            wheel.appendChild(label);
        });

        wheel.style.background = `conic-gradient(${gradientParts.join(', ')})`;
    }

    // Function to handle the spin
    function handleSpin() {
        if (isSpinning) return;
        
        isSpinning = true;
        spinBtn.disabled = true;
        resultMessage.textContent = 'Spinning...';

        // Calculate a random spin value
        const randomSpins = Math.floor(Math.random() * 5) + 5; // 5 to 9 full spins
        const randomDegree = Math.random() * 360;
        const totalRotation = (randomSpins * 360) + randomDegree;
        
        // Apply the rotation
        const finalRotation = currentRotation + totalRotation;
        wheel.style.transform = `rotate(${finalRotation}deg)`;
        
        // Find the winner
        // The pointer is at the top (0 degrees). We need to find what segment lands there.
        // We use the remainder to find the final angle, and add 360 to handle negative results.
        const actualAngle = (360 - (finalRotation % 360) + 360) % 360;
        const winningIndex = Math.floor(actualAngle / segmentAngle);
        const winner = foodOptions[winningIndex];

        // Wait for the animation to end
        setTimeout(() => {
            isSpinning = false;
            spinBtn.disabled = false;
            resultMessage.textContent = `You're having ${winner}!`;
            // Optional: You can add a fun alert or confetti here
            // alert(`The winner is: ${winner}`);
        }, 5000); // This must match the CSS transition duration
    }

    // Initial setup
    createWheel();
    spinBtn.addEventListener('click', handleSpin);
});
