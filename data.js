// ✅ Predefined admin credentials
const ADMIN_USERNAME = "rmsruturaj";
const ADMIN_PASSWORD = "nad@3118";

// Create overlay (dark background)
const overlay = document.createElement("div");
overlay.style.position = "fixed";
overlay.style.top = "0";
overlay.style.left = "0";
overlay.style.width = "100%";
overlay.style.height = "100%";
overlay.style.background = "rgba(0,0,0,0.75)";
overlay.style.display = "flex";
overlay.style.justifyContent = "center";
overlay.style.alignItems = "center";
overlay.style.zIndex = "9999"; // always on top
document.body.appendChild(overlay);

// Create login box (card style)
const box = document.createElement("div");
box.style.background = "#ffffff";
box.style.padding = "30px";
box.style.borderRadius = "15px";
box.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
box.style.textAlign = "center";
box.style.width = "320px";
box.style.fontFamily = "Arial, sans-serif";
overlay.appendChild(box);

// Title
const title = document.createElement("h2");
title.innerText = "🔐 Admin Login";
title.style.marginBottom = "20px";
title.style.color = "#333";
box.appendChild(title);

// Username input
const userInput = document.createElement("input");
userInput.type = "text";
userInput.placeholder = "Enter Username";
userInput.style.margin = "10px 0";
userInput.style.padding = "10px";
userInput.style.width = "90%";
userInput.style.border = "1px solid #ccc";
userInput.style.borderRadius = "8px";
userInput.style.outline = "none";
userInput.style.fontSize = "14px";
box.appendChild(userInput);

// Password input
const passInput = document.createElement("input");
passInput.type = "password"; // 🔐 hidden
passInput.placeholder = "Enter Password";
passInput.style.margin = "10px 0";
passInput.style.padding = "10px";
passInput.style.width = "90%";
passInput.style.border = "1px solid #ccc";
passInput.style.borderRadius = "8px";
passInput.style.outline = "none";
passInput.style.fontSize = "14px";
box.appendChild(passInput);

// Login button
const btn = document.createElement("button");
btn.innerText = "Login";
btn.style.marginTop = "15px";
btn.style.padding = "10px";
btn.style.width = "100%";
btn.style.background = "#4CAF50";
btn.style.color = "white";
btn.style.border = "none";
btn.style.borderRadius = "8px";
btn.style.cursor = "pointer";
btn.style.fontSize = "16px";
btn.style.transition = "0.3s";
btn.onmouseover = () => (btn.style.background = "#45a049");
btn.onmouseout = () => (btn.style.background = "#4CAF50");
box.appendChild(btn);

// Check credentials on click
btn.addEventListener("click", () => {
  const user = userInput.value.trim();
  const pass = passInput.value.trim();

  if (user === ADMIN_USERNAME && pass === ADMIN_PASSWORD) {
    alert("✅ Access Granted! Welcome Admin.");
    document.body.removeChild(overlay); // remove login UI
  } else {
    alert("❌ Access Denied! Redirecting...");
    window.location.href = "book.html"; // redirect if wrong
  }
});

// Save current booking (if exists in sessionStorage)
const bookingDetails = JSON.parse(sessionStorage.getItem("bookingDetails"));
if (bookingDetails) {
  bookingDetails.paid = false; // default = pending
  let allBookings = JSON.parse(localStorage.getItem("allBookings")) || [];
  allBookings.push(bookingDetails);
  localStorage.setItem("allBookings", JSON.stringify(allBookings));
  sessionStorage.removeItem("bookingDetails"); // clear after saving
}

// Retrieve bookings
const allBookings = JSON.parse(localStorage.getItem("allBookings")) || [];
const dataTable = document.getElementById("dataTable");

// Helper for boolean check
const isTrue = (v) => v === true || v === "true";

if (allBookings.length > 0) {
  let tableHTML = `
    <table>
      <tr>
        <th>Name</th>
        <th>Car</th>
        <th>Start Date</th>
        <th>End Date</th>
        <th>Aadhar</th>
        <th>Driving License</th>
        <th>Total Price</th>
        <th>Confirmation Message</th>
        <th>Payment Status</th>
        <th>Action</th>   <!-- ✅ New Delete column -->
      </tr>
  `;

  allBookings.forEach((b, index) => {
    const paid = isTrue(b.paid);
    tableHTML += `
      <tr>
        <td>${b.name ?? "-"}</td>
        <td>${b.car ?? "-"}</td>
        <td>${b.startDate ?? "-"}</td>
        <td>${b.endDate ?? "-"}</td>
        <td>${b.aadhar ?? "-"}</td>
        <td>${b.dl ?? "-"}</td>
        <td>₹${b.totalPrice ?? "0"}</td>
        <td>${b.confirmationMessage || "-"}</td>
        <td class="${paid ? "paid" : "pending"}">${paid ? "Paid" : "Pending"}</td>
        <td>
          <button class="danger" onclick="deleteRow(${index})">Delete</button>
        </td>
      </tr>
    `;
  });

  tableHTML += "</table>";
  dataTable.innerHTML = tableHTML;
} else {
  dataTable.innerHTML = `<p class="no-data">No booking data found.</p>`;
}

// ✅ Delete one booking by index
function deleteRow(index) {
  if (confirm("Are you sure you want to delete this booking?")) {
    let allBookings = JSON.parse(localStorage.getItem("allBookings")) || [];
    allBookings.splice(index, 1); // remove 1 item
    localStorage.setItem("allBookings", JSON.stringify(allBookings));
    location.reload(); // refresh table
  }
}

// Clear all booking data
function clearData() {
  if (confirm("Are you sure you want to clear ALL booking data?")) {
    localStorage.removeItem("allBookings");
    location.reload();
  }
}
