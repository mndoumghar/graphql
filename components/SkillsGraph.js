import { Component } from "../core/Component.js";

export class SkillsGraph extends Component {
  /* 
  
    const skillsGraph = new SkillsGraph({ skills: skillsData.user?.[0]?.transactions || [] });

  
  */
  constructor({skills} = {}) {
    super()
    this.skill  = skills || []
  }

  render() {    
    const skills =  this.skill
    const unique = [];
    const seen = new Set();
    
    for (const s of skills) {
      if (!seen.has(s.skillType)) {
        unique.push(s);
        seen.add(s.skillType);
      }
    }

    const root = document.createElement("div");
    root.classList.add("skills-graph", "card");
    root.style.backgroundColor = "#444"
    
    if (unique.length === 0) {
      const empty = document.createElement("div");
      empty.classList.add("muted");
      empty.textContent = "No skills to show";
      root.appendChild(empty);
      return root;
    }

    const barHeight = 20;
    const spacing = 12;
    const leftPadding = 100;
    const topPadding = 40;
    const totalHeight = unique.length * (barHeight + spacing) + topPadding + 20
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100%")
    svg.setAttribute("height", totalHeight)
    svg.classList.add("skills-svg")

      const availableWidth = 300
      unique.forEach((skill, i) => {
        const amount = Math.max(0, Math.min(100, Number(skill.skillAmount)));
        const y = i * (barHeight + spacing) + topPadding;

        const name = document.createElementNS("http://www.w3.org/2000/svg", "text");
        name.setAttribute("x", "10");
        name.setAttribute("y", y + barHeight / 1.5);
        name.textContent = (skill.skillType || "").replace("skill_", "");
        name.setAttribute("fill", "#fff")
        svg.appendChild(name);



        const bg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        bg.setAttribute("x", leftPadding);
        bg.setAttribute("y", y);
        bg.setAttribute("width", availableWidth);
        bg.setAttribute("height", barHeight);
        bg.setAttribute("fill", "#333");
        bg.setAttribute("rx", "8");
        bg.setAttribute("ry", "8");
        svg.appendChild(bg);

        const progress = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        progress.setAttribute("x", leftPadding);
        progress.setAttribute("y", y);
        progress.setAttribute("width", (amount / 100) * availableWidth);
        progress.setAttribute("height", barHeight);
        progress.setAttribute("fill", "#26c43dff");
        progress.setAttribute("rx", "8");
        progress.setAttribute("ry", "8");
        svg.appendChild(progress);


        const value = document.createElementNS("http://www.w3.org/2000/svg", "text");
        value.setAttribute("x", leftPadding + availableWidth + 15);
        value.setAttribute("y", y + barHeight / 1.5);
        value.setAttribute("dominant-baseline", "middle");
        value.setAttribute("fill", "#ffff")
        value.textContent = `${amount}%`;
        svg.appendChild(value);
      });

    root.appendChild(svg);
    return root
  }
}
