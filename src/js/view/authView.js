const authArea = document.getElementById('authArea');

export function renderUserSection(user) {
  authArea.innerHTML = `<div class="dropdown"><button class="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
              <i class="bi bi-person-circle"></i> ${user.name}
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><a class="dropdown-item" href="account.html"><i class="bi bi-gear"></i> Account Settings</a></li>
              <li><a class="dropdown-item" href="orders.html"><i class="bi bi-clock-history"></i> Order History</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" id='logoutBtn'><i class="bi bi-box-arrow-right"></i> Logout</a></li>
            </ul></div>
    `;
}
export function renderLoginSection() {
  authArea.innerHTML = `
      <a class="btn btn-outline-secondary" href="login.html">Login</a>
      <a class="btn btn-primary" href="register.html">Sign Up</a>
    `;
}

export function renderError(err) {
  const type = err.type;
  if (type === 'registration' || type === 'setting') {
    window.scrollTo({ top: 100, behavior: 'smooth' });

    const input = document.getElementsByName(`${err.value}`)[0];
    input.classList.add('error-input');
    const errorSpan = document.querySelector(`#${err.value}Error`);
    errorSpan.textContent = err.message;
  } else if (type === 'login') {
    document.querySelectorAll('input').forEach((inp) => inp.classList.add('error-input'));
    const errorSpan = document.querySelector(`#${err.value}`);
    errorSpan.textContent = err.message;
  }
}
export function resetError() {
  document.querySelectorAll('.error-input').forEach((el) => el.classList.remove('error-input'));
  document.querySelectorAll('.error').forEach((el) => (el.textContent = ''));
}

export function renderAccountSetting(user) {
  document.querySelector('#fullName').value = user.name;
  document.querySelector('#email').value = user.email;
}
