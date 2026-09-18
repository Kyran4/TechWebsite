document.getElementById("submit").addEventListener("click", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    let errors = [];
    if (name.length < 2) errors.push("Please enter your name.");
    if (!email.includes("@") || !email.includes(".")) errors.push("Please enter a valid email address.");
    if (message.length < 10) errors.push("Please enter a message of at least 10 characters.");

    if (errors.length > 0) {
        alert(errors.join("\n"));
        return;
    } else {
        alert("Thank you for contacting us! We will get back to you shortly.");}
        location.href = "/";
});