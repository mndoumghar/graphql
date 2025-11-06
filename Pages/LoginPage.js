import { Page } from '../core/Page.js';
import { Auth } from '../utils/Auth.js';
import { Storage } from '../utils/Storage.js';

export class LoginPage extends Page {
    constructor() {
        super({ title: 'Login' });
    }

    render() {
        const div = document.createElement('div');
        div.classList.add('login-page');

        div.innerHTML = `
            <h2>Login</h2>
            <form id="loginForm">
                <input type="text" name="username" placeholder="Username or Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit">Login</button>
                <p id="message-error" style="color:red;"></p>
            </form>
        `;
        return div;
    }

    mount(parent) {
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
                await Auth.sign(username, password);
                errorMsg.textContent = "";
               window.router.navigator('/profile');
            } catch (err) {
                console.error(err);
                errorMsg.textContent = "Login failed, check your credentials!";
            }
        });
    }
}
