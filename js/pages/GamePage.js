import { renderHeader } from '../components/Header.js';
import { MascoteComponent } from '../components/Mascote.js';
import { TrilhaComponent } from '../components/Trilha.js';
import { PainelControlesComponent } from '../components/PainelControles.js';
import { renderModalAjuda } from '../components/ModalAjuda.js';
import { triggerConfetti } from '../../utils/confetti.js';
import { speak } from '../../utils/audio.js';

export function renderGamePage(container, state, onBackToHome) {
    container.innerHTML = `
        <div class="container py-5 d-flex justify-content-center">
            <div class="w-100" style="max-width:640px;">
                <div id="header-container"></div>

                <section class="card card-numerix p-4 p-md-5">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <span class="badge bg-primary fs-6" id="level-badge"></span>
                        <p class="meta-label m-0 fw-bold" id="meta-label"></p>
                    </div>

                    <div id="mascote-container" class="d-flex justify-content-center mb-2"></div>
                    <div id="trilha-container" class="d-flex flex-wrap justify-content-center gap-2 my-4"></div>

                    <div class="d-flex justify-content-center mb-3">
                        <div class="total-box rounded-circle d-flex align-items-center justify-content-center">
                            <span id="total-numero">0</span>
                        </div>
                    </div>

                    <p class="feedback text-center mb-4 fw-semibold fs-5" id="feedback-label">Pronto para começar?</p>

                    <div id="controles-container"></div>

                    <div class="d-flex gap-2 mt-4">
                        <button class="btn btn-outline-secondary flex-fill" id="btn-voltar">
                            <i class="bi bi-arrow-left"></i> Menu
                        </button>
                        <button class="btn btn-reset flex-fill" id="btn-reset">Recomeçar</button>
                        <button class="btn btn-success flex-fill d-none" id="btn-proximo">Próxima Fase</button>
                    </div>
                </section>
            </div>
        </div>
        <div id="modal-container"></div>
    `;

    renderHeader(document.getElementById('header-container'));
    renderModalAjuda(document.getElementById('modal-container'));

    const levelBadgeEl = document.getElementById('level-badge');
    const metaLabelEl = document.getElementById('meta-label');
    const totalNumeroEl = document.getElementById('total-numero');
    const feedbackEl = document.getElementById('feedback-label');
    const btnReset = document.getElementById('btn-reset');
    const btnVoltar = document.getElementById('btn-voltar');
    const btnProximo = document.getElementById('btn-proximo');

    const mascote = new MascoteComponent(document.getElementById('mascote-container'));
    let trilha = new TrilhaComponent(document.getElementById('trilha-container'), state.target);
    
    // Função para tratar o clique dos botões numéricos
    const handleNumberClick = (val) => {
        state.addValue(val);
        
        if (state.isWin) {
            speak(`Você chegou em ${state.target}! Muito bem!`);
        } else {
            // 🔊 Áudio dizendo a sobra e reforçando o objetivo (ex: "Faltam 4. Seu objetivo é chegar a 10")
            speak(`Faltam ${state.remaining}. Seu objetivo é chegar a ${state.target}.`);
        }
    };

    let controles = new PainelControlesComponent(
        document.getElementById('controles-container'),
        state.values,
        handleNumberClick
    );

    let currentLoadedLevel = -1;

    state.subscribe((s) => {
        if (currentLoadedLevel !== s.currentLevelIndex) {
            currentLoadedLevel = s.currentLevelIndex;
            levelBadgeEl.textContent = `Fase ${s.level.id}`;
            metaLabelEl.textContent = `Meta: chegar exatamente em ${s.target}`;

            trilha = new TrilhaComponent(document.getElementById('trilha-container'), s.target);
            controles = new PainelControlesComponent(
                document.getElementById('controles-container'),
                s.values,
                handleNumberClick
            );
        }

        totalNumeroEl.textContent = s.currentValue;
        trilha.update(s);
        mascote.update(s);
        controles.update(s);

        if (s.currentValue === 0) {
            feedbackEl.textContent = `🎯 Seu objetivo é chegar a ${s.target}. Escolha um número!`;
            feedbackEl.classList.remove('win');
            btnProximo.classList.add('d-none');
        } else if (s.isWin) {
            feedbackEl.textContent = `🎉 Você chegou em ${s.target}! Muito bem.`;
            feedbackEl.classList.add('win');
            triggerConfetti();

            if (s.hasNextLevel) {
                btnProximo.classList.remove('d-none');
            }
        } else {
            feedbackEl.textContent = `Faltam ${s.remaining} para chegar em ${s.target}.`;
            btnProximo.classList.add('d-none');
        }
    });

    btnReset.addEventListener('click', () => {
        state.reset();
        speak(`Jogo recomeçado. Seu objetivo é chegar a ${state.target}.`);
    });

    btnVoltar.addEventListener('click', () => {
        window.speechSynthesis.cancel();
        onBackToHome();
    });

    btnProximo.addEventListener('click', () => {
        state.nextLevel();
        speak(`Fase ${state.level.id}. Seu objetivo é chegar a ${state.target}.`);
    });
}