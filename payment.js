function updateReservationInfo() {
    const pricePerNight = Number(localStorage.getItem('pricePerNight'));
    const total = localStorage.getItem('total');
    const checkinDate = localStorage.getItem('checkinDate');
    const checkoutDate = localStorage.getItem('checkoutDate');
    const numNights = localStorage.getItem('numNights');
    
    // Get HTML elements to populate
    const propTitle = document.querySelector('.prop-title');
    const nightsValue = document.querySelector('.price-detail .value');
    const totalValue = document.querySelector('.total .value');
    
    // Populate the HTML elements with data from LocalStorage
    propTitle.textContent = 'Belsize Cottage';
    nightsValue.textContent = numNights;
    totalValue.textContent = total;
  }
  
  
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  function populateBookingData() {
    // Retrieve data from localStorage
    const localStorageData = JSON.parse(localStorage.getItem('reservationInfo'));
    const checkinDate = formatDate(localStorageData.checkinDate);
    const checkoutDate = formatDate(localStorageData.checkoutDate);
    const numGuests = localStorageData.numGuests;
    const cleaningFee = `$${localStorageData.cleaningFee}`
    // Get references to HTML elements
    const datesSpan = document.getElementById('booking-dates');
    const guestsSpan = document.getElementById('booking-guests');
    const cleaningFeeElement = document.getElementById('cleaning-fee');
  
    // Set the retrieved data into the HTML elements
    datesSpan.innerText = `${checkinDate} to ${checkoutDate}`;
    guestsSpan.innerText = numGuests;
    cleaningFeeElement.innerText = cleaningFee
  }
  
  
  
  window.addEventListener('DOMContentLoaded', () => {
    // Load reservationInfo from localStorage
    const reservationInfo = JSON.parse(localStorage.getItem('reservationInfo')) || {};
    // document.getElementById('checkin-date').value = reservationInfo.checkinDate ? reservationInfo.checkinDate.toISOString().slice(0,10) : '';
    // document.getElementById('checkout-date').value = reservationInfo.checkoutDate ? reservationInfo.checkoutDate.toISOString().slice(0,10) : '';
    // document.getElementById('num-guests').value = reservationInfo.numGuests || '';
    updateReservationInfo();
    
    const checkinInput = document.getElementById('checkin-date');
    const checkoutInput = document.getElementById('checkout-date');
  
    // checkinInput.addEventListener('change', () => {
    //   updateReservationInfo();
    // });
  
    // checkoutInput.addEventListener('change', () => {
    //   updateReservationInfo();
    // });
  
    // const reserveButton = document.getElementById('reserve-button');
    // reserveButton.addEventListener('click', () => {
    //   // Save reservationInfo to localStorage upon clicking 'reserve' button
    //   const reservationInfo = {
    //     checkinDate: new Date(document.getElementById('checkin-date').value),
    //     checkoutDate: new Date(document.getElementById('checkout-date').value),
    //     numGuests: parseInt(document.getElementById('num-guests').value),
    //     totalPrice: parseFloat(document.querySelector('.total .value').textContent.slice(1))
    //   };
    //   localStorage.setItem('reservationInfo', JSON.stringify(reservationInfo));
    // });
  });
  
  updateReservationInfo()

  function reserve() {
    // Retrieve input values
    const checkinDate = document.getElementById("checkin-date");
    const checkoutDate = document.getElementById("checkout-date");
    const numGuests = document.getElementById("num-guests").value;
    const total = document.querySelector(".total .value").textContent;
  
    // Check if check-in or check-out form is empty
    if (checkinDate.value === "") {
      checkinDate.style.border = "2px solid red";
      return;
    }
    if (checkoutDate.value === "") {
      checkoutDate.style.border = "2px solid red";
      return;
    }
  
    // Save input values to local storage
    localStorage.setItem("checkinDate", checkinDate.value);
    localStorage.setItem("checkoutDate", checkoutDate.value);
    localStorage.setItem("numGuests", numGuests);
    localStorage.setItem("total", total);
    localStorage.setItem("pricePerNight", 500)
  
    // Redirect to payment page
    window.location.href = "payment.html";
  }
  
  // Add event listeners to the reserve button and check-in/check-out date fields
  // document.getElementById("reserve-button").addEventListener("click", reserve);
  // document.getElementById("checkin-date").addEventListener("change", function() {
  //   this.style.border = "none";
  // });
  // document.getElementById("checkout-date").addEventListener("change", function() {
  //   this.style.border = "none";
  // });

  /* send request */

  function sendRequest() {
    const propertyName = "Belsize Park"
    const numNights = localStorage.numNights;
    const checkinDate = localStorage.checkinDate;
    const checkoutDate = localStorage.checkoutDate;
    const total = localStorage.total;
    const numGuests = localStorage.numGuests;
    const email = JSON.parse(localStorage.getItem('userData')).email
    const name = JSON.parse(localStorage.getItem('userData')).name
  
    const child1Div = document.querySelector('.child1');
    const child2Div = document.querySelector('.child2');
  
    // Update child1 div
    child1Div.innerHTML = `<h1>Your request has been sent to the host!</h1>`;
  
    // Hide child2 div
    child2Div.style.display = 'none';
    sendReservationData(checkinDate, checkoutDate, numGuests, email, name)
  }
  
  /* Check if payment form is filled */

  function checkForm() {
    const cardHolder = document.getElementById('card-holder');
    const cardNumber = document.getElementById('card-number');
    const expiryDate = document.getElementById('expiry-date');
    const cvv = document.getElementById('cvv');
    
    let formIsValid = true;
    
    if (cardHolder.value === '') {
      formIsValid = false;
      cardHolder.style.border = '2px solid red';
    } else {
      cardHolder.style.border = '';
    }
    
    if (cardNumber.value === '') {
      formIsValid = false;
      cardNumber.style.border = '2px solid red';
    } else {
      cardNumber.style.border = '';
    }
    
    if (expiryDate.value === '') {
      formIsValid = false;
      expiryDate.style.border = '2px solid red';
    } else {
      expiryDate.style.border = '';
    }
    
    if (cvv.value === '') {
      formIsValid = false;
      cvv.style.border = '2px solid red';
    } else {
      cvv.style.border = '';
    }
    
    if (formIsValid) {
      sendRequest();
    }
  }
  




        window.addEventListener('load', function() {
            populateBookingData();
          });
   
          async function sendReservationData(checkinDate, checkoutDate, numberOfGuests, useremail, username) {
            try {
              const response = await fetch('http://localhost:3000/reservation', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  checkinDate,
                  checkoutDate,
                  numberOfGuests,
                  useremail,
                  username
                })
              });
          
              if (response.ok) {
                return response.status; // Reservation data sent successfully
              } else {
                throw new Error('Error sending reservation data');
              }
            } catch (error) {
              console.error('Error:', error);
              throw error;
            }
          }
          
                   


  /* check if user logged in */
    function displayDashboard() {
      const userData = localStorage.getItem('userData');
      if (userData) {
          
        const data = JSON.parse(userData);
        const helloDiv = document.createElement('div');
        helloDiv.style.display = "inline-block";
        helloDiv.innerText = `Hello, ${data.name}!`;
        const signupBtn = document.getElementById('signup-btn');
        signupBtn.parentNode.replaceChild(helloDiv, signupBtn);
      }
  
      }
    
      window.addEventListener('DOMContentLoaded', displayDashboard);

