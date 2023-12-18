document.addEventListener("DOMContentLoaded", function () {
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

// Include the logout function from your original script
function logout() {
  // Remove logged-in user from local storage
  localStorage.removeItem("loggedInUser");

  // Redirect to the login page
  window.location.href = "index.html";
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
  window.location.href = "index.html";
}
