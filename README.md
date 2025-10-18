# Permainan ADIL — Web (Host & Pemain)

Web versi permainan ADIL (mirip Bingo). Repository ini bisa di-publish menggunakan **GitHub Pages**.

## Fitur
- Host: tombol **KOCOK ANGKA**, riwayat, copy/share link, export riwayat.
- Pemain: 10 papan (4×4), setiap papan berisi 16 angka acak (01–50). Papan acak **tetap** di browser (disimpan di `localStorage`).
- Tanpa backend: sinkronisasi antar-tab di satu perangkat tersedia (via `localStorage`), untuk perangkat lain Host dapat **share link** berisi nomor terakhir.

## Cara pakai (cepat)
1. Upload file-file berikut ke repo GitHub:
   - `index.html`, `host.html`, `pemain.html`, `style.css`, `script.js`, `README.md`
2. Buka repo → Settings → Pages → pilih branch `main` dan `/ (root)` → Save.
3. Akses: `https://<username>.github.io/<repo-name>/`
4. Buka `Host` untuk mulai memanggil angka. Buka `Pemain` di perangkat pemain.

## Batasan sinkronisasi
- Tanpa server, real-time sync lintas device tidak tersedia.
- Untuk sinkronisasi lintas HP/laptop, opsi:
  - Pakai backend sederhana (Firebase Realtime Database / Firestore), atau
  - Host copy & share link `host.html?last=NN` ke pemain, atau
  - Gunakan screen-sharing / projector agar semua pemain melihat layar host.

## Opsi pengembangan
- Tambahkan fitur login / room id agar host dan pemain terhubung via server.
- Tambah tombol "auto-mark" di pemain ketika host memanggil (butuh backend or WebSocket untuk realtime antar-device).

Selamat bermain! 🎉
