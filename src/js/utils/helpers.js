export function sendNotification(message, type = 'primary', icon = null) {
  // Create toast container if it doesn't exist
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast align-items-center border-0 show toast-${type}`;

  // Determine icon based on type if not provided
  let toastIcon = icon;
  if (!toastIcon) {
    switch (type) {
      case 'success':
        toastIcon = 'bi-check-circle-fill';
        break;
      case 'error':
        toastIcon = 'bi-x-circle-fill';
        break;
      case 'warning':
        toastIcon = 'bi-exclamation-triangle-fill';
        break;
      case 'info':
        toastIcon = 'bi-info-circle-fill';
        break;
      case 'primary':
      default:
        toastIcon = 'bi-bell-fill';
        break;
    }
  }

  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body toast-with-icon">
        ${toastIcon ? `<i class="toast-icon ${toastIcon}"></i>` : ''}
        ${message}
      </div>
      <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `;

  toastContainer.appendChild(toast);

  // Auto remove after delay
  setTimeout(() => {
    toast.classList.add('hiding');
    setTimeout(() => toast.remove(), 300);
  }, 3000);

  // Add click handler for close button
  const closeButton = toast.querySelector('.btn-close');
  closeButton.addEventListener('click', () => {
    toast.classList.add('hiding');
    setTimeout(() => toast.remove(), 300);
  });
}
export function handelScrollUp() {
  const btn = document.getElementById('btn-back-to-top');

  window.addEventListener('scroll', function () {
    if (scrollY > 50) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
