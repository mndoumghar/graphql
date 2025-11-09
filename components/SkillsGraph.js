import { Component } from "../core/Component.js";

export class SkillsGraph extends Component {
  render() {
    const skills = this.props.skills || [];
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

    if (unique.length === 0) {
      const empty = document.createElement("div");
      empty.classList.add("muted");
      empty.textContent = "No skills to show";
      root.appendChild(empty);
      return root;
    }

    const barW = 18;
    const spacing = 28;
    const ml = 20;
    const mt = 12;
    const plotH = 60;
    const svgW = Math.max(unique.length * (barW + spacing) + 40, 160);
    const svgH = mt + plotH + 24;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", `0 0 ${svgW} ${svgH}`);
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", svgH);

    const clamp = n => Math.max(0, Math.min(100, Number(n) || 0));
    const pts = unique.map((sk, i) => {
      const amt = clamp(sk.skillAmount);
      const x = ml + i * (barW + spacing) + barW / 2;
      const y = mt + (1 - amt / 100) * plotH;
      return { x, y, amt, label: (sk.skillType || "").replace("skill_", "") };
    });

    // simple line 
    const line = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    line.setAttribute("points", pts.map(p => `${p.x},${p.y}`).join(" "));
    line.setAttribute("fill", "none");
    line.setAttribute("stroke", "#26d07c");
    line.setAttribute("stroke-width", "2");
    svg.appendChild(line);

    // points + labels
    pts.forEach(p => {
      const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      c.setAttribute("cx", p.x);
      c.setAttribute("cy", p.y);
      c.setAttribute("r", 3.5);
      c.setAttribute("fill", "#26d07c");
      svg.appendChild(c);

      const v = document.createElementNS("http://www.w3.org/2000/svg", "text");
      v.setAttribute("x", p.x);
      v.setAttribute("y", p.y - 8);
      v.setAttribute("text-anchor", "middle");
      v.setAttribute("font-size", "8");
      v.setAttribute("fill", "#fff");
      v.textContent = `${p.amt}%`;
      svg.appendChild(v);

      const lbl = document.createElementNS("http://www.w3.org/2000/svg", "text");
      lbl.setAttribute("x", p.x);
      lbl.setAttribute("y", mt + plotH + 14);
      lbl.setAttribute("text-anchor", "middle");
      lbl.setAttribute("font-size", "9");
      lbl.setAttribute("fill", "#9aa4ad");
      const short = p.label.length > 10 ? p.label.slice(0, 10) + "…" : p.label;
      lbl.textContent = short;
      svg.appendChild(lbl);
    });

    root.appendChild(svg);
    return root;
  }
}
