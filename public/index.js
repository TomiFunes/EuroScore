document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const registerLink = document.getElementById("register-link");
  const cancelRegister = document.getElementById("cancel-register");

  const registerPassword = document.getElementById("register-password");
  const confirmPassword = document.getElementById("confirmPassword");

  registerLink.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.style.display = "none";
    registerForm.style.display = "block";
  });

  cancelRegister.addEventListener("click", () => {
    registerForm.style.display = "none";
    loginForm.style.display = "block";
  });

  registerForm.addEventListener("submit", (e) => {
    if (registerPassword.value !== confirmPassword.value) {
      e.preventDefault();
      alert("Passwords are not the same");
    }
  });

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = loginForm.username.value;
    const password = loginForm.password.value;

    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (data.success) {
      window.location.href = "/game";
    } else {
      showLoginError(data.message);
    }
  });
});

function showLoginError(message) {
  let errorDiv = document.querySelector(".login-error");

  if (!errorDiv) {
    errorDiv = document.createElement("div");
    errorDiv.className = "login-error";
    document.querySelector(".container").prepend(errorDiv);
  }

  errorDiv.textContent = message;
  errorDiv.classList.add("shake");

  setTimeout(() => errorDiv.classList.remove("shake"), 400);
}
