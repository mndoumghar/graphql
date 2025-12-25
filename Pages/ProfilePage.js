import { Page } from '../core/Page.js';
import { UserInfo } from '../components/UserInfo.js';
import { LoadingSpinner } from '../components/LoadingSpinner.js';
import { GraphQLClient } from '../graphql/Client.js';
import { Queries } from '../graphql/Queries.js';
import { Storage } from '../utils/Storage.js';
import { AboutUser } from '../components/AboutUser.js';
import { SkillsGraph } from "../components/SkillsGraph.js";
import { Logout } from '../components/LogoutButtun.js';
import { AuditGraph } from "../components/AudioGraph.js"
import { Sidebar } from '../components/sidebar.js';
import { Logo } from '../components/Logo.js'
import { Projects } from '../components/Projects.js';
import {router} from '../app.js';


export class ProfilePage extends Page {
  constructor() {
    super({ title: 'profile' });
    this.client = new GraphQLClient(Storage.getToken());
    this.componentsData = {}
  }

  async render() {
    const root = document.createElement('div');
    root.classList.add('profile-page');
    const spinner = new LoadingSpinner();
    spinner.mount(root);

    const logout = new Logout();
    logout.mount(root);

    try {
      const [userData, projectsData, skillsData, auditsData] = await Promise.all([
        this.client.query(Queries.USER_INFO),
        this.client.query(Queries.PROJECT_LIST),
        this.client.query(Queries.SKILLS),
        this.client.query(Queries.AUDITS)
      ]);

      spinner.unmount();
      this.componentsData = { userData, projectsData, skillsData, auditsData };
      
      const userInfo = new UserInfo({ user: userData.user?.[0] || {} });
      const aboutUser = new AboutUser({ user: userData });
      const skillsGraph = new SkillsGraph({ skills: skillsData.user?.[0]?.transactions || [] });
      const auditGraph = new AuditGraph({ audits: auditsData.user[0] });
      const projectsComp = new Projects({ projects: projectsData });
      const logo = new Logo()
      const mainContainer = document.createElement('div');
      mainContainer.classList.add('main-content');
      root.appendChild(mainContainer);

      const sidebarItems = [
        { key: 'graphql', label:   '<h1>Graphql</h1>', component: () => logo },
        { key: 'profile', label: '👤 Profile', component: () => userInfo },
        { key: 'projects', label: '🗂 Projects', component: () => projectsComp },
        { key: 'about', label: 'ℹ️ About', component: () => aboutUser },
        { key: 'skills', label: '📊 Skills', component: () => skillsGraph },
        { key: 'audits', label: '📈 Audit', component: () => auditGraph }
      ];

      let currentComponent = null;

      const sidebar = new Sidebar({
        items: sidebarItems,
        onSelect: async (key) => {
          mainContainer.innerHTML = ''; 

          const comp = sidebarItems.find(i => i.key === key)?.component();
          if (comp) {
           this.setTitle(key)
            await comp.mount(mainContainer);
            currentComponent = comp;
          }
        }
      })

      await sidebar.mount(root);
      const defaultComp = sidebarItems[0].component();
      await defaultComp.mount(mainContainer);
      currentComponent = defaultComp;
      // router.navigator('/cxc');

    } catch (err) {
      spinner.unmount();
      mainContainer.innerHTML = ""
       router.navigator('/login');
      console.error(err);
    }

    return root;
  }
}
