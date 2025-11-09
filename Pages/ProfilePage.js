import { Page } from '../core/Page.js';
import { UserInfo } from '../components/UserInfo.js';
import { XPStatsGraph } from '../components/XPStatsGraph.js';
import { ProjectStatsGraph } from '../components/ProjectStatsGraph.js';
import { LoadingSpinner } from '../components/LoadingSpinner.js';
import { GraphQLClient } from '../graphql/Client.js';
import { Queries } from '../graphql/Queries.js';
import { Storage } from '../utils/Storage.js';
import { AboutUser } from '../components/AboutUser.js';
import { SkillsGraph } from "../components/SkillsGraph.js";
import { Router } from '../core/Router.js';

export class ProfilePage extends Page {
  constructor() {
    super({ title: 'profile' });
    this.client = new GraphQLClient(Storage.getToken());
  }

  async render() {
    // inside ProfilePage.render()
const root = document.createElement('div');
root.classList.add('profile-page');

// left column (user)
const leftCol = document.createElement('div');
leftCol.classList.add('card', 'left-col');

// right column (widgets)
const rightCol = document.createElement('div');
rightCol.classList.add('right-col');

// mount spinner to root while loading
const spinner = new LoadingSpinner();
spinner.mount(root);

try {
  const [userData, projectsData, skillsData, auditsData] = await Promise.all([
    this.client.query(Queries.USER_INFO),
    this.client.query(Queries.PROJECT_LIST),
    this.client.query(Queries.SKILLS),
    this.client.query(Queries.AUDITS)
  ]);

  spinner.unmount();

  const user = userData.user?.[0] || {};

  // UserInfo card (add .card on component root)
  const userInfo = new UserInfo({ user });
  await userInfo.mount(leftCol); // mounts inside leftCol

  // AboutUser card
  const aboutUser = new AboutUser({ user: userData });
  await aboutUser.mount(leftCol);

  // Skills graph -> put in right column
  const skillsGraph = new SkillsGraph({ skills: skillsData.user?.[0]?.transactions || [] });
  await skillsGraph.mount(rightCol);

  // optionally other widgets
  const xpWidget = new XPStatsGraph({ data: projectsData });
  await xpWidget.mount(rightCol);

  // append columns to root
  root.appendChild(leftCol);
  root.appendChild(rightCol);

} catch (err) {
  spinner.unmount();
  root.innerHTML = `<div class="card"><p>Failed to load profile data. Please try again.</p></div>`;
  console.error(err);
}

return root;

  }
}
