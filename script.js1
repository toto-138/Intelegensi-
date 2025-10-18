let angkaTersedia = Array.from({ length: 50 }, (_, i) => i + 1);
let angkaKeluar = [];

const angkaDisplay = document.getElementById("angka");
const riwayatDiv = document.getElementById("riwayat");
const tombolKocok = document.getElementById("kocok");
const tombolReset = document.getElementById("reset");

function acakAngka() {
  if (angkaTersedia.length === 0) {
    angkaDisplay.textContent = "🎉";
    riwayatDiv.textContent = "Semua angka sudah keluar!";
    return;
  }

  let animasi = setInterval(() => {
    angkaDisplay.textContent = Math.floor(Math.random() * 50) + 1;
    angkaDisplay.style.transform = "scale(1.2)";
    setTimeout(() => angkaDisplay.style.transform = "scale(1)", 100);
  }, 80);

  setTimeout(() => {
    clearInterval(animasi);
    const index = Math.floor(Math.random() * angkaTersedia.length);
    const angka = angkaTersedia.splice(index, 1)[0];
    angkaKeluar.push(angka);
    angkaDisplay.textContent = angka;
    riwayatDiv.textContent = "Angka keluar: " + angkaKeluar.join(", ");
  }, 1500);
}

function resetGame() {
  angkaTersedia = Array.from({ length: 50 }, (_, i) => i + 1);
  angkaKeluar = [];
  angkaDisplay.textContent = "--";
  riwayatDiv.textContent = "Belum ada angka keluar";
}

tombolKocok.addEventListener("click", acakAngka);
tombolReset.addEventListener("click", resetGame);
