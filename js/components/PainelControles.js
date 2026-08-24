export class PainelControlesComponent {
    constructor(container, values, onSelect) {
        this.container = container;
        this.values = values;
        this.onSelect = onSelect;
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <div class="row g-2" id="grid-botoes">
                ${this.values.map(val => `
                    <div class="col-6 col-md-3">
                        <button class="btn btn-primary w-100 btn-val" data-val="${val}">
                            +${val}
                        </button>
                    </div>
                `).join('')}
            </div>
        `;

        this.buttons = this.container.querySelectorAll('.btn-val');
        this.buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const val = Number(btn.dataset.val);
                this.onSelect(val);
            });
        });
    }

    update(state) {
        this.buttons.forEach(btn => {
            const val = Number(btn.dataset.val);
            const canAdd = (state.currentValue + val <= state.target) && !state.isWin;
            btn.disabled = !canAdd;
        });
    }
}