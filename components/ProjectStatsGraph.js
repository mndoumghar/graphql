import { Component } from "../core/Component.js";

export class ProjectStatsGraph extends Component {
  render() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', 400);
    svg.setAttribute("height", 200);
    svg.classList.add("project-graph");

    const projects = this.props.projects || [];
    const barWidth = 30;
    const gap = 8;

    projects.forEach((p, index) => {
      const grade = p.grade ?? 0; // ensure numeric
      const x = index * (barWidth + gap) + 10;
      const height = Math.max(2, grade * 100); // avoid zero-height
      const y = 180 - height;

      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', x);
      rect.setAttribute('y', y);
      rect.setAttribute('width', barWidth);
      rect.setAttribute('height', height);
      rect.setAttribute('fill', grade >= 1 ? '#4CAF50' : '#F44336');
      rect.setAttribute('rx', '4');
      svg.appendChild(rect);

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', x + barWidth / 2);
      text.setAttribute('y', y - 6);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('font-size', '10');
      text.setAttribute('fill', '#fff');
      text.textContent = grade >= 1 ? 'Valid' : 'Failed';
      svg.appendChild(text);
    });

    return svg;
  }
}
