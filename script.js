const canvas = document.getElementById('eyeCanvas');
const ctx = canvas.getContext('2d');
const focusSlider = document.getElementById('focusSlider');
const focusValue = document.getElementById('focusValue');
const backgroundImage = document.getElementById('backgroundImage');
const foregroundImage = document.getElementById('foregroundImage');

const retinaX = 600; // pozice sítnice

function drawEye(focus) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Oko
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;

  // Rohovka
  ctx.beginPath();
  ctx.arc(400, 300, 200, Math.PI * 0.8, Math.PI * 0.2, false);
  ctx.stroke();

  // Čočka
  ctx.beginPath();
  // Upravené - posun čočky doleva
  ctx.ellipse(300, 300, 40, 160, 0, 0, 2 * Math.PI);
  ctx.stroke();

  // Sítnice
  ctx.beginPath();
  ctx.moveTo(retinaX, 150);
  ctx.lineTo(retinaX, 450);
  ctx.stroke();

  // Popisky
  ctx.font = "20px Arial";
  ctx.fillStyle = "#000";
  ctx.fillText("Rohovka", 320, 120);
  ctx.fillText("Čočka", 390, 280);
  ctx.fillText("Sítnice", 605, 200);

  // Paprsek světla (vodorovný)
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 3;

  const x0 = 200;
  const y0 = 300;
  const x1 = 300;
  const y1 = 300;
  const x2 = focus;
  const y2 = 300;

  // Přímka paprsku
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  // Dopad
  ctx.beginPath();
  ctx.arc(x2, y2, 5, 0, 2 * Math.PI);
  ctx.fillStyle = 'red';
  ctx.fill();

  // Vzdálenost od sítnice
  const distanceFromRetina = focus - retinaX;

  let blurBackground = 0;
  let blurForeground = 0;

  if (Math.abs(distanceFromRetina) < 10) {
    // Ostrý obraz na sítnici
    blurBackground = 0;
    blurForeground = 0;
  } else if (distanceFromRetina < 0) {
    // Krátkozrakost - rozmazáváme pozadí
    blurBackground = Math.min(Math.abs(distanceFromRetina) / 10, 10);
    blurForeground = 0;
  } else {
    // Dalekozrakost - rozmazáváme popředí
    blurBackground = 0;
    blurForeground = Math.min(Math.abs(distanceFromRetina) / 10, 10);
  }

  backgroundImage.style.filter = `blur(${blurBackground}px)`;
  foregroundImage.style.filter = `blur(${blurForeground}px)`;
}

// Event listener pro slider
focusSlider.addEventListener('input', () => {
  const focus = parseFloat(focusSlider.value);
  focusValue.textContent = focus;
  drawEye(focus);
});

// Inicializace
drawEye(parseFloat(focusSlider.value));
