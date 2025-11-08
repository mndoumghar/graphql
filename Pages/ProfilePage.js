import { Page } from '../core/Page.js';
import { UserInfo } from '../components/UserInfo.js';
import { XPStatsGraph } from '../components/XPStatsGraph.js';
import { ProjectStatsGraph } from '../components/ProjectStatsGraph.js';
import { LoadingSpinner } from '../components/LoadingSpinner.js';
import { GraphQLClient } from '../graphql/Client.js';
import { Queries } from '../graphql/Queries.js';
import { Storage } from '../utils/Storage.js';
import { AboutUser } from '../components/AboutUser.js';
import { StatsCards } from "../components/StatsCards.js";
import { SkillsGraph } from "../components/SkillsGraph.js";

export class ProfilePage extends Page {
  constructor() {
    super({ title: 'profile' });
    this.client = new GraphQLClient(Storage.getToken());
  }

  async render() {
    const div = document.createElement('div');
    div.classList.add('profile-page');

    const spinner = new LoadingSpinner();
    spinner.mount(div);

    try {
      const [userData, projectsData, skillsData, auditsData] = await Promise.all([
        this.client.query(Queries.USER_INFO),
        this.client.query(Queries.PROJECT_LIST),
        this.client.query(Queries.SKILLS),
        this.client.query(Queries.AUDITS)
      ]);

      // userData is the full object returned by Queries.USER_INFO
      const user = userData.user?.[0] || {};
      const infoContainer = document.createElement('div');
      infoContainer.classList.add('containner');

      // User info + About
      const userInfo = new UserInfo({ user });
      infoContainer.appendChild(userInfo.render());

      const aboutUser = new AboutUser({ user: userData });
      infoContainer.appendChild(aboutUser.render());
      div.appendChild(infoContainer);

      // Stats Cards (expects full userData)
      const statsCards = new StatsCards({ user: userData });
      div.appendChild(statsCards.render());

      // XP graph (component has mount in your system)
      const XPGraph = new XPStatsGraph({ xpData: userData.xp?.transaction || [] });
      if (typeof XPGraph.mount === 'function') XPGraph.mount(div);
      else div.appendChild(XPGraph.render());

      // Project graph (pass projects array)
      const projectGraph = new ProjectStatsGraph({ projects: projectsData.transaction || [] });
      if (typeof projectGraph.mount === 'function') projectGraph.mount(div);
      else div.appendChild(projectGraph.render());

      // Skills graph
      const skillsGraph = new SkillsGraph({ skills: skillsData.user?.[0]?.transactions || [] });
      div.appendChild(skillsGraph.render());

      spinner.unmount();
    } catch (err) {
      spinner.unmount();
      div.innerHTML = "<p>Failed to load profile data. Please try again.</p>";
      console.error("Error fetching profile data:", err);
    }

    return div;
  }
}
