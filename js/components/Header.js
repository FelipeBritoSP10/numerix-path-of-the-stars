export function renderHeader(container) {
    container.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h2 class="titulo-projeto m-0"><i class="bi bi-controller me-2"></i>Numerix</h2>
            <button class="btn btn-outline-dark btn-sm rounded-circle" data-bs-toggle="modal" data-bs-target="#modalAjuda" title="Como Jogar">
                <i class="bi bi-question-lg"></i>
            </button>
        </div>
    `;
}