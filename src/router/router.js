class Router {
  constructor(routes) {
    this.routes = routes;
    this._loadInitialRoute();
    this._setupHashChange();
  }

  _loadInitialRoute() {
    const path = window.location.hash.slice(1) || "/";
    this._loadRoute(path);
  }

  _setupHashChange() {
    window.addEventListener("hashchange", () => {
      const path = window.location.hash.slice(1);
      this._loadRoute(path);
    });
  }

  _loadRoute(path) {
    const matchedRoute = this._matchRouteToPath(path);
    if (!matchedRoute) {
      this._loadRoute("/404");
      return;
    }

    matchedRoute.component();
    document.title = matchedRoute.title || "SPA App";
  }

  _matchRouteToPath(path) {
    return this.routes.find((route) => route.path === path);
  }

  navigateTo(path) {
    window.location.hash = path;
  }
}
