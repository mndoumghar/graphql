import { Component } from "../core/Component.js"

export class XPStatsGraph extends Component {
    render() {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        svg.setAttribute("width", 400);
        svg.setAttribute("height", 150);
        svg.classList.add("xp-graph");
        const xpData = this.props.xpData || [];
        const barWidth = 30;

        xpData.forEach((xp, index) => {
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
            rect.setAttribute("x", index * (barWidth + 5))
            rect.setAttribute('y', 150 - xp.amount / 10)
            rect.setAttribute("width", barWidth)
            rect.setAttribute("height", xp.amount / 10)
            rect.setAttribute("fill", "#4CAF50")

            const text = document.createElementNS("http://www.w3.org/2000/svg", "text")
            text.setAttribute("x", index * (barWidth+10) +barWidth / 2)
            text.setAttribute("y", 145 - xp.amount / 10);
            text.setAttribute("text-anchor", "middle")
            text.setAttribute("font-size", "10")
            text.textContent = xp.amount
            svg.appendChild(text)
            
        });

        return svg
    }
}
