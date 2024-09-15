const scenes = [
    {
        background: 'images/backgrounds/scene1.jpg',
        character: '',
        text: 'You find yourself in a beautiful meadow.',
        choices: [
            { text: 'Walk forward', nextScene: 1 }
        ]
    },
    {
        background: 'images/backgrounds/scene2.jpg',
        character: 'images/characters/character1.png',
        text: 'A mysterious person appears.',
        choices: [
            { text: 'Talk to them', nextScene: 2 },
            { text: 'Ignore them', nextScene: 0 }
        ]
    },
    {
        background: 'images/backgrounds/scene3.jpg',
        character: '',
        text: 'You keep walking, feeling a strange sensation.',
        choices: [
            { text: 'Look around', nextScene: 0 }
        ]
    },
    {
        background: 'images/backgrounds/scene3.jpg',
        character: '',
        text: 'The End. Thank you for playing!',
        choices: []
    }
];

let currentScene = 0;
let playerName = 'Aki';

function showNameInput() {
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('name-input').style.display = 'flex';
}

function setPlayerName() {
    const nameField = document.getElementById('name-field');
    playerName = nameField.value.trim() || 'Aki';
    document.getElementById('name-input').style.display = 'none';
    startGame();
}

function startGame() {
    document.getElementById('game-container').style.display = 'block';
    document.getElementById('dialogue-box').style.display = 'block';
    displayScene(currentScene);
}

function loadGame() {
    const savedScene = localStorage.getItem('currentScene');
    if (savedScene) {
        currentScene = parseInt(savedScene);
        startGame();
    } else {
        alert('No saved game found!');
    }
}

function saveGame() {
    localStorage.setItem('currentScene', currentScene);
    alert('Game saved!');
}

function showMenu() {
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('main-menu').style.display = 'flex';
}

function displayScene(sceneIndex) {
    const scene = scenes[sceneIndex];
    
    // Set background image
    const backgroundImg = document.getElementById('background');
    backgroundImg.src = scene.background;

    // Check if the image loaded correctly
    backgroundImg.onload = () => {
        backgroundImg.style.opacity = 1; // Ensure the image is visible
    };

    backgroundImg.onerror = () => {
        console.error('Failed to load background image:', scene.background);
    };

    // Set character image
    const characterImg = document.getElementById('character');
    if (scene.character) {
        characterImg.src = scene.character;
        characterImg.style.display = 'block';
        setTimeout(() => {
            characterImg.style.opacity = 1;
        }, 100);
    } else {
        characterImg.style.display = 'none';
    }

    // Clear previous choices
    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = '';

    // Show dialog text with typewriter effect
    typeWriter(`${playerName}, ${scene
