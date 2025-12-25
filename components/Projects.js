import { Component } from '../core/Component.js';
import { formatXP } from '../utils/FormatXp.js';

export class Projects extends Component {
  constructor({ projects }) {
    super();
    this.projects = projects;
  }


  createElement(tagName, className = '', textContent = '') {
    const element = document.createElement(tagName);
    if (className) {
      element.classList.add(className);
    }
    if (textContent) {
      element.textContent = textContent;
    }
    return element;
  }


  createMemberLink(userLogin) {
    const userLoginDiv = this.createElement('div', 'userLogin');
    if (!userLogin) {
      userLoginDiv.textContent = '—';
      return userLoginDiv;
    }
    const link = document.createElement('a');
    link.href = `https://profile.zone01oujda.ma/profile/${userLogin}`;
    link.target = '_blank';
    link.textContent = userLogin;
    userLoginDiv.appendChild(link);
    return userLoginDiv;
  }

  createProjectRow(transaction) {
    const row = this.createElement('tr', 'project-row');

    const tx = transaction || {};
    const obj = tx.object || {};
    const projectName = obj.name || 'Unknown';
    const description = obj.description || '';
    const amount = Number(tx.amount) || 0;
    const xp = formatXP(amount);
    const date = tx.createdAt ? new Date(tx.createdAt).toLocaleDateString() : '—';
    const members = obj.progresses?.[0]?.group?.members || [];
    const leaderLogin = obj.progresses?.[0]?.group?.captainLogin || null;

    const nameCell = this.createElement('td', '', projectName);
    if (description) {
      const descEl = this.createElement('div', 'project-desc', description);
      descEl.style.fontSize = '0.85rem';
      descEl.style.marginTop = '6px';
      descEl.style.opacity = '0.85';
      nameCell.appendChild(descEl);
    }

    const xpCell = this.createElement('td', '', xp);
    xpCell.style.color = amount > 0 ? '#1d361dff' : '#FF0000';

    const dateCell = this.createElement('td', '', date);
    const membersCell = this.createElement('td', 'members');
    membersCell.setAttribute('data-label', 'Team Members');

    if (members && members.length) {
      members.forEach(member => {
        membersCell.appendChild(this.createMemberLink(member?.userLogin));
      });
    } else {
      membersCell.textContent = '—';
    }

    const leaderCell = this.createElement('td');
    leaderCell.setAttribute('data-label', 'Team Leader');
    if (leaderLogin) {
      const a = document.createElement('a');
      a.href = `https://profile.zone01oujda.ma/profile/${leaderLogin}`;
      a.target = '_blank';
      a.textContent = leaderLogin;
      a.classList.add('member-badge');
      leaderCell.appendChild(a);
    } else {
      leaderCell.textContent = '—';
    }

    nameCell.setAttribute('data-label', 'Project');
    xpCell.setAttribute('data-label', 'XP');
    dateCell.setAttribute('data-label', 'Created At');

    row.appendChild(nameCell);
    row.appendChild(xpCell);
    row.appendChild(dateCell);
    row.appendChild(membersCell);
    row.appendChild(leaderCell);

    return row;
  }


  render() {
    const root = this.createElement('div', 'projects');

    const completedProjects = this.projects.transaction.length ;

    const title = this.createElement('h2', '', `Projects (${completedProjects})`);
    root.appendChild(title);

    const table = this.createElement('table', 'project-table');
    root.appendChild(table);

    const headerRow = this.createElement('tr', 'project-header');
    const headers = ['Project', 'XP', 'Created At', 'Team Members', 'Team Leader'];
    headers.forEach(headerText => {
      const headerCell = this.createElement('th', '', headerText);
      headerRow.appendChild(headerCell);
    });
    table.appendChild(headerRow);

    this.projects.transaction.forEach(transaction => {
      const leaderLogin = transaction?.object?.progresses?.[0]?.group?.captainLogin;
      if (!leaderLogin) return
      const row = this.createProjectRow(transaction);
      table.appendChild(row);
    });

    return root;
  }
}