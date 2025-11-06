

export class Router {
    constructor(routes) {
        this.routes = routes;
        window.addEventListener("popstate", ()=> this.routes())
    }

    navigator(path) {
        history.pushState(null,null, path);
        this.route()
    }

    route() {
        const path = location.pathname;
        const PageClass = this.routes[path] || this.routes['*'];
        if(!PageClass) return

        if(this.currentPage) {
            this.currentPage.unmount();
        }
        // mount  new Page
        this.currentPage = new PageClass();
        this.currentPage.mount(document.getElementById('app'))
    }
}
