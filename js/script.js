const TARGET = 10;
const VALUES = [1, 2, 3, 5];
let currentValue = 0;

const trilhaEl = document.getElementById('trilha'),
    totalNumeroEl = document.getElementById('total-numero'),
    feedbackEl = document.getElementById('feedback-label'),
    mascoteEl = document.getElementById('mascote'),
    bocaEl = document.getElementById('mascote-boca');

function buildTrilha() {
    for (let i = 1; i <= TARGET; i++) {
        const s = document.createElement('div');
        s.className = 'slot rounded-circle d-flex align-items-center justify-content-center';
        s.dataset.index = i; s.textContent = i;
        trilhaEl.appendChild(s);
    }
}

function triggerConfetti() {
    const container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);
    for (let i = 0; i < 60; i++) {
        const c = document.createElement('div');
        c.className = 'confetti';
        c.style.left = Math.random() * 100 + 'vw';
        c.style.backgroundColor = ['#2f8f8a', '#6fae76', '#e0a541'][Math.floor(Math.random() * 3)];
        c.style.animationDuration = (Math.random() * 2 + 1) + 's';
        container.appendChild(c);
    }
    setTimeout(() => container.remove(), 3000);
}

function speak(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'pt-BR'; u.rate = 0.95;
    window.speechSynthesis.speak(u);
}

function updateTrilha(win) {
    document.querySelectorAll('.slot').forEach(s => {
        const idx = Number(s.dataset.index);
        s.classList.toggle('filled', idx <= currentValue);
        if (win) s.classList.toggle('win', idx <= currentValue);
    });
}

function updateMascote() {
    if (currentValue === 0) bocaEl.setAttribute('d', 'M 38 62 Q 50 62 64 62');
    else if (currentValue < TARGET) bocaEl.setAttribute('d', `M 38 60 Q 50 ${60 + (currentValue / TARGET) * 8} 64 60`);
    else {
        bocaEl.setAttribute('d', 'M 36 58 Q 50 74 64 58');
        mascoteEl.classList.add('bounce');
        setTimeout(() => mascoteEl.classList.remove('bounce'), 500);
    }
}

function addValue(value) {
    if (currentValue + value > TARGET) return;
    currentValue += value;
    totalNumeroEl.textContent = currentValue;
    const win = currentValue === TARGET;
    updateTrilha(win);
    updateMascote();
    if (win) {
        feedbackEl.textContent = 'Você chegou em 10! Muito bem.';
        feedbackEl.classList.add('win');
        speak('Você chegou em dez! Muito bem.');
        triggerConfetti();
    } else {
        feedbackEl.textContent = `Faltam ${TARGET - currentValue} para chegar em 10.`;
        speak(`Faltam ${TARGET - currentValue}.`);
    }
    VALUES.forEach(v => document.getElementById('btn-' + v).disabled = (currentValue + v > TARGET || currentValue === TARGET));
}

function resetGame() {
    currentValue = 0;
    totalNumeroEl.textContent = '0';
    feedbackEl.textContent = 'Pronto para começar?';
    feedbackEl.classList.remove('win');
    updateTrilha(false);
    updateMascote();
    VALUES.forEach(v => document.getElementById('btn-' + v).disabled = false);
}

buildTrilha();