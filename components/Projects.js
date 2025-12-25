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
    const link = document.createElement('a');
    link.href = `https://profile.zone01oujda.ma/profile/${userLogin}`;
    link.target = '_blank';
    link.textContent = userLogin;
    userLoginDiv.appendChild(link);
    return userLoginDiv;
  }

  createProjectRow(transaction) {
    const row = this.createElement('tr', 'project-row');

    const projectName = transaction.object?.name || "Unknown";
    const xp = formatXP(transaction.amount || 0);
    const date = new Date(transaction.createdAt).toLocaleDateString();
    const members = transaction.object.progresses?.[0]?.group?.members || [];
    const leader = transaction.object.progresses?.[0]?.group?.captainLogin || "";

    const nameCell = this.createElement('td', '', projectName);
    const xpCell = this.createElement('td', '', xp);
    xpCell.style.color = transaction.amount > 0 ? '#00FF00' : '#FF0000';

    const dateCell = this.createElement('td', '', date);
    const membersCell = this.createElement('td', 'members');
    membersCell.setAttribute('data-label', 'Team Members');

    members.forEach(member => {
      membersCell.appendChild(this.createMemberLink(member.userLogin));
    });

    const leaderCell = this.createElement('td', '', leader);
    leaderCell.setAttribute('data-label', 'Team Leader');
    nameCell.setAttribute('data-label', 'Project');
    xpCell.setAttribute('data-label', 'XP');
    dateCell.setAttribute('data-label', 'Created At');

    row.appendChild(nameCell);
    row.appendChild(xpCell);
    row.appendChild(dateCell);
    row.appendChild(membersCell);
    row.appendChild(leaderCell);

    return row
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
      const row = this.createProjectRow(transaction);
      table.appendChild(row);
    });

    return root;
  }
}