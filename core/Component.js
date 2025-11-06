// core/Component.js
export class Component {
  constructor(props = {}) {
    this.props = props;
    this.element = null;
  }

  render() {
    throw new Error("Component must implement render()");
  }

  async mount(parent) {
    let node = this.render()
    if (node instanceof Promise) {
      node = await node;
    }
    
    this.element = node;
    parent.appendChild(this.element);
  }

  unmount() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}
