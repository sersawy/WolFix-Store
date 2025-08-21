const authArea = document.getElementById('authArea');

export function renderUserSection(user) {
  authArea.innerHTML = `
      <span class="text-muted small me-1">Hi, ${user.name}</span>
      <button class="btn btn-outline-danger btn-sm" id="logoutBtn">Logout</button>
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
  if (type === 'registration') {
    const input = document.getElementsByName(`${err.value}`)[0];
    input.classList.add('error-input');
    const errorSpan = document.querySelector(`#${err.value}Error`);
    errorSpan.textContent = err.message;
  } else if (type === 'login') {
    document.querySelectorAll('input').forEach((inp) => inp.classList.add('error-input'));
    const errorSpan = document.querySelector(`#${err.value}`);
    errorSpan.textContent = err.message;
  }
  // console.error(err.message);
}
export function resetError() {
  document.querySelectorAll('.error-input').forEach((el) => el.classList.remove('error-input'));
  document.querySelectorAll('.error').forEach((el) => (el.textContent = ''));
}
