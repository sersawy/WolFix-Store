export function sendNotification(message) {
  const toast = document.createElement('div');
  toast.className = 'toast align-items-center text-bg-primary border-0 position-fixed bottom-0 end-0 m-4 show';
  toast.innerHTML = `<div class="d-flex"><div class="toast-body">${message}</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button></div>`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 1500);
}
