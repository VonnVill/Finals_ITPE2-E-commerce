document.addEventListener("DOMContentLoaded", function () {
    // ... (existing code)
  
    const updateUserInfoButton = document.getElementById("updateUserInfoBtn");
    if (updateUserInfoButton) {
      updateUserInfoButton.addEventListener("click", updateUserInfo);
    }
  });
  
  
  // Function to update user info
  function updateUserInfo() {
    // Retrieve logged-in user from local storage
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  
    // Update user info based on form values
    loggedInUser.name = document.getElementById("form3Example1c").value;
    loggedInUser.email = document.getElementById("form3Example3c").value;
    loggedInUser.phone = document.getElementById("form3Example4c").value;
    loggedInUser.address = document.getElementById("form3Example4cd").value;
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
  