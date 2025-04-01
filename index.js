import { Router } from "./router.js";
import { routes } from "./routes.js";

const router = new Router(routes);

function checkAuth() {
  const token = JSON.parse(localStorage.getItem("auth"));
  if (!token || token.expires < Date.now()) {
    router.navigateTo("/auth");
    return false;
  }
  return true;
}

function protectedRoute(routeFn) {
  return () => {
    if (checkAuth()) {
      routeFn();
    }
  };
}

routes.forEach((route) => {
  if (route.path !== "/auth") {
    route.component = protectedRoute(route.component);
  }
});
