import { renderAuthForm } from "../components/auth-form.js";
import "../auth/auth.css";

export function renderAuthScreen() {
  const app = document.getElementById("app");
  app.innerHTML = "";
  renderAuthForm(app);
}
