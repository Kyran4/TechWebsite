document.addEventListener("DOMContentLoaded", function () {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCheckoutUI();

    function updateCheckoutUI() {
        const checkoutItems = document.getElementById("checkout-items");
        const checkoutTotal = document.getElementById("checkout-total");
        checkoutItems.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            let imageFile = getImageFilename(item.name);
            let li = document.createElement("li");
            li.innerHTML = `<img src="/static/website/media/${imageFile}" alt="${item.name}">
                            <span>${item.name} - $${item.price}</span>`;
            checkoutItems.appendChild(li);
            total += item.price;
        });

        checkoutTotal.textContent = total.toFixed(2);
    }

    document.getElementById("place-order").addEventListener("click", () => {

        const name = document.getElementById("fullname").value.trim();
        const email = document.getElementById("email").value.trim();
        const address = document.getElementById("address").value.trim();
        const payment = document.getElementById("payment").value;

        let errors = [];

        if (name.length < 2) errors.push("Please enter your full name.");
        if (!email.includes("@") || !email.includes(".")) errors.push("Please enter a valid email address.");
        if (address.length < 5) errors.push("Please enter a valid shipping address.");
        if (!payment) errors.push("Please select a payment method.");

        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        alert("Order placed successfully!");
        localStorage.removeItem("cart");
        updateCheckoutUI();
        location.href = "/";
    });

    function getImageFilename(productName) {
        const key = productName.trim().toLowerCase();

        const imageMap = {
            "ultra performance laptop": "Laptop.jpg",
            "noise cancelling headphones": "Headset.jpg",
            "smart fitness watch": "Watch.jpg",
            "gaming mouse": "Mouse.jpg",
            "mechanical keyboard": "Keyboard.jpg",
            "smart speaker": "Speaker.jpg",
            "ultra hd 4k monitor": "Monitor.jpg",
            "virtual reality headset": "VR.jpg",
            "high-speed usb drive": "SSD.jpg",
            "smart light bar": "Light-Bar.jpg",
            "fast wireless charger": "Charger.jpg"
        };

        return imageMap[key] || "default.jpg";
    }

});