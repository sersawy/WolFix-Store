export function reset() {
  document.getElementById('contactForm').reset();
  document.getElementById('contactForm').style.display = 'block';
  document.getElementById('confirmationMessage').style.display = 'none';
}

export function renderConfirm() {
  document.getElementById('contactForm').style.display = 'none';
  document.getElementById('confirmationMessage').style.display = 'block';
}
