import { login } from "../auth/auth.js";

export function renderAuthForm(container) {
  const form = document.createElement("div");
  form.className = "container";
  form.innerHTML = `<div class="form">
            <h2 class="title">Log in</h2>
            <p>Welcome Back</p>
            <form>
                <div class="form__group email-container">
                    <span class="icon-container" ><svg class="icon" width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.54916 17.2038H18.8617C20.5736 17.2038 21.5627 16.2148 21.5627 14.2555V3.75551C21.5627 1.80578 20.5641 0.81665 18.5763 0.81665H3.26383C1.55187 0.81665 0.562744 1.79627 0.562744 3.75551V14.2555C0.562744 16.2243 1.56139 17.2038 3.54916 17.2038ZM3.4921 15.7487C2.54101 15.7487 2.01791 15.2447 2.01791 14.2555V3.75551C2.01791 2.77589 2.54101 2.27182 3.4921 2.27182H18.6334C19.5655 2.27182 20.1076 2.77589 20.1076 3.76502V14.2651C20.1076 15.2447 19.5655 15.7487 18.6334 15.7487H3.4921ZM11.0817 11.5449C11.7475 11.5449 12.3942 11.2691 13.06 10.6129L20.7829 3.02317L19.7937 2.02453L12.2326 9.49053C11.8236 9.8995 11.4527 10.0802 11.0817 10.0802C10.7013 10.0802 10.3304 9.89 9.93098 9.49053L2.33177 1.98648L1.33312 2.98513L9.10347 10.6129C9.76931 11.2691 10.4065 11.5449 11.0817 11.5449ZM19.6986 15.958L20.6878 14.9593L14.5342 8.88187L13.5451 9.87101L19.6986 15.958ZM1.46628 14.9688L2.45541 15.9675L8.61845 9.87101L7.61981 8.88187L1.46628 14.9688Z" />
                        </svg>
                        
                      </svg></span>
                    <input type="text" id="login" placeholder="Email Address" required>
                  </div>
                  <div class="form__group password-container">
                  <span class="icon-container"><svg class="icon" width="14" height="21" viewBox="0 0 14 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.46561 20.4119H11.6565C13.133 20.4119 13.9165 19.6084 13.9165 18.0213V11.1005C13.9165 9.52347 13.133 8.71993 11.6565 8.71993H2.46561C0.989048 8.71993 0.205566 9.52347 0.205566 11.1005V18.0213C0.205566 19.6084 0.989048 20.4119 2.46561 20.4119ZM2.51583 18.8951C2.08392 18.8951 1.8328 18.6239 1.8328 18.1318V10.99C1.8328 10.4979 2.08392 10.2367 2.51583 10.2367H11.6063C12.0482 10.2367 12.2893 10.4979 12.2893 10.99V18.1318C12.2893 18.6239 12.0482 18.8951 11.6063 18.8951H2.51583ZM1.96338 9.49338H3.56048V6.10833C3.56048 3.56703 5.17766 2.2311 7.05602 2.2311C8.93437 2.2311 10.5717 3.56703 10.5717 6.10833V9.49338H12.1587V6.31926C12.1587 2.54248 9.68771 0.714355 7.05602 0.714355C4.43436 0.714355 1.96338 2.54248 1.96338 6.31926V9.49338Z" fill="" />
                      </svg>
                       </span>
                    <input type="password" id="password" placeholder="Password" required>
                    <span class="toggle-password" id="togglePassword"></span>
                  </div>
                  <button class="btn" type="submit">Login</button>
                </form>
        </div>`;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const loginInput = form.querySelector("#login");
    const passwordInput = form.querySelector("#password");
    const errorEl = form.querySelector(".error-message");

    try {
      await login({
        login: loginInput.value,
        password: passwordInput.value,
      });
      window.location.hash = "#/";
    } catch (error) {
      errorEl.textContent = error.message;
      passwordInput.value = "";
    }
  });

  container.appendChild(form);
}
