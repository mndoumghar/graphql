import { Component } from "../core/Component.js";

export class SkillsGraph extends Component {
  render() {
    const skills = this.props.skills || [];
    const uniqueSkills = [];
    const seen = new Set();

    for (const t of skills) {
      if (!seen.has(t.skillType)) {
        uniqueSkills.push(t);
        seen.add(t.skillType);
      }
    }

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const barHeight = 20;
    const spacing = 15;
    const color = "#26c43dff";

    svg.setAttribute("height", uniqueSkills.length * (barHeight + spacing) + 30);
    svg.setAttribute("width", "100%");

    uniqueSkills.forEach((skill, i) => {
      const y = i * (barHeight + spacing) + 30;
      const amount = skill.skillAmount || 0;
      const name = skill.skillType.replace("skill_", "");

      const nameText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      nameText.setAttribute("x", "10");
      nameText.setAttribute("y", y + barHeight / 1.5);
      nameText.textContent = name;
      svg.appendChild(nameText);

      const bg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      bg.setAttribute("x", 100);
      bg.setAttribute("y", y);
      bg.setAttribute("width", 300);
      bg.setAttribute("height", barHeight);
      bg.setAttribute("fill", "#333");
      bg.setAttribute("rx", "8");
      svg.appendChild(bg);

      const progress = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      progress.setAttribute("x", 100);
      progress.setAttribute("y", y);
      progress.setAttribute("width", Math.max(0, Math.min(300, (amount / 100) * 300)));
      progress.setAttribute("height", barHeight);
      progress.setAttribute("fill", color);
      progress.setAttribute("rx", "8");
      svg.appendChild(progress);

      const val = document.createElementNS("http://www.w3.org/2000/svg", "text");
      val.setAttribute("x", 420);
      val.setAttribute("y", y + barHeight / 1.5);
      val.textContent = `${amount}%`;
      svg.appendChild(val);
    });

    return svg;
  }
}
