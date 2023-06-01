function saveFormData() {
    // Get form field values
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    
    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
  
    // Check if any fields are empty
    let isFormValid = true;
    if (name.trim() === "") {
      nameInput.classList.add("red");
      isFormValid = false;
    } else {
      nameInput.classList.remove("red");
    }
    if (email.trim() === "") {
      emailInput.classList.add("red");
      isFormValid = false;
    } else {
      emailInput.classList.remove("red");
    }
    if (password.trim() === "") {
      passwordInput.classList.add("red");
      isFormValid = false;
    } else {
      passwordInput.classList.remove("red");
    }
  
    if (isFormValid) {
      // Create an object to store the form data
      const formData = {
        name,
        email,
        password
      };
  
      // Save the form data to local storage
      localStorage.setItem("formData", JSON.stringify(formData));
      document.getElementsByClassName("signup-box")[0].remove();
    }
    displayDashboard()
  }
  
function displayDashboard() {
const formData = localStorage.getItem('formData');
if (formData) {
  const navRight = document.getElementById('nav-right');
  navRight.innerHTML = `<div class="navbar__menu__dropdown">
    <button onclick="toggleDropDownMenu()" id="navbar__menu__dropbtn" class="navbar__menu__dropbtn">Menu ▾</button>
    <div id="navbar__menu__dropdown-content" class="navbar__menu__dropdown-content">
      <a href="#">Host your home</a>
      <a href="#">Host an experience</a>
      <a href="#">Messages</a>
      <a href="#">Notifications</a>
      <a href="#">Trips</a>
      <a href="#">Account</a>
      <a href="#">Wishlists</a>
      <a href="#">Help</a>
    </div>
    <a href="#" class="navbar__menu__item">Hi, ${JSON.parse(localStorage['formData'])['name']}!</a>
  </div>`;
}
}

window.addEventListener('load', function() {
    displayDashboard();
  });
  

function showSignUpBox() {
    // create and style the box element
    var box = document.createElement("div");
    box.classList.add("signup-box");
  
    // create and style the inner content of the box
    var innerBox = document.createElement("div");
    innerBox.classList.add("signup-box-inner");
  
    // add the inner content to the box element
    box.appendChild(innerBox);
  
    // create and style the heading element
    var heading = document.createElement("h2");
    heading.innerHTML = "Log in or sign up";
    heading.classList.add("signup-heading");
  
    // add the heading to the inner content element
    innerBox.appendChild(heading);
  
    // create and style the close button
    var closeButton = document.createElement("button");
    closeButton.innerHTML = "&times;";
    closeButton.classList.add("signup-close-button");
  
    // add the close button to the inner content element
    innerBox.appendChild(closeButton);
  
    // create and style the form element
    var form = document.createElement("form");
    form.classList.add("signup-form");
  
    // add the form to the inner content element
    innerBox.appendChild(form);
  
    // create and style the input fields
    var nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "Full name";
    nameInput.classList.add("signup-input");
    nameInput.id = "name"; // added ID for access
    var emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.placeholder = "Email address";
    emailInput.classList.add("signup-input");
    emailInput.id = "email"; // added ID for access
    var passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.placeholder = "Password";
    passwordInput.classList.add("signup-input");
    passwordInput.id = "password"; // added ID for access
  
    // add the input fields to the form element
    form.appendChild(nameInput);
    form.appendChild(emailInput);
    form.appendChild(passwordInput);
  
    // create and style the continue button
    var continueButton = document.createElement("button");
    continueButton.innerHTML = "Continue";
    continueButton.classList.add("signup-continue-button");
    continueButton.onclick = saveFormData;
    continueButton.id = "continue"; // added ID for access
  
    // add the continue button to the inner content element
    innerBox.appendChild(continueButton);
  
    // create and style the separation line
    var separationLine = document.createElement("div");
    separationLine.classList.add("signup-separation-line");
  
    // add the separation line to the inner content element
    innerBox.appendChild(separationLine);
  
    // create and style the login buttons
    var loginGoogleButton = document.createElement("button");
    loginGoogleButton.innerHTML = "Login with Google";
    loginGoogleButton.classList.add("signup-login-button");
    var loginFacebookButton = document.createElement("button");
    loginFacebookButton.innerHTML = "Login with Facebook";
    loginFacebookButton.classList.add("signup-login-button");
    var loginAppleButton = document.createElement("button");
    loginAppleButton.innerHTML = "Login with Apple";
    loginAppleButton.classList.add("signup-login-button");
    var loginEmailButton = document.createElement("button");
    loginEmailButton.innerHTML = "Login with email";
    loginEmailButton.classList.add("signup-login-button");
  
    // add the login buttons to the inner content element
    innerBox.appendChild(loginGoogleButton);
    innerBox.appendChild(loginFacebookButton);
    innerBox.appendChild(loginAppleButton);
    innerBox.appendChild(loginEmailButton);
  
    // add the box
    document.body.appendChild(box);
  
    // add event listener to the close button to remove the box element from the page
    closeButton.addEventListener("click", function() {
      document.body.removeChild(box);
    });
  }

  
  
  // add event listener to the 'Sign up' button to run the function when clicked
  document.getElementById("signup-btn").addEventListener("click", showSignUpBox);
  