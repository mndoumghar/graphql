import { Page } from '../core/Page.js';
import { UserInfo } from '../components/UserInfo.js';
import { XPStatsGraph } from '../components/XPStatsGraph.js';
import { ProjectStatsGraph } from '../components/ProjectStatsGraph.js';
import { LoadingSpinner } from '../components/LoadingSpinner.js';
import { GraphQLClient } from '../graphql/Client.js';
import { Queries } from '../graphql/Queries.js';
import { Storage } from '../utils/Storage.js';
import { AboutUser } from '../components/AboutUser.js';

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

            const user = userData.user[0];
            const infoContainer = document.createElement('div');
            infoContainer.classList.add('containner');

            const userInfo = new UserInfo({ user });
            infoContainer.appendChild(userInfo.render());

            const aboutUser = new AboutUser({ user: userData });
            infoContainer.appendChild(aboutUser.render());
            div.appendChild(infoContainer);
            const XPGraph = new XPStatsGraph({ xpData: userData.xp.transaction });
            XPGraph.mount(div);
            const projectGraph = new ProjectStatsGraph({ project: projectsData.transaction });
            projectGraph.mount(div);
            spinner.unmount();


        } catch (err) {
            spinner.unmount();
            div.innerHTML = "<p>Failed to load profile data. Please try again.</p>";
            console.error("Error fetching profile data:", err);
        }

        return div;
    }
}
