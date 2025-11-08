export class Router {
  constructor(routes) {
    this.routes = routes;
    this.currentPage = null;
    window.addEventListener("hashchange", () => this.route());
  }

  async navigator(path) {
    location.hash = path; 
    await this.route();
  }

  async route() {
    const path = location.hash.replace('#', '') 
    const PageClass = this.routes[path] || this.routes["*"];
    if (!PageClass) return;
    if (this.currentPage) this.currentPage.unmount();
    this.currentPage = new PageClass();
    await this.currentPage.mount(document.getElementById("app"));
  }
}
