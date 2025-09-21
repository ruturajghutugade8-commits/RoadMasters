 // Booking form submission
    document.getElementById("bookingForm").addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const car = document.getElementById("car").value;
      const date = document.getElementById("date").value;
      const date1 = document.getElementById("date1").value;
      const aadhar = document.getElementById("aadhar").value;
      const dl = document.getElementById("dl").value;

      // Get the car price
      const carSelect = document.getElementById("car");
      const selectedCar = carSelect.options[carSelect.selectedIndex];
      const carPrice = parseInt(selectedCar.getAttribute("data-price"));

      // Calculate the number of days
      const startDate = new Date(date);
      const endDate = new Date(date1);
      const timeDiff = endDate - startDate;
      const totalDays = timeDiff / (1000 * 3600 * 24);

      // Total price
      const totalPrice = carPrice * totalDays;

      // Store in sessionStorage
      sessionStorage.setItem("bookingDetails", JSON.stringify({
        name: name,
        car: car,
        startDate: date,
        endDate: date1,
        aadhar: aadhar,
        dl: dl,
        totalPrice: totalPrice,
        confirmationMessage: `Thank you, ${name}. Your booking for the ${car} is confirmed from ${date} to ${date1}. Total Price: ₹${totalPrice}. Please complete your payment process.`
      }));

      // Redirect
      window.location.href = 'book.html';
    });

    // Logo fullscreen functionality
    const logoImg = document.getElementById("logoImg");
    const logoOverlay = document.getElementById("logoOverlay");
    const closeOverlay = document.getElementById("closeOverlay");

    logoImg.addEventListener("click", () => {
      logoOverlay.style.display = "flex";
    });

    closeOverlay.addEventListener("click", () => {
      logoOverlay.style.display = "none";
    });

    logoOverlay.addEventListener("click", (e) => {
      if (e.target === logoOverlay) {
        logoOverlay.style.display = "none";
      }
    });


