
document.addEventListener("DOMContentLoaded", function () {
  // Check if the user is logged in
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!loggedInUser) {
      // If not logged in, restrict access to certain pages
      const restrictedPages = ["index.html", "updateuerinfo.html", "productdashboard.html", "cart.html", "sold.html", "userdashboard.html"]; // Add pages that require login
      const currentLocation = window.location.href;

      if (restrictedPages.includes(currentLocation.split('/').pop())) {
          alert("You need to be logged in to access this page.");
          window.location.href = "login.html,";
      }
  }

  // Get the login button element
  const loginButton = document.querySelector(".btn-dark");

  // Add click event listener to the login button
  loginButton.addEventListener("click", function () {
      // Get user input values
      const email = document.getElementById("form2Example17").value;
      const password = document.getElementById("form2Example27").value;

      // Retrieve existing users from local storage
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

      // Check if the provided email and password match any user in local storage
      const authenticatedUser = existingUsers.find(
          (user) => user.email === email && user.password === password
      );

      // If user is authenticated, redirect to the dashboard
      if (authenticatedUser) {
          alert(`Welcome back, ${authenticatedUser.name}! Redirecting to the dashboard.`);
          // Save the logged-in user in local storage
          localStorage.setItem("loggedInUser", JSON.stringify(authenticatedUser));
          // You can replace the following line with actual redirection logic
          window.location.href = "index.html";
      } else {
          alert("Invalid email or password. Please try again.");
      }

      // Clear the form fields
      document.getElementById("form2Example17").value = "";
      document.getElementById("form2Example27").value = "";
  });

  // Include the logout function
  const logoutButton = document.getElementById("logoutBtn");
  if (logoutButton) {
      logoutButton.addEventListener("click", logout);
  }

  // Include the functions to show, update, and delete user info
  const showUserInfoButton = document.getElementById("showUserInfoBtn");
  if (showUserInfoButton) {
      showUserInfoButton.addEventListener("click", showUserInfo);
  }

  const updateUserButton = document.getElementById("updateUserBtn");
  if (updateUserButton) {
      updateUserButton.addEventListener("click", updateUser);
  }

  const deleteAccountButton = document.getElementById("deleteAccountBtn");
  if (deleteAccountButton) {
      deleteAccountButton.addEventListener("click", deleteAccount);
  }
});

// Include the login function from your original script
function login() {
  // Get input values
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // Check if user exists in local storage
  var storedUser = JSON.parse(localStorage.getItem(username));
  if (storedUser && storedUser.password === password) {
      // Redirect to the dashboard
      window.location.href = "index.html";
  } else {
      alert("Invalid username or password");
  }
}

// New logout function
function logout() {
  // Remove logged-in user from local storage
  localStorage.removeItem("loggedInUser");

  // Redirect to the login page
  window.location.href = "login.html";
}

// Function to show user info
function showUserInfo() {
  // Retrieve logged-in user from local storage
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // Display user info (you can modify this based on your needs)
  alert(`User Info:\nName: ${loggedInUser.name}\nEmail: ${loggedInUser.email}`);
}

// New function to update user info
function updateUser() {
  // Retrieve logged-in user from local storage
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // Update user info based on form values
  loggedInUser.name = document.getElementById("form3Example1c").value;
  loggedInUser.email = document.getElementById("form3Example3c").value;
  loggedInUser.password = document.getElementById("form3Example4c").value;
  loggedInUser.gender = document.getElementById("gender").value;

  // Save the updated user info back to local storage
  localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

  // Notify the user about the successful update
  alert("User info updated successfully.");

  // Clear the form fields
  document.getElementById("form3Example1c").value = "";
  document.getElementById("form3Example3c").value = "";
  document.getElementById("form3Example4c").value = "";
  document.getElementById("form3Example4cd").value = "";
  document.getElementById("gender").value = "";
}

// Function to delete user account
function deleteAccount() {
  // Retrieve logged-in user from local storage
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // Retrieve existing users from local storage
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  // Remove user from existing users
  const updatedUsers = existingUsers.filter(user => user.email !== loggedInUser.email);

  // Save updated users back to local storage
  localStorage.setItem("users", JSON.stringify(updatedUsers));

  // Remove the logged-in user key
  localStorage.removeItem("loggedInUser");

  // Redirect to the login page
  window.location.href = "login.html";
}