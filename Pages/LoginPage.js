import { Page } from '../core/Page.js';
import { Auth } from '../utils/Auth.js';
import { Storage } from '../utils/Storage.js';

export class LoginPage extends Page {
    constructor() {
        super({ title: 'Login' });
    }

    render() {
        const div = document.createElement('div');
        div.classList.add('login-box');

        div.innerHTML = `
            <h2>Login</h2>
            <centre>
          <form id="loginForm">
            <div class = "user-box">
                <input type="text" name="username" placeholder="Username or Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit">Login</button>
                <div = "error">
                <p id="message-error"></p>
                </div>
            </div>
        </form>
            
            <center>
        `;
        return div;
    }

async mount(parent) {
  super.mount(parent);
  const form = document.getElementById('loginForm');
  const errorMsg = document.getElementById('message-error');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = form.username.value.trim();
    const password = form.password.value.trim();

    if (!username || !password) {
      errorMsg.textContent = "Please fill in both fields!";
      return;
    }

    try {
      const token = await Auth.sign(username, password);
      errorMsg.textContent = "";
      location.hash = '#/';
    } catch (err) {
      console.error('Login error:', err);
      errorMsg.textContent = err?.message || 'Login failed, check your credentials!';
    }
  });
}
}