import { renderMainScreen } from "./screens/main.js";
import { renderCurrencyScreen } from "./screens/currency.js";
import { renderVideoScreen } from "./screens/video.js";
import { renderTimerScreen } from "./screens/timer.js";
import { renderAuthScreen } from "./screens/auth.js";

export const routes = [
  {
    path: "/",
    title: "Главная",
    component: renderMainScreen,
  },
  {
    path: "/currency",
    title: "Курсы валют",
    component: renderCurrencyScreen,
  },
  {
    path: "/video",
    title: "Видеоплеер",
    component: renderVideoScreen,
  },
  {
    path: "/timer",
    title: "Таймер",
    component: renderTimerScreen,
  },
  {
    path: "/auth",
    title: "Авторизация",
    component: renderAuthScreen,
  },
  {
    path: "/404",
    title: "Not Found",
    component: () => {
      document.body.innerHTML = "<h1>404</h1>";
    },
  },
];
