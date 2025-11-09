import { Component } from "../core/Component.js";
import { formatXP } from "../utils/FormatXp.js";
import {getRank} from "../utils/GetRank.js"

export class AboutUser extends Component {
    constructor({ user }) {
        super();
        this.user = user || {};
    }

    render() {
        const totalXP = this.user?.xp?.aggregate?.sum?.amount || 0;
        const level = this.user?.level?.aggregate?.max?.amount || 0;
        const cohort = this.user?.user?.[0]?.events?.[0]?.cohorts?.[0]?.labelName || "cohort not found";

        const div = document.createElement('div');
        div.classList.add('user-about');
        div.innerHTML = `
        <div class="card-info">


            <div class="card-item">
                <p>Total XP</p>
                <span>${formatXP(totalXP)}</span>
            </div>


            <div class="card-item">
                <p>Current Level</p>
                <span>${getRank(level)}</span>
            </div>
            
            <div class="card-item">
                <p>Your Cohort</p>
                <span>${cohort}</span>
            </div>
            <div class="card-item">
                <p>Your Cohort</p>
                <span>${this.progress(level)}</span>
            </div>
            </div>
        `;

        return div;
    }


    progress(level) {

        if (level >= 0 && level < 10) {
            return "Aspiring developer";
        } else if (level >= 10 && level < 20) {
            return "Beginner developer";
        } else if (level >= 20 && level < 30) {
            return "Apprentice developer";
        } else if (level >= 30 && level < 40) {
            return "Assistant developer";
        } else if (level >= 40 && level < 50) {
            return "Basic developer";
        } else if (level >= 50 && level < 55) {
            return "Junior developer";
        } else if (level >= 55 && level < 60) {
            return "Confirmed developer";
        } else if (level == 60) {
            return "Full-Stack developer";
        } else {
            return "";
        }
    }

}
