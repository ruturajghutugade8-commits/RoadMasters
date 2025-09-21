// 🔄 Clear previous payment confirmation (remove ✅)
    localStorage.removeItem("paymentConfirmed");

    // Retrieve booking details from sessionStorage
    const bookingDetails = JSON.parse(sessionStorage.getItem("bookingDetails"));

    if (bookingDetails) {
      document.getElementById("bookingDetails").innerHTML = `
        <p><strong>Name:</strong> ${bookingDetails.name}</p>
        <p><strong>Car:</strong> ${bookingDetails.car}</p>
        <p><strong>Start Date:</strong> ${bookingDetails.startDate}</p>
        <p><strong>End Date:</strong> ${bookingDetails.endDate}</p>
        <p><strong>Aadhar Number:</strong> ${bookingDetails.aadhar}</p>
        <p><strong>Driving License Number:</strong> ${bookingDetails.dl}</p>
        <p><strong>Total Price:</strong> ₹${bookingDetails.totalPrice}</p>
        <p><strong>Confirmation Message:</strong> ${bookingDetails.confirmationMessage}</p>
      `;
    } else {
      document.getElementById("bookingDetails").innerHTML = "<p>No booking details found.</p>";
    }
    // Redirect to payment page
    document.getElementById("payNowButton").addEventListener('click', function() {
      window.location.href = "pay.html";
    });

    // Save booking data into localStorage (for multiple bookings)
    document.getElementById("saveDataButton").addEventListener('click', function() {
      if (bookingDetails) {
        let allBookings = JSON.parse(localStorage.getItem("allBookings")) || [];
        allBookings.push(bookingDetails);
        localStorage.setItem("allBookings", JSON.stringify(allBookings));
        alert("✅ Booking data saved successfully!");
      } else {
        alert("⚠️ No booking details found to save.");
      }
    });
