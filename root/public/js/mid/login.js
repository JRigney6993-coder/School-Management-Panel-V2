$("#submit").on("click", function () {
    let email = $("#email").val();
    let password = $("#password").val();
    // login stuff yes
    let result = eel
        .login(email, password)()
        .then(function (result) {
            if (result) {
                localStorage.setItem("userIdentity", result);
                window.location.href = "./dashboard.html";
            } else {
                alert("Invalid email or password!");
            }
        });
});
