// ============================
// ⭐ Star Rating Setup
// ============================
const stars = document.getElementById("starContainer");
if (stars) {
  stars.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    let star = document.createElement("span");
    star.textContent = "★";
    star.dataset.value = i;

    star.onclick = function () {
      // Reset previous stars
      document.querySelectorAll("#starContainer span").forEach(s => s.classList.remove("active"));

      // Highlight selected stars
      for (let j = 0; j < i; j++) {
        document.querySelectorAll("#starContainer span")[j].classList.add("active");
      }

      // Save rating value
      stars.setAttribute("data-rating", i);
      console.log("Star rating selected:", i);
    };

    stars.appendChild(star);
  }
}

// ============================
// 👍👎 Thumbs Feedback
// ============================
let feedback = "";
document.getElementById("thumbUp").onclick = () => {
  feedback = "👍 Positive";
  console.log("Feedback:", feedback);
};
document.getElementById("thumbDown").onclick = () => {
  feedback = "👎 Negative";
  console.log("Feedback:", feedback);
};

// ============================
// 🚀 Submit Feedback
// ============================
document.getElementById("submitRating").onclick = () => {
  const rating = stars.getAttribute("data-rating") || "No Stars";
  console.log("Final Rating:", rating, "Feedback:", feedback);

  // Show Overlay
  const overlay = document.getElementById("overlay");
  overlay.classList.add("active");

  // On overlay click → redirect
  overlay.onclick = () => {
    // Optional: smooth fade before redirect
    overlay.style.transition = "opacity 0.5s ease";
    overlay.style.opacity = "0";

    setTimeout(() => {
      window.location.href = "index.html"; // 🔗 change this to your redirect file
    }, 500);
  };
};
