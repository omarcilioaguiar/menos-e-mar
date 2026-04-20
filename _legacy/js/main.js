/* ============================================
   BLOG PESSOAL — JS PRINCIPAL
   ============================================ */

// ── THEME ──────────────────────────────────

const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

function getTheme() {
  return localStorage.getItem('blog-theme') || 
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
}

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('blog-theme', theme);
}

applyTheme(getTheme());

themeToggle?.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// ── LIKES ──────────────────────────────────

function getLikes() {
  try { return JSON.parse(localStorage.getItem('blog-likes') || '{}'); }
  catch { return {}; }
}

function saveLikes(likes) {
  localStorage.setItem('blog-likes', JSON.stringify(likes));
}

function initLikes() {
  const likes = getLikes();
  document.querySelectorAll('.like-btn').forEach(btn => {
    const postId = btn.dataset.post;
    if (likes[postId]) {
      btn.classList.add('liked');
    }

    btn.addEventListener('click', () => {
      const current = getLikes();
      const countEl = btn.querySelector('.like-count');
      const isLiked = btn.classList.contains('liked');
      let count = parseInt(countEl.textContent) || 0;

      if (isLiked) {
        btn.classList.remove('liked');
        delete current[postId];
        count = Math.max(0, count - 1);
      } else {
        btn.classList.add('liked');
        current[postId] = true;
        count += 1;
        // micro feedback
        btn.style.transform = 'scale(1.12)';
        setTimeout(() => btn.style.transform = '', 200);
      }

      countEl.textContent = count;
      saveLikes(current);
    });
  });
}

initLikes();

// ── SHARE MODAL ─────────────────────────────

const shareModal = document.getElementById('shareModal');
const modalClose = document.getElementById('modalClose');
const shareUrlInput = document.getElementById('shareUrlInput');
const copyBtn = document.getElementById('copyBtn');
const shareTwitter = document.getElementById('shareTwitter');
const shareWhatsapp = document.getElementById('shareWhatsapp');

function openShareModal(url, title) {
  const fullUrl = `${location.origin}/${url}`;
  shareUrlInput.value = fullUrl;
  shareTwitter.href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`;
  shareWhatsapp.href = `https://wa.me/?text=${encodeURIComponent(title + ' ' + fullUrl)}`;
  shareModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeShareModal() {
  shareModal.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.share-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const url = btn.dataset.url;
    const title = btn.dataset.title;

    // Try native share first (mobile)
    if (navigator.share) {
      navigator.share({ title, url: `${location.origin}/${url}` }).catch(() => {});
    } else {
      openShareModal(url, title);
    }
  });
});

modalClose?.addEventListener('click', closeShareModal);
shareModal?.addEventListener('click', (e) => {
  if (e.target === shareModal) closeShareModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeShareModal();
});

// ── COPY URL ────────────────────────────────

const toast = document.getElementById('toast');

function showToast(msg = 'Link copiado! ✓') {
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

copyBtn?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(shareUrlInput.value);
    showToast('Link copiado! ✓');
    copyBtn.textContent = 'Copiado!';
    setTimeout(() => (copyBtn.textContent = 'Copiar'), 2000);
  } catch {
    shareUrlInput.select();
  }
});

// ── COMMENT FORM ────────────────────────────

const commentForm = document.getElementById('commentForm');
const commentList = document.getElementById('commentList');

function getComments(postId) {
  try { return JSON.parse(localStorage.getItem(`blog-comments-${postId}`) || '[]'); }
  catch { return []; }
}

function saveComments(postId, comments) {
  localStorage.setItem(`blog-comments-${postId}`, JSON.stringify(comments));
}

function renderComment(comment) {
  const initials = comment.name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
  const div = document.createElement('div');
  div.className = 'comment-item';
  div.innerHTML = `
    <div class="comment-meta">
      <div class="comment-avatar">${initials}</div>
      <span class="comment-author">${escapeHtml(comment.name)}</span>
      <span class="comment-date">${comment.date}</span>
    </div>
    <p class="comment-text">${escapeHtml(comment.text)}</p>
  `;
  return div;
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function initComments() {
  if (!commentForm || !commentList) return;

  const postId = commentForm.dataset.post;
  const existing = getComments(postId);

  // render stored comments
  existing.forEach(c => commentList.appendChild(renderComment(c)));

  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = commentForm.querySelector('#commentName').value.trim();
    const email = commentForm.querySelector('#commentEmail').value.trim();
    const text = commentForm.querySelector('#commentText').value.trim();

    if (!name || !text) return;

    const now = new Date();
    const date = now.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
    const comment = { name, email, text, date };

    const all = getComments(postId);
    all.push(comment);
    saveComments(postId, all);

    const el = renderComment(comment);
    commentList.appendChild(el);
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    commentForm.reset();
    showToast('Comentário publicado! ✓');

    // update count in social btns if on same page
    document.querySelectorAll(`.comment-btn[data-post="${postId}"] span`).forEach(s => {
      s.textContent = parseInt(s.textContent || 0) + 1;
    });
  });
}

initComments();

// ── READING PROGRESS ────────────────────────

function initReadingProgress() {
  if (!document.querySelector('.article-body')) return;
  const bar = document.createElement('div');
  bar.className = 'reading-progress';
  bar.style.width = '0%';
  document.body.prepend(bar);

  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
    bar.style.width = `${Math.min(100, progress)}%`;
  }, { passive: true });
}

initReadingProgress();

// ── COMMENT BUTTON SCROLL ───────────────────

document.querySelectorAll('.comment-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const section = document.querySelector('.comments-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
