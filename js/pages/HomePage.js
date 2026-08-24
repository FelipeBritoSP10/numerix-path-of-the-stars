import { LEVELS } from '../data/levels.js';

export function renderHomePage(container, onSelectLevel) {
    const levelStyles = [
        { bg: '#e0f2fe', border: '#0284c7', text: '#0369a1' },
        { bg: '#dcfce7', border: '#16a34a', text: '#15803d' },
        { bg: '#fef3c7', border: '#d97706', text: '#b45309' }
    ];

    container.innerHTML = `
        <div class="container py-4 text-center d-flex justify-content-center align-items-center" style="min-height: 85vh;">
            <div class="card card-numerix p-4 p-md-5 w-100" style="max-width: 520px;">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <span class="badge rounded-pill px-3 py-2 fs-6 fw-bold" style="background-color: #e0f2fe; color: #0284c7;">
                        <i class="bi bi-controller me-1"></i> Numerix
                    </span>
                    <button class="btn btn-primary fw-bold rounded-circle shadow-sm" data-bs-toggle="modal" data-bs-target="#modalAjudaHome" style="width: 46px; height: 46px; border: 2px solid #0284c7;">
                        <i class="bi bi-question-lg fs-4"></i>
                    </button>
                </div>

                <h1 class="titulo-home display-4 fw-bold mb-2 text-primary">Numerix</h1>
                <p class="fs-5 fw-semibold mb-4 text-dark">Escolha uma fase para começar!</p>

                <div class="d-flex flex-column gap-3 mb-2">
                    ${LEVELS.map((lvl, index) => {
                        const style = levelStyles[index % levelStyles.length];
                        return `
                            <button 
                                class="btn btn-card-fase d-flex align-items-center justify-content-between p-3 rounded-4 border-3 text-start btn-start-level" 
                                data-index="${index}"
                                style="background-color: ${style.bg}; border-color: ${style.border}; color: ${style.text}; border-style: solid;">
                                <div class="d-flex align-items-center gap-3">
                                    <div class="rounded-circle d-flex align-items-center justify-content-center fw-bold fs-3" 
                                         style="width: 52px; height: 52px; background-color: #ffffff; color: ${style.text}; border: 3px solid ${style.border};">
                                        ${index + 1}
                                    </div>
                                    <div>
                                        <div class="fw-bold fs-4">${lvl.title}</div>
                                        <div class="fs-6 fw-semibold opacity-90">Meta: chegar em ${lvl.target}</div>
                                    </div>
                                </div>
                                <div class="fs-1">
                                    <i class="bi bi-play-circle-fill"></i>
                                </div>
                            </button>
                        `;
                    }).join('')}
                </div>

            </div>
        </div>

        <!-- Modal de Ajuda -->
        <div class="modal fade" id="modalAjudaHome" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content bg-white text-dark border-0 rounded-4 shadow-lg p-3">
                    <div class="modal-header border-bottom-0">
                        <h4 class="modal-title text-primary fw-bold"><i class="bi bi-info-circle-fill me-2"></i>Como Jogar</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>
                    <div class="modal-body fs-5 text-start">
                        <p class="mb-3">1. Clique em uma das fases para jogar.</p>
                        <p class="mb-3">2. Use os botões numéricos para somar os pontos.</p>
                        <p class="mb-0">3. Alcance <strong>exatamente</strong> a meta da fase!</p>
                    </div>
                    <div class="modal-footer border-top-0 flex-column gap-2">
                        <button type="button" class="btn btn-primary w-100 py-3 rounded-3 fw-bold fs-5 btn-start-level" data-index="0" data-bs-dismiss="modal">
                            Iniciar Fase 1
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Função de clique imediato
    container.querySelectorAll('.btn-start-level').forEach(btn => {
        btn.addEventListener('click', () => {
            const modalElement = document.getElementById('modalAjudaHome');
            if (modalElement) {
                const modalInstance = bootstrap.Modal.getInstance(modalElement);
                if (modalInstance) modalInstance.hide();
            }
            
            const index = Number(btn.dataset.index);
            onSelectLevel(index);
        });
    });
}