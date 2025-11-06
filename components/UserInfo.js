import { Component } from '../core/Component.js';

export class UserInfo extends Component {
    constructor({ user}) {
        super();
        this.user = user || {};
    }

      render() {
        
    const div = document.createElement('div');
    div.classList.add('user-info');

    const firstName = this.user.firstName || 'Unknown';
    const lastName = this.user.lastName || '';
    const login = this.user.login || 'username';
    const avatar = this.user.avatarUrl || '';

    div.innerHTML = `
        <h2>${firstName} ${lastName}</h2>
        <p>Username: ${login}</p>
        <div id ="profile"><img src="${avatar}" alt="Avatar"/><div>
    `;

    return div
}

}
