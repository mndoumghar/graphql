
export class LoginPAge extends Page {
    constructor() {
        super({ title: 'Login' });
    }

    render() {
        const div = document.createElement('div')
        div.classList.add('login-page')
        div.innerHTML = `
                <h2>Login</h2>
                <from id= "loginForm">
                    <input type="text" name="username" placeholder="Username or Email"  />
                    <input type="password"  placeholder ="Write ur Password ..." />
                    <button type="submit">Login</button>
                    <p id= "message-error"></p>
                    </form>`;
        return div
    }
    mount(parent) {
        super.mount(parent)
        const form = document.getElementById('loginForm');
        const errorMsg = document.getElementById('message-error');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = form.username.value;
            const password = form.password.value;
            try {
                const token = await Auth.sign(username,password)
                window.router.navigate('/profile');
            } catch(err) {
                errorMsg.textContent=  "Login faild chech ...."
            }
        });
    }

}