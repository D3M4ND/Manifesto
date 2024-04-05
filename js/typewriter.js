const phrases = [
  "IL FUTURO",
  "LA CULTURA",
  "L'ANONIMATO",
  "UN TECH LIBERO",
  "IL SAPERE"  
];

let currentPhraseIndex = 0;
let currentCharIndex = -1; // Inizializzato a -1 per gestire la cancellazione correttamente
let isDeleting = false;
let hasCompletedCycle = false; // Aggiunto per tenere traccia della fine del ciclo

function typeWriter() {
  const element = document.getElementById("dyn");
  const currentPhrase = phrases[currentPhraseIndex];

  if (!isDeleting) {
    // Scrive la frase
    currentCharIndex++;
    element.textContent = "PRETENDI " + currentPhrase.slice(0, currentCharIndex);
    if (currentCharIndex === currentPhrase.length) {
      // Inizia a cancellare dopo una pausa
      setTimeout(() => { isDeleting = true; }, 1000);
    }
  } else {
    // Cancella la frase
    currentCharIndex--;
    element.textContent = "PRETENDI " + currentPhrase.slice(0, currentCharIndex);
    if (currentCharIndex <= 0) {
      // Passa alla prossima frase una volta che la corrente è stata completamente cancellata
      isDeleting = false;
      currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
      if (currentPhraseIndex === 0) { // Se tutte le frasi sono state mostrate
        if (!hasCompletedCycle) {
          hasCompletedCycle = true; // Imposta che il ciclo è completo
        } else {
          // Una volta che tutte le frasi sono state scritte e cancellate, scrivi "D3M4ND" e non chiamare più typeWriter()
          element.textContent = "D3M4ND";
          return; // Esce dalla funzione senza pianificare la prossima chiamata
        }
      }
      currentCharIndex = -1; // Resetta l'indice per la nuova frase
    }
  }

  let typingSpeed = isDeleting ? 40 : 80;
  setTimeout(typeWriter, typingSpeed);
}

document.addEventListener("DOMContentLoaded", function() {
  setTimeout(typeWriter, 1000); // Ritardo iniziale prima di iniziare a scrivere
});
