import { Component } from '../core/Component.js';

export class UserInfo extends Component {
    constructor({ user }) {
        super();
        this.user = user || {};
    }

    render() {

        const div = document.createElement('div');
        div.classList.add('user-info');
        const firstName = this.user.firstName
        const lastName = this.user.lastName
        const username = this.user.login
        const avatar = this.user.avatarUrl
        const attrs = this.user.attrs
        div.innerHTML = `
         <div class="card-img">
            <img src="${avatar}" alt="Avatar"/>
        </div>
                
         <div class="card-info">
            <h2>${username}</h2>
            <p>${firstName} ${lastName}</p>
        </div>
    `;

        return div
    }

}
