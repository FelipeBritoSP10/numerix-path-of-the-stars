export class TrilhaComponent {
    constructor(container, target) {
        this.container = container;
        this.target = target;
        this.render();
    }

    render() {
        this.container.innerHTML = '';
        for (let i = 1; i <= this.target; i++) {
            const step = document.createElement('div');
            step.className = 'trilha-passo';
            step.dataset.step = i;
            step.textContent = i;
            this.container.appendChild(step);
        }
    }

    update(state) {
        const steps = this.container.querySelectorAll('.trilha-passo');
        steps.forEach((step, index) => {
            const stepValue = index + 1;
            step.classList.remove('active', 'win');

            if (stepValue <= state.currentValue) {
                if (state.isWin) {
                    step.classList.add('win');
                } else {
                    step.classList.add('active');
                }
            }
        });
    }
}