import { Page } from '../core/Page.js';
import { UserInfo } from '../components/UserInfo.js';
import { LoadingSpinner } from '../components/LoadingSpinner.js';
import { GraphQLClient } from '../graphql/Client.js';
import { Queries } from '../graphql/Queries.js';
import { Storage } from '../utils/Storage.js';
import { AboutUser } from '../components/AboutUser.js';
import { SkillsGraph } from "../components/SkillsGraph.js";
import { Logout } from '../components/LogoutButtun.js';
import {AuditGraph} from "../components/AudioGraph.js"

export class ProfilePage extends Page {
  constructor() {
    super({ title: 'profile' });
    this.client = new GraphQLClient(Storage.getToken());


  }

  async render() {
    const root = document.createElement('div');
    root.classList.add('profile-page');
    const spinner = new LoadingSpinner();
    spinner.mount(root);
    const logout = new Logout(root)
    logout.mount(root)

    try {
      const [userData, projectsData, skillsData, auditsData] = await Promise.all([
        this.client.query(Queries.USER_INFO),
        this.client.query(Queries.PROJECT_LIST),
        this.client.query(Queries.SKILLS),
        this.client.query(Queries.AUDITS)
      ]);


      const user = userData.user?.[0] || {};

      const userInfo = new UserInfo({ user });
      userInfo.mount(root)

      const aboutUser = new AboutUser({ user: userData });
      aboutUser.mount(root)
      const skillsGraph = new SkillsGraph({ skills: skillsData.user?.[0]?.transactions || [] });
      skillsGraph.mount(root)
      const auditGraph = new AuditGraph({audits: auditsData.user[0]})
      auditGraph.mount(root)
      



    } catch (err) {
      spinner.unmount();
      root.innerHTML = `<div class="card"><p>Failed to load profile data. Please try again.</p></div>`;
      console.error(err);
    }

    return root;

  }
}
