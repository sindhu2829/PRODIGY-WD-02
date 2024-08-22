let startTime, updatedTime, difference, tInterval, savedTime, running = false;
let laps = [];
let darkMode = false;

// Get elements from the DOM
const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');
const themeToggle = document.getElementById('themeToggle');

// Start/Stop the stopwatch
startStopBtn.addEventListener('click', () => {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 1);
        running = true;
        startStopBtn.innerHTML = 'Stop';
        lapBtn.disabled = false;
        resetBtn.disabled = true;
    } else {
        clearInterval(tInterval);
        savedTime = difference;
        running = false;
        startStopBtn.innerHTML = 'Start';
        lapBtn.disabled = true;
        resetBtn.disabled = false;
    }
});

// Reset the stopwatch
resetBtn.addEventListener('click', () => {
    clearInterval(tInterval);
    savedTime = 0;
    difference = 0;
    running = false;
    display.innerHTML = '00:00:00';
    startStopBtn.innerHTML = 'Start';
    laps = [];
    updateLaps();
});

// Record a lap
lapBtn.addEventListener('click', () => {
    laps.push(display.innerHTML);
    updateLaps();
});

// Toggle dark mode
themeToggle.addEventListener('click', () => {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-mode');
    themeToggle.innerHTML = darkMode ? '☀️' : '🌙';
});

// Update the display time
function updateTime() {
    updatedTime = new Date().getTime();
    difference = savedTime ? updatedTime - startTime + savedTime : updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    display.innerHTML = `${hours}:${minutes}:${seconds}`;
}

// Update laps list
function updateLaps() {
    lapsList.innerHTML = '';
    laps.forEach((lap, index) => {
        const lapItem = document.createElement('li');
        lapItem.innerHTML = `Lap ${index + 1}: ${lap}`;
        lapsList.appendChild(lapItem);
    });
}
