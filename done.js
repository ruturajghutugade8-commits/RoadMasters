// Predefined admin credentials
const ADMIN_USERNAME = "rmsruturaj";
const ADMIN_PASSWORD = "nad@3118";

function checkLogin() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === ADMIN_USERNAME && pass === ADMIN_PASSWORD) {
    alert("✅ Access Granted! Welcome Admin.");
    document.getElementById("loginBox").style.display = "none";  // hide login
    document.getElementById("pageContent").style.display = "block"; // show admin area
  } else {
    alert("❌ Access Denied! Redirecting...");
    window.location.href = "book.html"; // redirect wrong user
  }
}

function markPaymentDone() {
  // Get all bookings
  let allBookings = JSON.parse(localStorage.getItem("allBookings")) || [];

  if (allBookings.length > 0) {
    // 👉 Update the last booking (most recent)
    allBookings[allBookings.length - 1].paid = true;

    // Save back to localStorage
    localStorage.setItem("allBookings", JSON.stringify(allBookings));

    // Optional: set flag for pay.html to show ✅
    localStorage.setItem("paymentConfirmed", "true");

    alert("✅ Payment marked as DONE.");
  } else {
    alert("⚠️ No bookings found to update.");
  }
}
