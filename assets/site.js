const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('.mobile-links');

function closeMenu(restoreFocus = false) {
  menu.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  if (restoreFocus) toggle.focus();
}

toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  menu.classList.toggle('open', open);
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.classList.contains('open')) closeMenu(true);
});
document.addEventListener('click', event => {
  if (!event.target.closest('.hero-header')) closeMenu();
});

const form = document.getElementById('form-aulas');
form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const message = `Olá, Dom Cray! Quero informações sobre aulas.
Nome: ${String(data.get('nome')).trim()}
WhatsApp: ${String(data.get('whatsapp')).trim()}
Nível: ${data.get('nivel')}
Mensagem: ${String(data.get('mensagem')).trim()}`;
  // Opening a draft never sends a message automatically.
  const url = 'https://wa.me/5511969651798?text=' + encodeURIComponent(message);
  const draft = window.open(url, '_blank');
  if (draft) {
    draft.opener = null;
    document.getElementById('form-status').textContent = 'Confira a mensagem no WhatsApp e envie quando desejar.';
  } else {
    window.location.assign(url);
  }
});

const lightbox = document.querySelector('.lightbox');
const largePhoto = lightbox.querySelector('img');
let photoTrigger;
document.querySelectorAll('.photo-button').forEach(button => {
  button.addEventListener('click', () => {
    photoTrigger = button;
    largePhoto.src = button.dataset.full;
    largePhoto.alt = button.querySelector('img').alt;
    lightbox.showModal();
    document.body.classList.add('modal-open');
  });
});
lightbox.querySelector('.close-lightbox').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) lightbox.close();
});
lightbox.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  photoTrigger?.focus();
});
document.querySelectorAll('video').forEach(video => {
  video.addEventListener('play', () => {
    document.querySelectorAll('video').forEach(other => {
      if (other !== video) other.pause();
    });
  });
});
document.getElementById('ano').textContent = new Date().getFullYear();
