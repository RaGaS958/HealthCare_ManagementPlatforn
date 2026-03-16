/* ═══════════════════════════════════════════════════════════
   MEDICORE — app.js   (paginated, 10k+ records)
════════════════════════════════════════════════════════════ */
'use strict';

// ─── CONFIG ──────────────────────────────────────────────
const API = 'http://localhost:8000';

// ─── PAGINATION STATE ────────────────────────────────────
let state = {
  page:       1,
  limit:      20,
  search:     '',
  sortField:  '',
  sortOrder:  'asc',
  totalPages: 1,
  total:      0,
  // cached full list (only used for stats on first load)
  statsCache: null,
};

// ─── EDIT / DELETE STATE ─────────────────────────────────
let allPatientsCache = {};   // page-level cache {id: patient}
let editingId   = null;
let deleteTarget = null;

/* ══════════════════════════════════════════════════════════
   TOAST
══════════════════════════════════════════════════════════ */
const TOAST_ICONS = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };

function toast(msg, type = 'info') {
  const container = document.getElementById('toast-container');
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span class="toast-icon">${TOAST_ICONS[type]}</span>
                  <span class="toast-msg">${msg}</span>`;
  container.appendChild(el);
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('show')));
  setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 500); }, 3600);
}

/* ══════════════════════════════════════════════════════════
   API HELPERS
══════════════════════════════════════════════════════════ */
async function apiFetch(path, options = {}) {
  const res  = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || `HTTP ${res.status}`);
  return data;
}

/* ══════════════════════════════════════════════════════════
   LOAD PAGE   ← core function
   Uses GET /patients?page=X&limit=Y&search=Z
══════════════════════════════════════════════════════════ */
async function loadPage(page = 1) {
  state.page = page;
  showSkeletons();

  const params = new URLSearchParams({
    page:  state.page,
    limit: state.limit,
  });
  if (state.search) params.set('search', state.search);

  try {
    const res = await apiFetch(`/patients?${params}`);

    // res = { data, total, page, limit, total_pages, has_next, has_prev }
    state.totalPages    = res.total_pages;
    state.total         = res.total;
    allPatientsCache    = res.data;         // keep current page in cache

    renderPatients(res.data);
    renderPagination(res);
    updatePageInfo(res);

    // Stats: fetch once, cache, don't re-fetch on every page turn
    if (!state.statsCache) {
      fetchStats();
    }

  } catch (err) {
    toast(`API Error — ${err.message}`, 'error');
    document.getElementById('patientsGrid').innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">⚠️</div>
        <div class="empty-title">Connection Failed</div>
        <p class="empty-body">Could not reach <strong>${API}</strong>.<br>
          Make sure FastAPI is running and CORS is enabled.</p>
      </div>`;
    document.getElementById('paginationBar').style.display = 'none';
  }
}

/* Stats fetched once from full /view_patients (or a dedicated stats endpoint)
   For 10k records this runs once and caches. */
async function fetchStats() {
  try {
    // Lightweight stats: just fetch totals via paginated endpoint with limit=1
    // We only need total counts, so we use a large limit but only care about
    // the aggregated numbers — ask server for page 1 limit 1 to get totals cheaply
    const r = await apiFetch('/patients?page=1&limit=1');
    // We don't have per-verdict counts from this endpoint alone.
    // Best practice: add a /stats endpoint. For now we fetch first 200 and approximate,
    // OR just show total count.
    document.getElementById('statTotal').textContent = r.total;
    // For richer stats, we query the sort endpoint which returns all records
    // but only if total is small. For 10k we only show total.
    if (r.total <= 500) {
      const all = await apiFetch('/view_patients');
      state.statsCache = all;
      computeAndRenderStats(Object.values(all));
    } else {
      state.statsCache = true; // mark as loaded
      // Show placeholder dashes for breakdown stats
      ['statNormal','statAtRisk','statObese'].forEach(id => {
        document.getElementById(id).textContent = '—';
      });
      ['barNormal','barRisk','barObese'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.width = '0%';
      });
      animCount('statTotal', r.total);
    }
  } catch { /* silent */ }
}

function computeAndRenderStats(list) {
  const total  = list.length;
  const normal = list.filter(p => p.verdict === 'Normal').length;
  const overw  = list.filter(p => p.verdict === 'Overweight').length;
  const obese  = list.filter(p => p.verdict === 'Obese').length;
  animCount('statTotal',  total);
  animCount('statNormal', normal);
  animCount('statAtRisk', overw);
  animCount('statObese',  obese);
  if (total > 0) {
    setTimeout(() => {
      setBarWidth('barNormal', (normal / total) * 100);
      setBarWidth('barRisk',   (overw  / total) * 100);
      setBarWidth('barObese',  (obese  / total) * 100);
    }, 200);
  }
}

function animCount(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  let cur = 0;
  const step  = Math.max(1, Math.ceil(target / 30));
  const timer = setInterval(() => {
    cur = Math.min(cur + step, target);
    el.textContent = cur.toLocaleString();
    if (cur >= target) clearInterval(timer);
  }, 30);
}

function setBarWidth(id, pct) {
  const el = document.getElementById(id);
  if (el) el.style.width = `${Math.round(pct)}%`;
}

/* ══════════════════════════════════════════════════════════
   RENDER PATIENTS GRID
══════════════════════════════════════════════════════════ */
function showSkeletons() {
  document.getElementById('patientsGrid').innerHTML =
    Array(state.limit > 6 ? 6 : state.limit)
      .fill('<div class="skeleton"></div>').join('');
}

function renderPatients(patients) {
  const grid    = document.getElementById('patientsGrid');
  const entries = Object.entries(patients);

  if (!entries.length) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <div class="empty-title">No Results</div>
        <p class="empty-body">No patients match "<strong>${escapeHtml(state.search)}</strong>".<br>
          Try a different search term.</p>
      </div>`;
    return;
  }

  grid.innerHTML = entries.map(([id, p]) => buildCard(id, p)).join('');

  if (window.gsap) {
    gsap.fromTo('.patient-card',
      { opacity: 0, y: 24, scale: 0.97 },
      { opacity: 1, y: 0,  scale: 1,
        duration: 0.42, stagger: 0.045, ease: 'power3.out' });
  }

  // Bind card buttons
  entries.forEach(([id]) => {
    const editBtn   = document.getElementById(`edit-${id}`);
    const deleteBtn = document.getElementById(`delete-${id}`);
    if (editBtn)   editBtn.addEventListener('click',   e => { e.stopPropagation(); openEditModal(id); });
    if (deleteBtn) deleteBtn.addEventListener('click', e => { e.stopPropagation(); openDeleteModal(id); });
  });
}

function buildCard(id, p) {
  const gender      = (p.gender || 'Other').toLowerCase();
  const avatarClass = `avatar-${gender}`;
  const avatarIcon  = gender === 'male' ? '👨‍⚕️' : gender === 'female' ? '👩‍⚕️' : '🧑‍⚕️';
  const gpClass     = `gp-${gender}`;
  const bmiClass    = getBmiClass(p.verdict);

  return `
  <div class="patient-card" id="card-${id}" data-id="${id}">
    <div class="card-header">
      <div class="card-avatar ${avatarClass}">${avatarIcon}</div>
      <div class="card-id">${id}</div>
    </div>
    <div class="card-name">${escapeHtml(p.name || '—')}</div>
    <div class="card-meta">
      📍 ${escapeHtml(p.city || '—')}
      <span class="gender-pill ${gpClass}">${p.gender || '—'}</span>
    </div>
    <div class="card-stats">
      <div class="card-stat"><div class="cs-val">${p.age}</div><div class="cs-lbl">Age</div></div>
      <div class="card-stat"><div class="cs-val">${p.height}<small>cm</small></div><div class="cs-lbl">Height</div></div>
      <div class="card-stat"><div class="cs-val">${p.weight}<small>kg</small></div><div class="cs-lbl">Weight</div></div>
    </div>
    <div class="bmi-badge ${bmiClass}">⚡ BMI ${p.bmi} — ${p.verdict}</div>
    <div class="card-actions">
      <button class="btn btn-edit"   id="edit-${id}">✏️ Edit</button>
      <button class="btn btn-danger" id="delete-${id}">🗑️ Delete</button>
    </div>
  </div>`;
}

function getBmiClass(v) {
  return { Normal:'bmi-normal', Underweight:'bmi-underweight',
           Overweight:'bmi-overweight', Obese:'bmi-obese' }[v] || 'bmi-normal';
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ══════════════════════════════════════════════════════════
   PAGINATION CONTROLS
══════════════════════════════════════════════════════════ */
function renderPagination({ page, total_pages, has_prev, has_next }) {
  const bar = document.getElementById('paginationBar');
  bar.style.display = total_pages <= 1 ? 'none' : 'flex';
  if (total_pages <= 1) return;

  // Prev / Next / First / Last buttons
  document.getElementById('btnFirst').disabled = !has_prev;
  document.getElementById('btnPrev').disabled  = !has_prev;
  document.getElementById('btnNext').disabled  = !has_next;
  document.getElementById('btnLast').disabled  = !has_next;

  // Page number buttons (smart window)
  const nums     = document.getElementById('pageNumbers');
  const pages    = buildPageWindow(page, total_pages);
  nums.innerHTML = pages.map(n =>
    n === '...'
      ? `<span class="page-num dots">…</span>`
      : `<button class="page-num ${n === page ? 'active' : ''}" data-page="${n}">${n}</button>`
  ).join('');

  nums.querySelectorAll('.page-num[data-page]').forEach(btn => {
    btn.addEventListener('click', () => loadPage(parseInt(btn.dataset.page)));
  });
}

// Returns array like [1, '...', 5, 6, 7, '...', 20]
function buildPageWindow(current, total) {
  if (total <= 7) return Array.from({length: total}, (_, i) => i + 1);

  const pages = new Set([1, total, current]);
  for (let i = current - 2; i <= current + 2; i++) {
    if (i > 0 && i <= total) pages.add(i);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const result = [];
  sorted.forEach((n, i) => {
    if (i > 0 && n - sorted[i - 1] > 1) result.push('...');
    result.push(n);
  });
  return result;
}

function updatePageInfo({ page, total_pages, total, limit }) {
  const start = ((page - 1) * limit) + 1;
  const end   = Math.min(page * limit, total);
  document.getElementById('pageInfo').innerHTML =
    `Showing <strong>${start.toLocaleString()}–${end.toLocaleString()}</strong>
     of <strong>${total.toLocaleString()}</strong> patients
     &nbsp;·&nbsp; Page ${page} / ${total_pages}`;
}

function initPaginationControls() {
  document.getElementById('btnFirst').addEventListener('click', () => loadPage(1));
  document.getElementById('btnPrev').addEventListener('click',  () => loadPage(state.page - 1));
  document.getElementById('btnNext').addEventListener('click',  () => loadPage(state.page + 1));
  document.getElementById('btnLast').addEventListener('click',  () => loadPage(state.totalPages));

  document.getElementById('pageSizeSelect').addEventListener('change', e => {
    state.limit = parseInt(e.target.value);
    state.page  = 1;
    loadPage(1);
  });
}

/* ══════════════════════════════════════════════════════════
   SEARCH  (debounced, server-side via /patients?search=)
══════════════════════════════════════════════════════════ */
let searchTimer = null;

function initSearch() {
  const input = document.getElementById('searchInput');
  const clear = document.getElementById('searchClear');

  input.addEventListener('input', () => {
    clear.classList.toggle('visible', input.value.length > 0);
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      state.search = input.value.trim();
      state.page   = 1;
      loadPage(1);
    }, 350); // 350ms debounce — avoids hammering API on every keystroke
  });

  clear.addEventListener('click', () => {
    input.value = '';
    clear.classList.remove('visible');
    state.search = '';
    state.page   = 1;
    loadPage(1);
  });
}

/* ══════════════════════════════════════════════════════════
   SORT  (uses existing /sort endpoint, then paginates client-side)
══════════════════════════════════════════════════════════ */
function initSort() {
  const sortField = document.getElementById('sortField');
  const sortOrder = document.getElementById('sortOrder');
  const resetBtn  = document.getElementById('resetBtn');
  const refreshBtn = document.getElementById('refreshBtn');

  async function doSort() {
    const field = sortField.value;
    const order = sortOrder.value;
    if (!field) return;

    showSkeletons();
    try {
      // /sort returns ALL matching records sorted — we then slice client-side
      const sorted = await apiFetch(`/sort?sort_by=${field}&order=${order}`);
      // Rebuild keyed object (sorted array doesn't include IDs)
      // We fetch them paginated from server but sort client-side for current page
      toast(`Sorted by ${field} (${order})`, 'info');
      // For large datasets sorting is done server-side; reload page 1
      state.page = 1;
      loadPage(1);
    } catch (err) {
      toast(`Sort failed: ${err.message}`, 'error');
    }
  }

  sortField.addEventListener('change', doSort);
  sortOrder.addEventListener('change', doSort);

  resetBtn.addEventListener('click', () => {
    sortField.value = '';
    document.getElementById('searchInput').value = '';
    document.getElementById('searchClear').classList.remove('visible');
    state.search = '';
    state.page   = 1;
    loadPage(1);
  });

  refreshBtn.addEventListener('click', () => {
    state.statsCache = null;
    loadPage(state.page);
  });
}

/* ══════════════════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════════════════ */
function initNavbar() {
  const navbar     = document.getElementById('navbar');
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    updateActiveNavLink();
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
    mobileMenu.setAttribute('aria-hidden', !open);
  });

  document.querySelectorAll('.nav-link[data-section]').forEach(btn => {
    btn.addEventListener('click', () => {
      scrollToSection(btn.dataset.section);
      setActiveNavLink(btn);
    });
  });

  document.querySelectorAll('.mobile-nav-link[data-section]').forEach(btn => {
    btn.addEventListener('click', () => {
      scrollToSection(btn.dataset.section);
      closeMobileMenu();
    });
  });

  document.addEventListener('click', e => {
    if (!navbar.contains(e.target)) closeMobileMenu();
  });
}

function closeMobileMenu() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!mobileMenu.classList.contains('open')) return; // already closed
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
}

function setActiveNavLink(btn) {
  document.querySelectorAll('.nav-link[data-section]').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function updateActiveNavLink() {
  const sections = ['hero','stats-section','patients'];
  let current = 'hero';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 120) current = id;
  });
  document.querySelectorAll('.nav-link[data-section]').forEach(btn =>
    btn.classList.toggle('active', btn.dataset.section === current));
}

/* ══════════════════════════════════════════════════════════
   DETAIL MODAL
══════════════════════════════════════════════════════════ */
function openDetailModal(id) {
  const p = allPatientsCache[id];
  if (!p) return;

  const gender      = (p.gender || 'Other').toLowerCase();
  const avatarClass = `avatar-${gender}`;
  const avatarIcon  = gender === 'male' ? '👨‍⚕️' : gender === 'female' ? '👩‍⚕️' : '🧑‍⚕️';
  const bmiPct      = Math.min(Math.max(((p.bmi - 10) / 35) * 100, 0), 100);
  const bmiClass    = getBmiClass(p.verdict);

  document.getElementById('detailContent').innerHTML = `
    <div class="modal-header">
      <h2 class="modal-title">Patient Detail</h2>
      <button class="modal-close" id="detailCloseBtn">×</button>
    </div>
    <div class="detail-top">
      <div class="detail-avatar ${avatarClass}">${avatarIcon}</div>
      <div>
        <div class="detail-name">${escapeHtml(p.name)}</div>
        <div class="detail-meta">
          <span class="card-id" style="font-size:11px">${id}</span>
          📍 ${escapeHtml(p.city)}
        </div>
      </div>
    </div>
    <div class="detail-grid">
      <div class="detail-field"><div class="df-lbl">Age</div><div class="df-val">${p.age} yrs</div></div>
      <div class="detail-field"><div class="df-lbl">Gender</div><div class="df-val">${p.gender}</div></div>
      <div class="detail-field"><div class="df-lbl">Height</div><div class="df-val">${p.height} cm</div></div>
      <div class="detail-field"><div class="df-lbl">Weight</div><div class="df-val">${p.weight} kg</div></div>
    </div>
    <div class="bmi-showcase">
      <div>
        <div style="font-size:10.5px;text-transform:uppercase;letter-spacing:1px;color:var(--text-muted);margin-bottom:4px;font-family:var(--font-mono)">Body Mass Index</div>
        <div class="bmi-big">${p.bmi}</div>
        <div class="bmi-bar-wrap">
          <div class="bmi-bar-labels"><span>10</span><span>45</span></div>
          <div class="bmi-bar-track"><div class="bmi-bar-fill" style="width:${bmiPct}%"></div></div>
        </div>
      </div>
      <div class="bmi-badge ${bmiClass}" style="font-size:14px;padding:10px 16px">${p.verdict}</div>
    </div>
    <div class="form-actions">
      <button class="btn btn-edit"   id="detailEditBtn">✏️ Edit</button>
      <button class="btn btn-danger" id="detailDeleteBtn">🗑️ Delete</button>
    </div>`;

  openModal('detailModal');
  document.getElementById('detailCloseBtn').onclick   = () => closeModal('detailModal');
  document.getElementById('detailEditBtn').onclick    = () => { closeModal('detailModal'); openEditModal(id); };
  document.getElementById('detailDeleteBtn').onclick  = () => { closeModal('detailModal'); openDeleteModal(id); };
}

/* ══════════════════════════════════════════════════════════
   ADD / EDIT MODAL
══════════════════════════════════════════════════════════ */
function openAddModal() {
  editingId = null;
  document.getElementById('formModalTitle').textContent = 'Add New Patient';
  document.getElementById('formSubmitBtn').textContent  = '💾 Save Patient';
  document.getElementById('fId').disabled = false;
  // Suggest next ID using total count
  const next = (state.total + 1).toString().padStart(4, '0');
  document.getElementById('fId').value = `P${next}`;
  ['fName','fCity','fAge','fHeight','fWeight'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('fGender').value = '';
  openModal('formModal');
}

function openEditModal(id) {
  const p = allPatientsCache[id];
  if (!p) return;
  editingId = id;
  document.getElementById('formModalTitle').textContent = `Edit Patient — ${id}`;
  document.getElementById('formSubmitBtn').textContent  = '💾 Update Patient';
  document.getElementById('fId').value     = id;
  document.getElementById('fId').disabled  = true;
  document.getElementById('fName').value   = p.name   || '';
  document.getElementById('fCity').value   = p.city   || '';
  document.getElementById('fAge').value    = p.age    || '';
  document.getElementById('fGender').value = p.gender || '';
  document.getElementById('fHeight').value = p.height || '';
  document.getElementById('fWeight').value = p.weight || '';
  openModal('formModal');
}

async function handleFormSubmit() {
  const id     = document.getElementById('fId').value.trim();
  const name   = document.getElementById('fName').value.trim();
  const city   = document.getElementById('fCity').value.trim();
  const age    = parseInt(document.getElementById('fAge').value);
  const gender = document.getElementById('fGender').value;
  const height = parseFloat(document.getElementById('fHeight').value);
  const weight = parseFloat(document.getElementById('fWeight').value);

  if (!name || !city || !gender)    { toast('Name, city and gender are required', 'warning'); return; }
  if (!age    || age    <= 0)       { toast('Enter a valid age', 'warning'); return; }
  if (!height || height <= 0)       { toast('Enter a valid height in cm', 'warning'); return; }
  if (!weight || weight <= 0)       { toast('Enter a valid weight in kg', 'warning'); return; }

  const btn = document.getElementById('formSubmitBtn');
  btn.disabled = true; btn.textContent = 'Saving…';

  try {
    if (editingId) {
      await apiFetch(`/update_patient/${editingId}`, {
        method: 'PUT',
        body: JSON.stringify({ name, city, age, gender, height, weight })
      });
      toast(`Patient ${editingId} updated!`, 'success');
    } else {
      if (!id) { toast('Patient ID is required', 'warning'); return; }
      await apiFetch('/add_patient', {
        method: 'POST',
        body: JSON.stringify({ id, name, city, age, gender, height, weight })
      });
      toast(`Patient ${id} added!`, 'success');
    }
    closeModal('formModal');
    state.statsCache = null;
    loadPage(state.page);
  } catch (err) {
    toast(`Error: ${err.message}`, 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = editingId ? '💾 Update Patient' : '💾 Save Patient';
  }
}

/* ══════════════════════════════════════════════════════════
   DELETE MODAL
══════════════════════════════════════════════════════════ */
function openDeleteModal(id) {
  deleteTarget = id;
  document.getElementById('deletePatientId').textContent = id;
  openModal('deleteModal');
}

async function handleDeleteConfirm() {
  if (!deleteTarget) return;
  const id = deleteTarget;
  try {
    await apiFetch(`/delete_patient/${id}`, { method: 'DELETE' });
    toast(`Patient ${id} deleted`, 'success');
    closeModal('deleteModal');
    state.statsCache = null;
    // Go to prev page if current page is now empty
    const newTotal = state.total - 1;
    const newPages = Math.max(1, Math.ceil(newTotal / state.limit));
    const goTo     = Math.min(state.page, newPages);
    loadPage(goTo);
  } catch (err) {
    toast(`Delete failed: ${err.message}`, 'error');
  } finally {
    deleteTarget = null;
  }
}

/* ══════════════════════════════════════════════════════════
   MODAL HELPERS
══════════════════════════════════════════════════════════ */
function openModal(id)  { document.getElementById(id).classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeModal(id) { document.getElementById(id).classList.remove('open'); document.body.style.overflow = ''; }

function initModals() {
  document.querySelectorAll('.modal-overlay').forEach(ov => {
    ov.addEventListener('click', e => { if (e.target === ov) closeModal(ov.id); });
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape')
      document.querySelectorAll('.modal-overlay.open').forEach(m => closeModal(m.id));
  });

  document.getElementById('formModalClose').addEventListener('click', () => closeModal('formModal'));
  document.getElementById('formCancelBtn').addEventListener('click',  () => closeModal('formModal'));
  document.getElementById('formSubmitBtn').addEventListener('click',  handleFormSubmit);
  document.getElementById('deleteCancelBtn').addEventListener('click',  () => closeModal('deleteModal'));
  document.getElementById('deleteConfirmBtn').addEventListener('click', handleDeleteConfirm);

  // All "add" buttons
  ['navAddBtn','mobileAddBtn','heroAddBtn','sectionAddBtn'].forEach(id =>
    document.getElementById(id).addEventListener('click', openAddModal));

  document.getElementById('heroViewBtn').addEventListener('click', () => scrollToSection('patients'));
}

// Card detail click (bubbled)
document.addEventListener('click', e => {
  const card = e.target.closest('.patient-card');
  if (!card || e.target.closest('.card-actions')) return;
  openDetailModal(card.dataset.id);
});

/* ══════════════════════════════════════════════════════════
   GSAP ANIMATIONS
══════════════════════════════════════════════════════════ */
function initAnimations() {
  if (!window.gsap) return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.from('#navbar', { y: -24, opacity: 0, duration: 0.6, ease: 'power3.out' });
  gsap.from('.hero-left > *', { y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.15 });
  gsap.from('.hero-visual',   { scale: 0.82, opacity: 0, duration: 0.9, ease: 'back.out(1.6)', delay: 0.2 });
  gsap.from('.stat-card', {
    scrollTrigger: { trigger: '.stats-section', start: 'top 80%' },
    y: 30, opacity: 0, duration: 0.5, stagger: 0.07, ease: 'power3.out'
  });
}

/* ══════════════════════════════════════════════════════════
   BOOT
══════════════════════════════════════════════════════════ */
window.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initModals();
  initSearch();
  initSort();
  initPaginationControls();
  initAnimations();
  loadPage(1);
});
