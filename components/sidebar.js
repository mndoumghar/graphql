import { Component } from "../core/Component.js";

export class Sidebar extends Component {
  constructor({ items = [], onSelect }) {
    super()
    this.items = items;
    this.onSelect = onSelect;
    this.active = null;
  }

  render() {
    const container = document.createElement('div');
    container.classList.add('sidebar');

    this.items.forEach(item => {
      const el = document.createElement('div');
      el.classList.add('sidebar-item');
      el.innerHTML = item.label;
      el.dataset.key = item.key;

      el.addEventListener('click', () => {
        if (this.active) this.active.classList.remove('active');
        el.classList.add('active');
        this.active = el;
        this.onSelect(item.key);
      });

      container.appendChild(el);
    });

    return container;
  }
}
