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
      el.dataset.key = item.key;

      const icon = document.createElement('i');
      icon.setAttribute('data-lucide', item.icon);
      icon.classList.add('sidebar-icon');

      const label = document.createElement('span');
      label.textContent = item.label;
      label.classList.add('sidebar-label');

      el.appendChild(icon);
      el.appendChild(label);

      el.addEventListener('click', () => {
        if (this.active) this.active.classList.remove('active');
        el.classList.add('active');
        this.active = el;
        this.onSelect(item.key);
      });
      container.appendChild(el);
    });
    
    setTimeout(() => {
      if (window.lucide) {
        window.lucide.createIcons();
      }
    }, 0);

    return container;
  }
}