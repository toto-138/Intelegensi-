/* script.js
   Shared ADIL logic for Host & Player (no backend)
   - generates 10 boards of 16 unique numbers (1..50) and stores to localStorage
   - hostDraw: picks next random number (no duplicates) and stores history & last
   - players listen to storage events and highlight/check matching numbers
*/

const ADIL = (function(){
  const STORAGE_KEYS = {
    BOARDS: 'adil_boards_v2',
    HISTORY: 'adil_history_v2',
    LAST: 'adil_last_v2'
  };

  // util: sample k items without replacement
  function sample(arr, k) {
    const a = arr.slice();
    const res = [];
    for (let i=0;i<k;i++){
      const idx = Math.floor(Math.random()*a.length);
      res.push(a.splice(idx,1)[0]);
    }
    return res;
  }

  function generateBoards() {
    const boards = [];
    for (let b=0;b<10;b++){
      const pool = Array.from({length:50},(_,i)=>i+1);
      const board = sample(pool, 16);
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
    try { return JSON.parse(raw); } catch(e){ return null; }
  }

  function initBoardsIfNeeded() {
    if (!getBoards()) {
      const b = generateBoards();
      saveBoards(b);
      // notify other tabs
      localStorage.setItem('adil_dummy_boards', String(Date.now()));
      return b;
    }
    return getBoards();
  }

  function generateAndStoreBoards(force=false) {
    if (force) {
      const b = generateBoards();
      saveBoards(b);
      localStorage.setItem('adil_dummy_boards', String(Date.now()));
      return b;
    } else {
      return initBoardsIfNeeded();
    }
  }

  function getHistory() {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return raw ? JSON.parse(raw) : [];
  }

  function pushHistoryEntry(str) {
    const hist = getHistory();
    hist.unshift(str);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(hist));
    // update LAST as number only
    const m = str.match(/(\d{1,2})\b/);
    if (m) localStorage.setItem(STORAGE_KEYS.LAST, m[1]);
  }

  function getLast() {
    const v = localStorage.getItem(STORAGE_KEYS.LAST);
    return v ? Number(v) : null;
  }

  function hostDraw(opts={}) {
    // compute used numbers
    const used = getHistory().map(s=>{
      const m = s.match(/(\d{1,2})\b/);
      return m ? Number(m[1]) : null;
    }).filter(x=>x);
    // pool = numbers 1..50 not in used
    const pool = [];
    for (let i=1;i<=50;i++) if (!used.includes(i)) pool.push(i);
    if (!pool.length) {
      alert('Semua angka sudah keluar!');
      return null;
    }
    const idx = Math.floor(Math.random()*pool.length);
    const angka = pool[idx];
    const ts = new Date().toLocaleTimeString();
    const entry = `${ts} - ${angka}`;
    // animation support
    if (opts.animate && opts.displayEl) {
      const el = opts.displayEl;
      let t=0;
      const iv = setInterval(()=>{
        el.textContent = String(Math.floor(Math.random()*50)+1).padStart(2,'0');
        el.classList.add('pop');
        setTimeout(()=> el.classList.remove('pop'), 80);
        t+=100;
        if (t>=1400) {
          clearInterval(iv);
          el.textContent = String(angka).padStart(2,'0');
          el.classList.add('pop');
          setTimeout(()=> el.classList.remove('pop'), 400);
        }
      }, 100);
    }

    pushHistoryEntry(entry);
    // return angka
    return angka;
  }

  function resetHistory() {
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
    localStorage.removeItem(STORAGE_KEYS.LAST);
    localStorage.setItem('adil_dummy_ts', String(Date.now()));
  }

  function pushExternalNumber(n) {
    const ts = new Date().toLocaleTimeString();
    pushHistoryEntry(`${ts} - ${n}`);
  }

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
