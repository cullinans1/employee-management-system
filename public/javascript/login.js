async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    const response = await fetch("/api/admin/login", {
      //need another login for the employee login
      method: "post",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/"); // success goes to dashboard
    } else {
      alert(response.statusText);
    }
  }
}

var el = document.querySelector(".login-form");
el.addEventListener("submit", loginFormHandler);
