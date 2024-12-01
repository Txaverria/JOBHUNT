document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logoutButton");

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      // Clear sessionStorage
      sessionStorage.clear();

      // Redirect to landing page
      window.location.href = "landing.html";
    });
  }
});
