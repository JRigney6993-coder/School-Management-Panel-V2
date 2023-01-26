document.querySelector(".btn").onclick = function () {
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value

    eel.login(username, password)(function (result) {
        const output = document.getElementById("output")

        if (!result) {
            output.style.color = "#d32e2e";
            output.innerHTML = "Invalid Username or Password!";
        } else {
            output.style.color = "#2ed35f";
            output.innerHTML = "Valid, signing in!";
            window.resizeTo(screen.width, screen.height)

            localStorage.setItem('userIdentity', password)
            window.location.replace("./yes.html")
        }
    })
}