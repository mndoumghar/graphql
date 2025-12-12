import { Component } from "../core/Component.js";

export class AuditGraph extends Component {
    constructor({ audits } = {}) {
        super();
        this.audits = audits || {}
    }

    render() {
        const root = document.createElement("div");
        root.classList.add("audit-graph", "card");
        

        if (!this.audits) {
            root.textContent = "No audit data found";
            return root;
        }

        // Extract counts safely
        const failed = this.audits.failed.aggregate.count || 0;
        const success = this.audits.success.aggregate.count || 0;
        const total = failed + success;

        if (total === 0) {
            root.textContent = "No audits performed ...";
            return root;
        }

        const cp = 2 * Math.PI * 30;
        const failRate = (failed / total) * cp;
        const successRate = (success / total) * cp;
        const container = document.createElement("div");
        container.innerHTML += `<div> failed ${failed}</div>
            <div>success ${success}</div>

            <svg width="100" height="100">
                <circle cx="50" cy="50" r="30" fill="none" stroke="green" stroke-width="10"
                    stroke-dasharray="${cp}" stroke-dashoffset="${failRate}" class="progress-ring" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="red" stroke-width="10"
                    stroke-dasharray=${successRate} stroke-dashoffset="${successRate}" class="progress-ring" />
            </svg>
      `

        root.appendChild(container);
        return root;
    }
}
