import { GameState } from './GameState.js';
import { renderHomePage } from './pages/HomePage.js';
import { renderGamePage } from './pages/GamePage.js';

document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app');
    const gameState = new GameState();

    function goToHome() {
        gameState.reset();
        renderHomePage(appContainer, (levelIndex) => {
            gameState.loadLevel(levelIndex);
            goToGame();
        });
    }

    function goToGame() {
        renderGamePage(appContainer, gameState, goToHome);
    }

    goToHome();
});