// Efek animasi kecil saat hover link
document.querySelectorAll('.card').forEach((card) => {
  card.addEventListener('mouseenter', () => {
    card.style.boxShadow = '0 8px 20px rgba(56, 189, 248, 0.6)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
  });
});

// Pesan sambutan di console
console.log("🚀 Website aktif! Dibuat dengan cinta 💙");
