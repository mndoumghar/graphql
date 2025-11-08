import { Component } from "../core/Component.js";
import { getRank } from "../utils/GetRank.js";
import { formatXP } from "../utils/FormatXp.js";

export class StatsCards extends Component {
  render() {
    // Expecting the full userData object (same shape returned by Queries.USER_INFO)
    const userData = this.props.user || {};
    const totalXP = userData?.xp?.aggregate?.sum?.amount || 0;
    const level = userData?.level?.aggregate?.max?.amount || 0;
    const cohort = userData?.user?.[0]?.events?.[0]?.cohorts?.[0]?.labelName || "cohort not found";

    const div = document.createElement("div");
    div.classList.add("stats");
    div.innerHTML = `
      <div class="stat-card"><h3>Level</h3><p>${level}</p></div>
      <div class="stat-card"><h3>Total XP</h3><p>${formatXP(totalXP)}</p></div>
      <div class="stat-card"><h3>Rank</h3><p>${getRank(level)}</p></div>
      <div class="stat-card"><h3>Cohort</h3><p>${cohort}</p></div>
    `;
    return div;
  }
}
