/* script.js
   ADIL shared logic:
   - generate 10 boards (4x4) unique per board (no duplicates inside one board)
   - store boards in localStorage key ADIL_BOARDS_v1
   - host draws number -> saves last and history to localStorage
   - players read boards and listen for updates (storage event)
*/

const ADIL = (function() {
  const STORAGE_KEYS = {
    BOARDS: 'adil_boards_v1',
    HISTORY: 'adil_history_v1',
    LAST: 'adil_last_v1'
  };

  function randSample(arr, k) {
    const a = arr.slice();
    const r = [];
    for (let i=0;i<k;i++){
      const idx = Math.floor(Math.random()*a.length);
      r.push(a.splice(idx,1)[0]);
    }
    return r;
  }

  function generateBoards() {
    const boards = [];
    for (let b=0;b<10;b++){
      // sample 16 unique numbers from 1..50
      const pool = Array.from({length:50},(_,i)=>i+1);
      const board = randSample(pool,16);
      boards.push(board);
    }
    return boards;
  }

  function saveBoards(boards) {
    localStorage.setItem(STORAGE_KEYS.BOARDS, JSON.stringify(boards));
  }

  function getBoards() {
    const raw = localStorage.getItem(STORAGE_KEYS.BOARDS);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch(e) { return null; }
  }

  function initBoardsIfNeeded() {
    if (!getBoards()) {
      const boards = generateBoards();
      saveBoards(boards);
    }
  }

  // history: array of strings like "HH:MM:SS - NN"
  function getHistory() {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return raw ? JSON.parse(raw) : [];
  }

  function pushHistoryEntry(txt) {
    const h = getHistory();
    h.unshift(txt); // newest first
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(h));
    // also set LAST
    const lastNum = Number(String(txt).match(/\d+/));
    if (!isNaN(lastNum)) localStorage.setItem(STORAGE_KEYS.LAST, String(lastNum));
  }

  function getLast() {
    const v = localStorage.getItem(STORAGE_KEYS.LAST);
    return v ? Number(v) : null;
  }

  function hostDraw(opts={}) {
    // pick random from remaining 1..50 that not in history
    const used = getHistory().map(s => {
      const m = s.match(/(\d{1,2})/);
      return m ? Number(m[1]) : null;
    }).filter(x=>x);
    const pool = [];
    for (let i=1;i<=50;i++) if (!used.includes(i)) pool.push(i);
    if (!pool.length) {
      alert('Semua angka sudah keluar!');
      return null;
    }
    const index = Math.floor(Math.random()*pool.length);
    const angka = pool[index];
    const ts = new Date().toLocaleTimeString();
    const entry = `${ts} - ${angka}`;
    // animation if requested: update displayEl rapidly then set final
    if (opts.animate && opts.displayEl) {
      const el = opts.displayEl;
      let t = 0;
      const iv = setInterval(()=> {
        el.textContent = String(Math.floor(Math.random()*50)+1);
        el.style.transform = 'scale(1.2)';
        setTimeout(()=> el.style.transform = 'scale(1)', 80);
        t += 100;
        if (t >= 1500) {
          clearInterval(iv);
          el.textContent = String(angka);
        }
      }, 80);
    }
    pushHistoryEntry(entry);
    // broadcast via storage (localStorage already written). Return angka.
    // Some browsers won't fire storage event in same tab, but other tabs/devices will get update.
    return angka;
  }

  function resetHistory() {
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
    localStorage.removeItem(STORAGE_KEYS.LAST);
    // trigger storage events by toggling a dummy key
    localStorage.setItem('adil_dummy_ts', String(Date.now()));
  }

  function pushExternalNumber(n) {
    // used when opening share link ?last=NN
    const ts = new Date().toLocaleTimeString();
    pushHistoryEntry(`${ts} - ${n}`);
  }

  function generateAndStoreBoards(force=false) {
    if (force) {
      const b = generateBoards();
      saveBoards(b);
      // notify other tabs
      localStorage.setItem('adil_dummy_boards', String(Date.now()));
      return b;
    } else {
      initBoardsIfNeeded();
      return getBoards();
    }
  }

  // expose
  return {
    STORAGE_KEYS,
    initBoardsIfNeeded,
    generateAndStoreBoards,
    getBoards,
    getHistory,
    hostDraw,
    getLast,
    resetHistory,
    pushExternalNumber
  };
})();
