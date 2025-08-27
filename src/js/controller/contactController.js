import * as contactView from '../view/contactView.js';
import { handelShowLoading, sendNotification } from '../utils/helpers.js';

export function init() {
  addListener();
}
function addListener() {
  document.querySelector('.btn-send-again').addEventListener('click', contactView.reset);
  document.getElementById('contactForm').addEventListener('submit', handelSendMessage);
}

async function handelSendMessage(e) {
  e.preventDefault();
  await handelShowLoading();
  sendNotification('Message Sent Successfully!', 'success');
  contactView.renderConfirm();
}
