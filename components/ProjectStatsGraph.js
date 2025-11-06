import { Component } from "../core/Component.js";

export class ProjectStatsGraph extends Component {

    render() {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width',400);
        svg.setAttribute("height",500);
        svg.classList.add("peoject-graph");
        const Projects = this.props.Projects || [];
        const barWidth = 30;


        Projects.forEach((p, index) => {
            const rect  =document.createElementNS('http://www.w3.org/2000/svg', "svg")
            rect.setAttribute('x', index * (barWidth + 5));
            rect.setAttribute('y', 150 - p.grade *100);
            rect.setAttribute('width', barWidth);
            rect.setAttribute('height',p.grade * 100);
            rect.setAttribute("fill", p.grade>= 1 ? "#4CAF50" : '#F44336')
            svg.appendChild(rect);

            const text  = document.createElementNS('http://www.w3.org/2000/svg', "svg");
            text.setAttribute("x",index * (barWidth + 5) + barWidth/2)
            text.setAttribute("y", 145 - p.grade * 100);
            text.setAttribute('text-anchor', "middle");
            text.setAttribute('font-size', "10");
            text.textContent = p.grade >= 1 ? "VAlid" : "Faild";


        });
        return svg
    }
}