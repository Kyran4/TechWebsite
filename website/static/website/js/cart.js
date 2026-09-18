document.addEventListener("DOMContentLoaded", function () {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartUI();

    document.querySelectorAll("button.add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            const name = button.dataset.name;
            const price = parseFloat(button.dataset.price);

            cart.push({ name, price });
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartUI();
        });
    });

    const checkoutBtn = document.getElementById("checkout-button");
if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (cart.length === 0) {
            alert("Your cart is empty. Add items before checking out.");
            return;
        }

        window.location.href = "/checkout/";
    });
}

    const cartBtn = document.getElementById("cart-button");
    if (cartBtn) {
        cartBtn.addEventListener("click", () => {
            document.getElementById("cart-window").style.display = "block";
        });
    }

    const closeCart = document.querySelector(".close-cart");
    if (closeCart) {
        closeCart.addEventListener("click", () => {
            document.getElementById("cart-window").style.display = "none";
        });
    }

    function updateCartUI() {
        const cartItems = document.getElementById("cart-items");
        const cartTotal = document.getElementById("cart-total");
        const cartCount = document.getElementById("cart-count");

        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            let li = document.createElement("li");
            li.innerHTML = `${item.name} - $${item.price} <button class="remove-item" data-index="${index}">Remove</button>`;
            cartItems.appendChild(li);
            total += item.price;
        });

        cartTotal.textContent = total.toFixed(2);
        cartCount.textContent = cart.length;

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", () => {
                const index = button.dataset.index;
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartUI();
            });
        });
    }

});