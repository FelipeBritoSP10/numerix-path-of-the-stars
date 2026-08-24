import { LEVELS } from './data/levels.js';
export class GameState {
    constructor() {
        this.currentLevelIndex = 0;
        this.listeners = [];
        this.loadLevel(this.currentLevelIndex);
    }

    get level() {
        return LEVELS[this.currentLevelIndex];
    }

    loadLevel(index) {
        if (index < 0 || index >= LEVELS.length) return;
        this.currentLevelIndex = index;
        this.target = this.level.target;
        this.values = this.level.values;
        this.currentValue = 0;
        this.notify();
    }

    subscribe(listener) {
        this.listeners.push(listener);
    }

    notify() {
        this.listeners.forEach(fn => fn(this));
    }

    addValue(value) {
        if (this.currentValue + value > this.target) return;
        this.currentValue += value;
        this.notify();
    }

    reset() {
        this.currentValue = 0;
        this.notify();
    }

    nextLevel() {
        if (this.hasNextLevel) {
            this.loadLevel(this.currentLevelIndex + 1);
        }
    }

    get hasNextLevel() {
        return this.currentLevelIndex < LEVELS.length - 1;
    }

    get isWin() {
        return this.currentValue === this.target;
    }

    get remaining() {
        return this.target - this.currentValue;
    }
}