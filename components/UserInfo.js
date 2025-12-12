import { Component } from '../core/Component.js';

export class UserInfo extends Component {
    constructor({ user }) {
        super();
        this.user = user || {};
    }

render() {
  const div = document.createElement('div');
  div.className = 'user-info';

  const user = this.user || {};
  const avatar = user.avatarUrl || 'https://via.placeholder.com/150?text=Avatar';
  const name = `${user.firstName || ''} ${user.lastName || ''}`
  const username = user.login 
  const attrs = user.attrs || {};
  const cin = attrs.cin || '—';
  const phone = attrs.tel || '—';
  const city = attrs.addressCity || '—';
  const gender = attrs.gender || '—';

  div.innerHTML = `
    <div class="avatar">
      <img src="${avatar}" alt="${username} avatar" />
    </div>

    <div class="meta">
      <h3>${username}</h3>
      <p>${name}</p>

      <div class="attrs">
        <div class="attr">CIN: ${cin}</div>
        <div class="attr">Tel: ${phone}</div>
        <div class="attr">City: ${city}</div>
        <div class="attr">Gender: ${gender}</div>
      </div>
    </div>

  `;


  return div;
}

}
