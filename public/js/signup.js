$(document).ready(function () {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var firstNameInput = $("#first-name-input");
  var lastNameInput = $("#last-name-input");
  var handleInput = $("#handle-input");
  var emailInput = $("#email-input");
  var passwordInput = $("#password-input");
  var confirmPasswordInput = $("#confirm-password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim(),
      email: emailInput.val().trim(),
      handle: handleInput.val().trim(),
      password: passwordInput.val().trim(),
      confirmPassword: confirmPasswordInput.val().trim()
    };

    if (!userData.firstName || !userData.lastName || !userData.handle || !userData.email || !userData.password || !userData.confirmPassword) {
      showErrorMessage("Please fill in all fields.");
      return;
    }

    if (userData.password !== userData.confirmPassword) {
      showErrorMessage("Passwords do not match.");
      return;
    }

    // If we have an email and password, run the signUpUser function
    signUpUser(userData);
    firstNameInput.val("");
    lastNameInput.val("");
    handleInput.val("");
    emailInput.val("");
    passwordInput.val("");
    confirmPasswordInput.val("");
  });
});

// Does a post to the signup route. If successful, we are redirected to the members page
// Otherwise we log any errors
function signUpUser(userData) {
  $("#alert").hide();

  $.post("/api/signup", userData).then(function (data) {
    window.location.replace(data);
    // If there's an error, handle it by throwing up a bootstrap alert
  }).catch(handleLoginErr);
}

function showErrorMessage(msg) {
  $("#alert .msg").text(msg);
  $("#alert").fadeIn(500);
}

function handleLoginErr(err) {
  showErrorMessage(err.responseJSON);
  $("#alert .msg").text();
}
