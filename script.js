// Add event listeners to the scroll container
const scrollContainer = document.querySelector('.scroll-container');
scrollContainer.addEventListener('wheel', (event) => {
  event.preventDefault();
  scrollContainer.scrollLeft += event.deltaY * 3; // Adjust the scroll speed
});

// Make the icons draggable
let isDragging = false;
let startX;
let scrollLeft;

scrollContainer.addEventListener('mousedown', (event) => {
  isDragging = true;
  startX = event.pageX - scrollContainer.offsetLeft;
  scrollLeft = scrollContainer.scrollLeft;
});

scrollContainer.addEventListener('mouseleave', () => {
  isDragging = false;
});

scrollContainer.addEventListener('mouseup', () => {
  isDragging = false;
});

scrollContainer.addEventListener('mousemove', (event) => {
  if (!isDragging) return;
  event.preventDefault();
  const x = event.pageX - scrollContainer.offsetLeft;
  const walk = (x - startX) * 3;
  scrollContainer.scrollLeft = scrollLeft - walk;
});


/* Sign up */

function signUpClick() {
    // get the elements for the box and the background
    const box = document.createElement('div');
    const background = document.createElement('div');
  
    // set the class names for the box and the background
    box.className = 'signup-box';
    background.className = 'signup-background';
  
    // add the elements to the page
    document.body.appendChild(box);
    document.body.appendChild(background);
  
    // add the close button to the box
    const closeButton = document.createElement('button');
    closeButton.innerText = 'x';
    closeButton.className = 'signup-close';
    box.appendChild(closeButton);

      // add the name field to the box
      const nameLabel = document.createElement('label');
      nameLabel.innerText = 'Name';
      nameLabel.className = 'signup-label';
      box.appendChild(nameLabel);
    
      const nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.className = 'signup-input';
      box.appendChild(nameInput);
  
    // add the email field to the box
    const emailLabel = document.createElement('label');
    emailLabel.innerText = 'Email';
    emailLabel.className = 'signup-label';
    box.appendChild(emailLabel);
  
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.className = 'signup-input';
    box.appendChild(emailInput);
  
    // add the password field to the box
    const passwordLabel = document.createElement('label');
    passwordLabel.innerText = 'Password';
    passwordLabel.className = 'signup-label';
    box.appendChild(passwordLabel);
  
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.className = 'signup-input';
    box.appendChild(passwordInput);
  
    // add the continue button to the box
    const continueButton = document.createElement('button');
    continueButton.innerText = 'Sign Up';
    continueButton.className = 'signup-button';
    box.appendChild(continueButton);
  
    // add event listeners for the close button and the background
    closeButton.addEventListener('click', () => {
      box.remove();
      background.remove();
    });
  
    background.addEventListener('click', () => {
      nameInput.classList.remove('red-border');
      emailInput.classList.remove('red-border');
      passwordInput.classList.remove('red-border');
    });
  
    continueButton.addEventListener('click', () => {
      if (nameInput.value.trim() === '') {
        nameInput.classList.add('red-border');
      } else {
        nameInput.classList.remove('red-border');
      }
  
      if (emailInput.value.trim() === '') {
        emailInput.classList.add('red-border');
      } else {
        emailInput.classList.remove('red-border');
      }
  
      if (passwordInput.value.trim() === '') {
        passwordInput.classList.add('red-border');
      } else {
        passwordInput.classList.remove('red-border');
      }
  
      if (nameInput.value.trim() !== '' && emailInput.value.trim() !== '' && passwordInput.value.trim() !== '') {
        const userData = {
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          password: passwordInput.value.trim()
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        })
        .then(response => {
          if (response.ok) {
            // Success handling
            console.log('Registration successful!');
          } else {
            // Error handling
            console.error('Registration failed:', response.status);
          }
        })
        .catch(error => {
          // Error handling
          console.error('Registration failed:', error);
        });
        box.remove();
        background.remove();
        checkLocalStorage()
      }
    });
  }

  /* Login */

  async function loginClick() {
    // get the elements for the box and the background
    const box = document.createElement('div');
    const background = document.createElement('div');
  
    // set the class names for the box and the background
    box.className = 'signup-box';
    background.className = 'signup-background';
  
    // add the elements to the page
    document.body.appendChild(box);
    document.body.appendChild(background);
  
    // add the close button to the box
    const closeButton = document.createElement('button');
    closeButton.innerText = 'x';
    closeButton.className = 'signup-close';
    box.appendChild(closeButton);
  
    // add the email field to the box
    const emailLabel = document.createElement('label');
    emailLabel.innerText = 'Email';
    emailLabel.className = 'signup-label';
    box.appendChild(emailLabel);
  
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.id = 'email';
    emailInput.className = 'signup-input';
    box.appendChild(emailInput);
  
    // add the password field to the box
    const passwordLabel = document.createElement('label');
    passwordLabel.innerText = 'Password';
    passwordLabel.className = 'signup-label';
    box.appendChild(passwordLabel);
  
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.id = 'password';
    passwordInput.className = 'signup-input';
    box.appendChild(passwordInput);
  
    // add the continue button to the box
    const continueButton = document.createElement('button');
    continueButton.innerText = 'Login';
    continueButton.className = 'signup-button';
    continueButton.id = 'login-button';
    box.appendChild(continueButton);
  
    // add event listeners for the close button and the background
    closeButton.addEventListener('click', () => {
      box.remove();
      background.remove();
    });
  
    background.addEventListener('click', () => {
      emailInput.classList.remove('red-border');
      passwordInput.classList.remove('red-border');
    });
  
    continueButton.addEventListener('click', async () => {
      let hasError = false;
  
      if (emailInput.value.trim() === '') {
        emailInput.classList.add('red-border');
        hasError = true;
      } else {
        emailInput.classList.remove('red-border');
      }
  
      if (passwordInput.value.trim() === '') {
        passwordInput.classList.add('red-border');
        hasError = true;
      } else {
        passwordInput.classList.remove('red-border');
      }
  
      if (hasError) {
        return;
      }
  
      const email = emailInput.value;
      const password = passwordInput.value;
  
      try {
        const name = await getUserName(email);
  
        const userData = {
          "name": name,
          "email": email,
          "password": password
        };
  
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          body: JSON.stringify(userData),
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Unable to login. Please check your credentials.');
        }
  
        localStorage.setItem('userData', JSON.stringify(userData));
        box.remove();
        background.remove();
        console.log("success");
        checkLocalStorage();
      } catch (error) {
        console.error(error);
        // display error message to user
      }
    });
  }
  
  
  
  function checkLocalStorage() {
    
    const userData = localStorage.getItem('userData');
  
    if (userData) {
      const data = JSON.parse(userData);
      const helloDiv = document.createElement('div');
      helloDiv.innerText = `Hello, ${data.name}!`;
      const loginBtn = document.getElementById('login-btn');
      loginBtn.parentNode.replaceChild(helloDiv, loginBtn)
      const signupBtn = document.getElementById('signup-btn');
      signupBtn.innerHTML = '<div></div>'
    }

    }

    function getUserName(email) {
      console.log(email)
      return fetch('http://localhost:3000/getUserName', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
      })
      .then(response => {
        if (response.ok) {
          return response.json(); // Parse response body as JSON
        } else {
          throw new Error('Failed to get user name: ' + response.status);
        }
      })
      .then(data => {
        return data.name; // Extract the user name from the response data
      })
      .catch(error => {
        console.error('Failed to get user name:', error);
      });
    }
    
  
  
// Get all property links
const propertyLinks = document.querySelectorAll('.property');

// Add click event listener to each property link
propertyLinks.forEach(link => {
  link.addEventListener('click', event => {
    // Prevent the default link behavior
    event.preventDefault();

    // Get the unique id of the clicked property
    const propertyId = link.id;
    // Construct the URL for the single property page
    const url = `file:///Users/preface_ilja/Airbnb/${propertyId}.html`;

    // Redirect to the single property page
    window.location.href = url;
  });
});


  
window.addEventListener('DOMContentLoaded', checkLocalStorage);
  
