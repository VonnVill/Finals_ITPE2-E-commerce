document.addEventListener("DOMContentLoaded", function () {
  // Get the registration button element
  const registerButton = document.querySelector(".btn-primary");

  // Add click event listener to the registration button
  registerButton.addEventListener("click", function () {
    // Get user input values
    const name = document.getElementById("form3Example1c").value;
    const email = document.getElementById("form3Example3c").value;
    const password = document.getElementById("form3Example4c").value;
    const confirmPassword = document.getElementById("form3Example4cd").value;
    const gender = document.getElementById("gender").value;

    // Validate user inputs
    if (!name || !email || !password || !confirmPassword || !gender) {
      alert("Please fill in all the fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Create user object
    const userToRegister = {
      name,
      email,
      password,
      gender,
    };

    // Retrieve existing users from local storage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the email is already registered
    if (existingUsers.some((user) => user.email === email)) {
      alert("Email is already registered. Please use a different email.");
      return;
    }

    // Add the new user to the array
    existingUsers.push(userToRegister);

    // Save the updated user list to local storage
    localStorage.setItem("users", JSON.stringify(existingUsers));

    // Display a success message
    alert(`User ${name} has been successfully registered.`);

    // Clear the form fields
    document.getElementById("form3Example1c").value = "";
    document.getElementById("form3Example3c").value = "";
    document.getElementById("form3Example4c").value = "";
    document.getElementById("form3Example4cd").value = "";
    document.getElementById("gender").value = "";

    // Redirect to the Login
    window.location.href = "login.html";
  });
});
