 const booking = JSON.parse(sessionStorage.getItem("bookingDetails"));
    let currentInstallmentAmount = 0;

    if (booking) {
      document.getElementById("bookingSummary").innerHTML = `
        <p><strong>Name:</strong> ${booking.name}</p>
        <p><strong>Car:</strong> ${booking.car}</p>
        <p><strong>From:</strong> ${booking.startDate}</p>
        <p><strong>To:</strong> ${booking.endDate}</p>
        <p><strong>Total Price:</strong> ₹${booking.totalPrice}</p>
      `;
      updateInstallment();
    }

    function updateInstallment() {
      const plan = parseInt(document.getElementById("installmentPlan").value);
      currentInstallmentAmount = Math.ceil(booking.totalPrice / plan);
      document.getElementById("installmentInfo").innerHTML =
        `You selected <strong>${plan} Installment(s)</strong>. Each payment = <strong>₹${currentInstallmentAmount}</strong>`;
    }

    function payNow() {
      const upiID = "ruturajghutugade8@okhdfcbank";
      const name = "Ruturaj Ghutugade";
      const note = `Car Booking Installment - ${booking?.car || 'Car'}`;

      const upiLink = `upi://pay?pa=${upiID}&pn=${encodeURIComponent(name)}&am=${currentInstallmentAmount}&cu=INR&tn=${encodeURIComponent(note)}`;
      document.getElementById("qrcode").innerHTML = "";
      new QRCode(document.getElementById("qrcode"), { text: upiLink, width: 200, height: 200 });
      window.location.href = upiLink;
    }

    // 🔄 Check if owner marked payment as done
    function checkPaymentStatus() {
      if (localStorage.getItem("paymentConfirmed") === "true") {
        document.getElementById("paymentCard").style.display = "none";
        document.getElementById("successOverlay").style.display = "flex";

        // ⚡ Clear it immediately so reload removes ✅
        localStorage.removeItem("paymentConfirmed");
      }
    }

    checkPaymentStatus();
    setInterval(checkPaymentStatus, 2000); // check every 2 sec
