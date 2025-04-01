document.addEventListener("DOMContentLoaded", function () {
  const loginInput = document.getElementById("login");
  const passwordInput = document.getElementById("password");
  const togglePassword = document.getElementById("togglePassword");
  const icons = document.querySelectorAll(".icon");
  if (!passwordInput || !togglePassword) return;
  const openSvg = `<svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.0038 13.9018C17.508 13.9018 21.9998 8.64529 21.9998 7.00316C21.9998 5.35294 17.5 0.104492 11.0038 0.104492C4.58813 0.104492 -0.000244141 5.35294 -0.000244141 7.00316C-0.000244141 8.64529 4.58008 13.9018 11.0038 13.9018ZM11.0038 12.6299C5.699 12.6299 1.40847 8.13814 1.40847 7.00316C1.40847 6.04523 5.699 1.37636 11.0038 1.37636C16.2844 1.37636 20.5911 6.04523 20.5911 7.00316C20.5911 8.13814 16.2844 12.6299 11.0038 12.6299ZM11.0038 11.511C13.5073 11.511 15.5198 9.45832 15.5198 7.00316C15.5198 4.48357 13.5073 2.49528 11.0038 2.49528C8.48424 2.49528 6.46373 4.48357 6.47178 7.00316C6.48787 9.45832 8.48424 11.511 11.0038 11.511ZM11.0038 8.50042C10.1666 8.50042 9.49043 7.82422 9.49043 7.00316C9.49043 6.17402 10.1666 5.50589 11.0038 5.50589C11.8329 5.50589 12.5091 6.17402 12.5091 7.00316C12.5091 7.82422 11.8329 8.50042 11.0038 8.50042Z" fill="#3C3C43" fill-opacity="0.3"/>
</svg>
`;
  const closeSvg = `<svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.004 14.9038C12.5013 14.9038 13.8698 14.6382 15.1175 14.2116L14.063 13.157C13.105 13.4549 12.0908 13.6319 11.004 13.6319C5.69924 13.6319 1.40871 9.14021 1.40871 8.00516C1.40871 7.44168 2.89792 5.56608 5.2726 4.14127L4.27443 3.1431C1.59385 4.80136 0 7.03114 0 8.00516C0 9.64729 4.58032 14.9038 11.004 14.9038ZM11.004 1.10651C9.6034 1.10651 8.33151 1.348 7.14816 1.74244L8.21075 2.79696C9.09625 2.53132 10.0059 2.37837 11.004 2.37837C16.3008 2.37837 20.5913 7.04724 20.5913 8.00516C20.5913 8.65718 19.1826 10.412 16.9528 11.7805L17.9429 12.7706C20.4867 11.1205 22 8.95502 22 8.00516C22 6.35496 17.5083 1.10651 11.004 1.10651ZM11.004 12.513C11.7124 12.513 12.3805 12.3359 12.9762 12.0461L6.93893 6.00882C6.64106 6.60451 6.47202 7.28068 6.47202 8.00516C6.48006 10.4603 8.48449 12.513 11.004 12.513ZM15.1335 9.76805C15.3831 9.22876 15.52 8.62503 15.52 8.00516C15.52 5.48559 13.5075 3.49729 11.004 3.49729C10.3681 3.49729 9.77245 3.63414 9.23308 3.86758L15.1335 9.76805ZM17.2668 14.9762C17.5083 15.2258 17.8947 15.2419 18.1442 14.9762C18.4098 14.7106 18.3857 14.3484 18.1442 14.0988L4.68497 0.647673C4.44347 0.406179 4.04904 0.406179 3.79949 0.647673C3.56605 0.881116 3.56605 1.29165 3.79949 1.5251L17.2668 14.9762Z" fill="#3C3C43" fill-opacity="0.3"/>
</svg>
`;
  togglePassword.innerHTML = openSvg;
  togglePassword.style.display = "none";

  const handleFocus = (input, iconIndex) => {
    input.addEventListener("focus", () => {
      icons[iconIndex].style.fillOpacity = "1";
    });
  };
  handleFocus(loginInput, 0);
  handleFocus(passwordInput, 1);

  passwordInput.addEventListener("focus", () => {
    togglePassword.style.display = "inline-block";
  });

  togglePassword.addEventListener("click", () => {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    togglePassword.innerHTML = type === "password" ? openSvg : closeSvg;
  });
});

const AUTH_CONFIG = {
  login: "aezakmi@ae.com",
  password: "12345678",
  tokenExpiry: 3600000,
};

function generateAuthToken(expiry = AUTH_CONFIG.tokenExpiry) {
  try {
    const tokenValue =
      "tk_" + crypto.randomUUID().replace(/-/g, "").substr(0, 16);
    return {
      value: tokenValue,
      expires: Date.now() + expiry,
      issuedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error generating auth token:", error);
    return null;
  }
}

export function isAuthenticated() {
  const authData = getAuthData();
  return authData && authData.token && authData.token.expires > Date.now();
}

const saveAuthData = (token) => {
  try {
    const authData = { token, user: AUTH_CONFIG.login };
    localStorage.setItem("auth", JSON.stringify(authData));
  } catch (error) {
    console.error("Error saving auth data:", error);
  }
};

const getAuthData = () => {
  try {
    const data = localStorage.getItem("auth");
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error getting auth data:", error);
    return null;
  }
};

export async function login(credentials) {
  try {
    if (
      credentials.login === AUTH_CONFIG.login &&
      credentials.password === AUTH_CONFIG.password
    ) {
      const token = generateAuthToken();
      saveAuthData(token);
      return { success: true };
    } else {
      throw new Error("Неверные учетные данные");
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export function checkAuth() {
  const authData = getAuthData();
  if (!authData || !authData.token || authData.token.expires <= Date.now()) {
    logout();
    return false;
  }
  return true;
}
