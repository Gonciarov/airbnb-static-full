async function updateReservationInfo() {
    const id = window.location.pathname.split('/').pop().replace('.html', '');
  
    try {
      const property = await getPropertyData(id);
        console.log(property)
      const pricePerNight = property.pricepernight;
      const cleaningFee = property.cleaningfee;
      const airbnbServiceFee = 12;
  
      const checkinDate = new Date(document.getElementById('checkin-date').value);
      const checkoutDate = new Date(document.getElementById('checkout-date').value);
      const numGuests = parseInt(document.getElementById('num-guests').value);
      const nights = Math.ceil((checkoutDate - checkinDate) / (1000 * 3600 * 24)) || 1;
      const totalPrice = (nights * pricePerNight) + cleaningFee + airbnbServiceFee || 0;
      const pricePerNightTotal = pricePerNight * nights;
    
      document.querySelector('.price-per-night').textContent = `$${pricePerNight} per night`;
      document.querySelector('.price-detail:nth-child(1) .value').textContent = `${nights}`;
      document.querySelector('.price-detail:nth-child(2) .value').textContent = `$${cleaningFee}`;
      document.querySelector('.price-detail:nth-child(3) .value').textContent = `$${airbnbServiceFee}`;
      document.querySelector('.total .value').textContent = `$${totalPrice}`;
        
      // Save user input to localStorage
      const reservationInfo = {
        checkinDate: checkinDate,
        checkoutDate: checkoutDate,
        numGuests: numGuests,
        totalPrice: totalPrice,
        pricePerNight: pricePerNight,
        cleaningFee: cleaningFee
      };
      console.log(reservationInfo)
      localStorage.setItem('reservationInfo', JSON.stringify(reservationInfo));
    } catch (error) {
      console.error('Error retrieving property data:', error);
    }
  }
  
  async function getPropertyData(id) {
    try {
      const response = await fetch('http://localhost:3000/property', {
        method: 'POST',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        return data;
      } else {
        throw new Error('Failed to retrieve property data');
      }
    } catch (error) {
      throw new Error('Error fetching property data: ' + error.message);
    }
  }
  


// function updateReservationInfo() {
//   const id = window.location.pathname.split('/').pop().replace('.html', '');
//   const property = data[id];
//   const pricePerNight = property.pricePerNight;
//   console.log(pricePerNight)
//   const cleaningFee = property.cleaningFee;
//   const airbnbServiceFee = 12;
//   const checkinDate = new Date(document.getElementById('checkin-date').value);
//   const checkoutDate = new Date(document.getElementById('checkout-date').value);
//   const numGuests = parseInt(document.getElementById('num-guests').value);
//   const nights = Math.ceil((checkoutDate - checkinDate) / (1000 * 3600 * 24)) || 1;
//   const totalPrice = (nights * pricePerNight) + cleaningFee + airbnbServiceFee || 0;
//   const pricePerNightTotal = pricePerNight * nights;

//   document.querySelector('.price-per-night').textContent = `$${pricePerNight} per night`;
//   document.querySelector('.price-detail:nth-child(1) .value').textContent = `${nights}`;
//   document.querySelector('.price-detail:nth-child(2) .value').textContent = `$${cleaningFee}`;
//   document.querySelector('.price-detail:nth-child(3) .value').textContent = `$${airbnbServiceFee}`;
//   document.querySelector('.total .value').textContent = `$${totalPrice}`;

//   // Save user input to localStorage
//   const reservationInfo = {
//     checkinDate: checkinDate,
//     checkoutDate: checkoutDate,
//     numGuests: numGuests,
//     totalPrice: totalPrice,
//     pricePerNight: pricePerNight
//   };
//   localStorage.setItem('reservationInfo', JSON.stringify(reservationInfo));
// }

  
//   window.addEventListener('DOMContentLoaded', () => {
//     // Load reservationInfo from localStorage
//     const reservationInfo = JSON.parse(localStorage.getItem('reservationInfo')) || {};
//     document.getElementById('checkin-date').value = reservationInfo.checkinDate ? reservationInfo.checkinDate.toISOString().slice(0,10) : '';
//     document.getElementById('checkout-date').value = reservationInfo.checkoutDate ? reservationInfo.checkoutDate.toISOString().slice(0,10) : '';
//     document.getElementById('num-guests').value = reservationInfo.numGuests || '';
//     updateReservationInfo();
    
    const checkinInput = document.getElementById('checkin-date');
    const checkoutInput = document.getElementById('checkout-date');
  
    checkinInput.addEventListener('change', () => {
      updateReservationInfo();
    });
  
    checkoutInput.addEventListener('change', () => {
      updateReservationInfo();
    });
  
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
//   });
  
  updateReservationInfo()

  function reserve() {
    // Retrieve input values
    const checkinDate = document.getElementById("checkin-date");
    const checkoutDate = document.getElementById("checkout-date");
    const numGuests = document.getElementById("num-guests").value;
    const total = document.querySelector(".total .value").textContent;
    const numNights = document.querySelector('.price-detail:nth-child(1) .value').textContent
  
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
    localStorage.setItem("numNights", numNights)
  
    // Redirect to payment page
    checkLocalStorage()
  }
  
  // Redirect to payment page if logged in
  function checkLocalStorage() {
    if (localStorage.getItem('userData')) {
      window.location.href = 'payment.html';
    } else {
      showSignUpBox();
    }
  }
  
  // Add event listeners to the reserve button and check-in/check-out date fields
  document.getElementById("reserve-button").addEventListener("click", reserve);
  document.getElementById("checkin-date").addEventListener("change", function() {
    this.style.border = "none";
  });
  document.getElementById("checkout-date").addEventListener("change", function() {
    this.style.border = "none";
  });

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
      