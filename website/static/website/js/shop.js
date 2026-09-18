document.addEventListener("DOMContentLoaded", function () {
    let popup = document.getElementById("sale-popup");
    let closeBtn = document.querySelector(".close");

    // Show popup when page loads
    setTimeout(() => {
        popup.style.display = "block";
    }, 1500);

    // Close popup when clicking the close button
    closeBtn.addEventListener("click", () => {
        popup.style.display = "none";
    });
});