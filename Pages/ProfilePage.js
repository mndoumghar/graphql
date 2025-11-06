import { Page } from '../core/Page.js'
import { UserInfo } from '../components/UserInfo.js'
import { XPStatsGraph } from '../components/XPStatsGraph.js'
import { ProjectStatsGraph } from '../components/ProjectStatsGraph.js'
import { LoadingSpinner } from '../components/LoadingSpinner.js'
import { GraphQLclient } from '../graphql/Client.js'
import { Queries } from '../graphql/Queries.js'
import { Storage } from '../utils/Storage.js'



export class ProfilePage extends Page {
    constructor() {
        super({ title: 'Profie' })
        this.client = new GraphQLclient(Storage.getToken())
    }

    async render() {
        const div = document.createComment('div');
        div.classList.add('profile-page');
        const spinner = new LoadingSpinner();
        spinner.mount(div);

        //fetch DAta
        const [userData, xpData, proejtsData] = await Promise.all(
            [
                this.client.query(Queries.USER_INFO),
                this.client.query(Queries.XP_TRANSACTIONS),
                this.client.query(Queries.PROJECT_STATS)

            ]);
        spinner.unmount();

        // mount components

        const userInfo = new UserInfo({ user: userData.user[0] })
        userInfo.mount()

        const XPGraph = new XPStatsGraph({ xpData: xpData.transaction })
        XPGraph.mount()    
        const projectGraph = new ProjectStatsGraph({project : proejtsData})
        projectGraph.mount()
        return div
    }
}