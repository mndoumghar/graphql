import { Page } from '../core/Page.js';
import { Auth } from '../utils/Auth.js';
import { Router } from "../core/Router.js"
import { Logo } from '../components/Logo.js';

export class LoginPage extends Page {
  constructor() {
    super({ title: 'Login' });
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('login-wrapper');
    const logo = new Logo();
    const logoBox = document.createElement('div');
    logoBox.classList.add('login-logo');
    logoBox.appendChild(logo.render());
    const formBox = document.createElement('div');
    formBox.classList.add('login-form');
    formBox.innerHTML = `
      <h1>GraphQl</h1>
      <p class="subtitle">Log in </p>
      <form id="loginForm">
        <div class="input-group">
          <input type="text" name="username" required />
          <label>Username or Email</label>
        </div>

        <div class="input-group">
          <input type="password" name="password" required />
          <label>Password</label>
        </div>

        <button class="login-btn" type="submit">Login</button>
        <p id="message-error" class="error-msg"></p>
      </form>
    `;

    wrapper.appendChild(logoBox);
    wrapper.appendChild(formBox);

    return wrapper;
  }

  async mount(parent) {
    super.mount(parent);

    const form = document.getElementById("loginForm");
    const errorMsg = document.getElementById("message-error");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const username = form.username.value.trim();
      const password = form.password.value.trim();
    if (!username || !password) {
        errorMsg.textContent = "Both fields required.";
        return;
      }

      try {
        await Auth.sign(username, password);
        errorMsg.textContent = "";
        new Router().navigator("/profile");
      } catch (err) {
        errorMsg.textContent = err?.message || "Invalid login.";
      }
    });
  }
}
