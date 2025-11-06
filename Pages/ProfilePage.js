import { Page } from '../core/Page.js';
import { UserInfo } from '../components/UserInfo.js';
import { XPStatsGraph } from '../components/XPStatsGraph.js';
import { ProjectStatsGraph } from '../components/ProjectStatsGraph.js';
import { LoadingSpinner } from '../components/LoadingSpinner.js';
import { GraphQLClient } from '../graphql/Client.js';
import { Queries } from '../graphql/Queries.js';
import { Storage } from '../utils/Storage.js';

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
            
            spinner.unmount();
            const user = userData.user[0];
            const userInfo = new UserInfo({ user });
            userInfo.mount(div);
            spinner.unmount()

            const XPGraph = new XPStatsGraph({ xpData: userData.xp.transaction });
            XPGraph.mount(div);

            const projectGraph = new ProjectStatsGraph({ project: projectsData.transaction });
            projectGraph.mount(div);


        } catch (err) {
            spinner.unmount();
            div.innerHTML = "<p>Failed to load profile data. Please try again.</p>";
            console.error("Error fetching profile data:", err);
        }

        return div;
    }
}
