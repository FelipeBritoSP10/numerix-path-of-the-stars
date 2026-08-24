export function renderModalAjuda(container) {
    container.innerHTML = `
        <div class="modal fade text" id="modalAjuda" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content bg-dark text-light border-secondary">
                    <div class="modal-header border-secondary">
                        <h5 class="modal-title"><i class="bi bi-info-circle me-2"></i>Como Jogar</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>1. Escolha os botões numéricos para somar e avançar na trilha.</p>
                        <p>2. Seu objetivo é alcançar <strong>exatamente</strong> o número da Meta da fase.</p>
                        <p>3. Botões que somam mais do que o limite restante ficam desativados para você não passar da meta!</p>
                    </div>
                    <div class="modal-footer border-secondary">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Entendi!</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}