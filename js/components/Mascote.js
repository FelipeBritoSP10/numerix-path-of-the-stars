export class MascoteComponent {
    constructor(container) {
        this.container = container;
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <div id="mascote-icon" class="display-1 text-center" style="transition: transform 0.3s ease;">
                🤖
            </div>
        `;
        this.element = this.container.querySelector('#mascote-icon');
    }

    update(state) {
        if (state.isWin) {
            this.element.textContent = '🥳';
            this.element.style.transform = 'scale(1.2) rotate(10deg)';
        } else if (state.currentValue > 0) {
            this.element.textContent = '🤔';
            this.element.style.transform = 'scale(1.05)';
        } else {
            this.element.textContent = '🤖';
            this.element.style.transform = 'scale(1)';
        }
    }
}