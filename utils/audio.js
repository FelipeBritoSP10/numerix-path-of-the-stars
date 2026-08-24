export function speak(text) {
    if (!('speechSynthesis' in window)) return;

    // Cancela qualquer fala pendente imediatamente para garantir o áudio instantâneo
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.1; // Velocidade ajustada para resposta ágil

    window.speechSynthesis.speak(utterance);
}